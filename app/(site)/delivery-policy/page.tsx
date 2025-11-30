import { deliveryContent, siteMetadata } from "@/app/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: siteMetadata.deliveryPolicy.title,
  description: siteMetadata.deliveryPolicy.description,
};

function basicMdToHtml(md: string) {
  const applyInline = (s: string) => {
    let r = s;
    r = r.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    r = r.replace(/_([^_]+)_/g, "<em>$1</em>");
    r = r.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    return r;
  };

  const lines = md.split("\n");
  let html = "";
  let inList = false;
  for (const line of lines) {
    const liMatch = line.match(/^\s*-\s+(.*)$/) || line.match(/^\s*\*\s+(.*)$/);
    const h3 = line.match(/^###\s+(.+)$/);
    const h2 = line.match(/^##\s+(.+)$/);
    const h1 = line.match(/^#\s+(.+)$/);

    if (liMatch) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${applyInline(liMatch[1])}</li>`;
      continue;
    }

    if (inList) {
      html += "</ul>";
      inList = false;
    }

    if (h3) {
      html += `<h3>${applyInline(h3[1])}</h3>`;
    } else if (h2) {
      html += `<h2>${applyInline(h2[1])}</h2>`;
    } else if (h1) {
      html += `<h1>${applyInline(h1[1])}</h1>`;
    } else if (line.trim() === "") {
      html += "<br/>";
    } else {
      html += `<p>${applyInline(line)}</p>`;
    }
  }
  if (inList) html += "</ul>";
  return html;
}

const DeliveryPolicyPage = () => {
  const html = basicMdToHtml(deliveryContent.body);
  return (
    <main className="pb-20 pt-20 page-main-bg">
      <div className="mx-auto mb-10 max-w-c-1315 px-4 md:px-8 xl:px-0">
        <h1 className="mb-4 text-3xl font-bold text-black dark:text-white">{deliveryContent.title}</h1>
        <article className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </main>
  );
};

export default DeliveryPolicyPage;
