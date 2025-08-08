"use client";

import { Button } from "@/components/ui/button";
import {
  languageServerConfigs,
  Loading,
  options,
} from "@/modules/playground/constants";
import { useEditorStore } from "@/modules/playground/stores/editor-store";
import { EditorLanguageSelector } from "@/modules/playground/ui/components/editor-language-selector";
import { MonacoEditor } from "@/modules/playground/ui/components/monaco-editor";
import { EditorStatusSection } from "@/modules/playground/ui/sections/editor-status-section";
import {
  CopyIcon,
  Paintbrush,
  Redo2Icon,
  RotateCcwIcon,
  Undo2Icon,
} from "lucide-react";
import { useTheme } from "next-themes";

export const EditorSection = () => {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "light" ? "vitesse-light" : "vitesse-dark";
  const {
    language,
    languageServerEnabled,
    autoCompleteEnabled,
    value,
    setValue,
    setMarkers,
    setEditor,
    setLanguage,
  } = useEditorStore();

  return (
    <>
      <div className="h-8 flex items-center justify-between px-4 border-b">
        <div className="flex items-center space-x-4">
          <EditorLanguageSelector
            language={language}
            onLanguageChange={setLanguage}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 cursor-pointer"
            aria-label="Reset editor"
          >
            <RotateCcwIcon className="h-3 w-3" aria-hidden="true" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 cursor-pointer"
            aria-label="Undo"
          >
            <Undo2Icon className="h-3 w-3" aria-hidden="true" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 cursor-pointer"
            aria-label="Redo"
          >
            <Redo2Icon className="h-3 w-3" aria-hidden="true" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 cursor-pointer"
            aria-label="Format code"
          >
            <Paintbrush className="h-3 w-3" aria-hidden="true" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 cursor-pointer"
            aria-label="Copy code"
          >
            <CopyIcon className="h-3 w-3" aria-hidden="true" />
          </Button>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <MonacoEditor
          theme={theme}
          language={language}
          value={value}
          onChange={setValue}
          path={`file:///main.${language}`}
          loading={<Loading />}
          options={options}
          languageServer={{
            enabled: languageServerEnabled,
            endpoint:
              languageServerConfigs[
                language as keyof typeof languageServerConfigs
              ],
          }}
          autoCompletion={{
            enabled: autoCompleteEnabled,
            endpoint: "/api/code-completion",
          }}
          onValidate={setMarkers}
          onEditorReady={setEditor}
        />
      </div>
      <EditorStatusSection />
    </>
  );
};
