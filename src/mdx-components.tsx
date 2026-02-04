import type { MDXComponents } from "mdx/types";
import { codeToHtml } from "shiki";

import Mermaid from "./components/Mermaid";
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: async ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
      // Extract code and language from children
      const codeElement = children as React.ReactElement;
      if (!codeElement || codeElement.type !== 'code') {
        return <pre {...props}>{children}</pre>;
      }

      const codeProps = codeElement.props as { className?: string; children?: React.ReactNode };
      const rawCode = codeProps.children || "";
      const className = codeProps.className || "";
      const lang = className.replace(/language-/, "");

      if (lang === "mermaid") {
        return <Mermaid code={String(rawCode)} />;
      }

      // Highlight with Shiki
      const html = await codeToHtml(String(rawCode), {
        lang: lang || 'text',
        theme: "dracula",
      });

      // Style fix: We wrap in a nice container and ensure the inner pre has 0 margin/padding to handle it here
      // text-sm for smaller font, overflow-hidden for rounded corners
      return (
        <div 
          className="not-prose text-sm leading-normal my-6 rounded-lg shadow-lg overflow-hidden border border-gray-800"
          dangerouslySetInnerHTML={{ __html: html }} 
        />
      );
    },
  };
}
