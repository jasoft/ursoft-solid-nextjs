import { privacyContent, siteMetadata } from "@/app/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: siteMetadata.privacy.title,
  description: siteMetadata.privacy.description,
};

function basicMdToHtml(md: string) {
  let html = md;
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  html = html.replace(/^#\s+(.+)$/gm, "<h1>$1</h1>");
  html = html.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/\n\n/g, "<br/><br/>");
  return html;
}

const PrivacyPage = () => {
  const html = basicMdToHtml(privacyContent.body);
  return (
    <main className="pb-20 pt-40 page-main-bg">
      <div className="mx-auto mb-10 max-w-c-1315 px-4 md:px-8 xl:px-0">
        <h1 className="mb-4 text-3xl font-bold text-black dark:text-white">{privacyContent.title}</h1>
        <article className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </main>
  );
};

export default PrivacyPage;
