const fs = require('fs');
const path = require('path');

function readFile(p) {
  return fs.readFileSync(p, 'utf8');
}

function writeFile(p, content) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
}

function parseSitemap(xml) {
  const entries = [];
  const re = /<url>\s*<loc>([^<]+)<\/loc>\s*(?:<lastmod>([^<]+)<\/lastmod>)?\s*<\/url>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const loc = m[1].trim();
    const lastmod = (m[2] || '').trim();
    entries.push({ loc, lastmod });
  }
  return entries;
}

function mapUrlToLocalFile(loc) {
  if (loc === '/' || loc === '') return path.join(process.cwd(), 'old_site', 'index.html');
  const clean = loc.replace(/^\/+|\/+$/g, '');
  return path.join(process.cwd(), 'old_site', ...clean.split('/'), 'index.html');
}

function findTagRange(html, startIdx) {
  let idx = startIdx;
  let depth = 0;
  const len = html.length;
  while (idx < len) {
    const openIdx = html.indexOf('<div', idx);
    const closeIdx = html.indexOf('</div>', idx);
    if (openIdx === -1 && closeIdx === -1) break;
    if (openIdx !== -1 && (openIdx < closeIdx || closeIdx === -1)) {
      depth++;
      idx = openIdx + 4;
    } else {
      depth--;
      idx = closeIdx + 6;
      if (depth === 0) return { start: startIdx, end: idx };
    }
  }
  return null;
}

function extractEntryContent(html) {
  const idx = html.indexOf('<div class="entry-content');
  if (idx === -1) return '';
  const range = findTagRange(html, idx);
  if (!range) return '';
  const openEnd = html.indexOf('>', range.start);
  if (openEnd === -1) return '';
  return html.slice(openEnd + 1, range.end - 6);
}

function textDecode(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function absolutize(url) {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('//')) return 'https:' + url;
  if (url.startsWith('/')) return 'https://ursoftware.com' + url;
  return url;
}

function stripTags(html) {
  return textDecode(html.replace(/<[^>]+>/g, ''));
}

function htmlToMarkdown(fragment) {
  let s = fragment;
  s = s.replace(/<script[\s\S]*?<\/script>/gi, '');
  s = s.replace(/<style[\s\S]*?<\/style>/gi, '');
  s = s.replace(/<br\s*\/>/gi, '\n');
  const nameFromUrl = (u) => {
    try {
      const p = u.split('?')[0].split('#')[0];
      const b = p.split('/').filter(Boolean).pop() || '';
      return b.replace(/\.[a-zA-Z0-9]+$/, '') || b || 'image';
    } catch { return 'image'; }
  };
  s = s.replace(/<a[^>]*href=["']([^"']+)["'][^>]*>\s*<img[^>]*src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*>\s*<\/a>/gi,
    (_, href, src, alt) => `[![${stripTags(alt) || nameFromUrl(src)}](${absolutize(src)})](${absolutize(href)})`);
  s = s.replace(/<a[^>]*href=["']([^"']+)["'][^>]*>\s*<img[^>]*alt=["']([^"']*)["'][^>]*src=["']([^"']+)["'][^>]*>\s*<\/a>/gi,
    (_, href, alt, src) => `[![${stripTags(alt) || nameFromUrl(src)}](${absolutize(src)})](${absolutize(href)})`);
  s = s.replace(/<img[^>]*alt=["']([^"']*)["'][^>]*src=["']([^"']+)["'][^>]*>/gi,
    (_, alt, src) => `![${stripTags(alt) || nameFromUrl(src)}](${absolutize(src)})`);
  s = s.replace(/<img[^>]*src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi,
    (_, src, alt) => `![${stripTags(alt) || nameFromUrl(src)}](${absolutize(src)})`);
  s = s.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, a) => `# ${stripTags(a)}\n\n`);
  s = s.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, a) => `## ${stripTags(a)}\n\n`);
  s = s.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, a) => `### ${stripTags(a)}\n\n`);
  s = s.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_, a) => `#### ${stripTags(a)}\n\n`);
  s = s.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, (_, a) => `##### ${stripTags(a)}\n\n`);
  s = s.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, (_, a) => `###### ${stripTags(a)}\n\n`);
  s = s.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, (_, a) => `**${stripTags(a)}**`);
  s = s.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, (_, a) => `**${stripTags(a)}**`);
  s = s.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, (_, a) => `*${stripTags(a)}*`);
  s = s.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, (_, a) => `*${stripTags(a)}*`);
  s = s.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, a) => `\`${stripTags(a)}\``);
  s = s.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_, a) => `\n\n\`\`\`\n${stripTags(a)}\n\`\`\`\n\n`);
  s = s.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, a) => {
    const t = stripTags(a).split(/\r?\n/).filter(Boolean).map(x => '> ' + x).join('\n');
    return `\n${t}\n\n`;
  });
  s = s.replace(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => {
    const t = stripTags(text) || href;
    return `[${t}](${absolutize(href)})`;
  });
  s = s.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, a) => `\n- ${stripTags(a)}`);
  s = s.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, a) => `${a}\n\n`);
  s = s.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, a) => {
    let i = 0;
    return a.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, b) => { i++; return `\n${i}. ${stripTags(b)}`; }) + '\n\n';
  });
  s = s.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, a) => `\n\n${stripTags(a)}\n\n`);
  s = s.replace(/<[^>]+>/g, '');
  s = s.replace(/\n{3,}/g, '\n\n');
  return textDecode(s).trim() + '\n';
}

function extractTitle(html) {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (m) return stripTags(m[1]).trim();
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) return stripTags(h1[1]).trim();
  return '';
}

function nameForPath(loc) {
  if (loc === '/' || loc === '') return 'home.md';
  const clean = loc.replace(/^\/+|\/+$/g, '');
  const parts = clean.split('/');
  return (parts.join('-') || 'index') + '.md';
}

function buildFrontMatter(meta) {
  const lines = [
    '---',
    `title: ${meta.title || ''}`,
    `source_url: https://ursoftware.com${meta.loc}`,
    `lastmod: ${meta.lastmod || ''}`,
    `fetched_at: ${new Date().toISOString()}`,
    `original_path: ${meta.loc}`,
    '---',
    ''
  ];
  return lines.join('\n');
}

function run() {
  const root = process.cwd();
  const sitemapPath = path.join(root, 'old_site', 'sitemap.xml');
  const xml = readFile(sitemapPath);
  const entries = parseSitemap(xml);
  const outDir = path.join(root, 'old_site', 'markdown');
  fs.mkdirSync(outDir, { recursive: true });
  entries.forEach(e => {
    const local = mapUrlToLocalFile(e.loc);
    if (!fs.existsSync(local)) return;
    const html = readFile(local);
    const frag = extractEntryContent(html) || html;
    const md = htmlToMarkdown(frag);
    const title = extractTitle(html);
    const fm = buildFrontMatter({ title, loc: e.loc, lastmod: e.lastmod });
    const fileName = nameForPath(e.loc);
    writeFile(path.join(outDir, fileName), fm + md);
  });
}

run();
