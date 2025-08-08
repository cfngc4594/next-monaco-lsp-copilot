"use client";

import { useEditorStore } from "@/modules/playground/stores/editor-store";
import { CursorPosition } from "@/modules/playground/ui/components/cursor-position";
import { EditorSettings } from "@/modules/playground/ui/components/editor-settings";
import { EncodingInfo } from "@/modules/playground/ui/components/encoding-info";
import { ErrorWarningBadges } from "@/modules/playground/ui/components/error-warning-badges";
import { SettingsButton } from "@/modules/playground/ui/components/settings-button";

export const EditorStatusSection = () => {
  const { editor, markers } = useEditorStore();

  return (
    <div className="h-8 flex items-center justify-between px-4 border-t">
      <div className="flex items-center space-x-4 text-xs text-muted-foreground truncate">
        <CursorPosition editor={editor} />
        <EditorSettings editor={editor} />
        <EncodingInfo />
      </div>
      <div className="flex items-center space-x-2">
        <ErrorWarningBadges markers={markers} />
        <SettingsButton />
      </div>
    </div>
  );
};
