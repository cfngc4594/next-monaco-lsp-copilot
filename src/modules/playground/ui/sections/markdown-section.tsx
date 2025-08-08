"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { content, Loading } from "@/modules/playground/constants";
import { markdownComponents } from "@/modules/playground/ui/components/markdown-components";
import { MarkdownRenderer } from "@/modules/playground/ui/components/markdown-renderer";
import { useTheme } from "next-themes";

export const MarkdownSection = () => {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "light" ? "vitesse-light" : "vitesse-dark";

  return (
    <ScrollArea className="h-full">
      <MarkdownRenderer
        theme={theme}
        content={content}
        components={markdownComponents}
        fallback={<Loading />}
        className="px-4 py-2"
      />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
