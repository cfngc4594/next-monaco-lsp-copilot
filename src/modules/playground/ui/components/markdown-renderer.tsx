"use client";

import { cn } from "@/lib/utils";
import "@/styles/github-markdown.css";
import { MarkdownHooks, type Components } from "react-markdown";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  theme: string;
  content: string;
  components?: Components;
  fallback?: React.ReactNode;
  className?: string;
}

export const MarkdownRenderer = ({
  theme,
  content,
  components,
  fallback,
  className,
}: MarkdownRendererProps) => {
  return (
    <article className={cn("markdown-body", className)}>
      <MarkdownHooks
        // TODO: Add skeleton loading
        fallback={fallback}
        // TODO: Add support for math formulas
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          [
            rehypePrettyCode,
            {
              theme: theme,
              keepBackground: false,
            },
          ],
        ]}
        components={components}
      >
        {content}
      </MarkdownHooks>
    </article>
  );
};
