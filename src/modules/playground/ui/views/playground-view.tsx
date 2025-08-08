import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { EditorSection } from "@/modules/playground/ui/sections/editor-section";
import { MarkdownSection } from "@/modules/playground/ui/sections/markdown-section";
import { OutputSection } from "@/modules/playground/ui/sections/output-section";

export const PlaygroundView = () => {
  return (
    <ResizablePanelGroup direction="horizontal" className="gap-2">
      <ResizablePanel defaultSize={50} className="rounded-lg border">
        <MarkdownSection />
      </ResizablePanel>
      <ResizableHandle className="bg-transparent" />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical" className="gap-2">
          <ResizablePanel
            defaultSize={60}
            className="rounded-lg border flex flex-col"
          >
            <EditorSection />
          </ResizablePanel>
          <ResizableHandle className="bg-transparent" />
          <ResizablePanel
            defaultSize={40}
            className="rounded-lg border flex flex-col"
          >
            <OutputSection />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
