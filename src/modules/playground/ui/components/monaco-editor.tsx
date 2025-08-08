"use client";

import { getHighlighter } from "@/app/lib/shiki";
import { Loading } from "@/modules/playground/constants";
import { useAutoCompletion } from "@/modules/playground/hooks/use-auto-completion";
import { useLanguageServer } from "@/modules/playground/hooks/use-language-client";
import { type Monaco } from "@monaco-editor/react";
import { shikiToMonaco } from "@shikijs/monaco";
import { type editor } from "monaco-editor";
import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";

const Editor = dynamic(
  async () => {
    const [react, monaco] = await Promise.all([
      import("@monaco-editor/react"),
      import("monaco-editor"),
      // The vscode import is required to initialize Monaco's standalone services
      // and prevent the "Missing service editorService" error. This ensures:
      // 1. Monaco's language services are properly registered
      // 2. Required editor services (like editorService) are available
      // 3. LSP client integration works correctly
      // Without this, language features may fail to initialize properly
      import("vscode"), // Critical for service initialization
    ]);

    // Configure Monaco's WebWorker loading mechanism to avoid UI freezes.
    // Without this, Monaco would fall back to running language workers in the main thread,
    // which can cause performance issues and UI freezing during heavy editing.
    // This implementation specifically tells Monaco how to load the editor's core worker:
    // 1. Creates a new WebWorker using the editor's built-in worker script
    // 2. Uses import.meta.url to resolve the worker file location correctly in the module system
    // This prevents the warning: "Could not create web worker(s). Falling back to loading..."
    // Ref: https://github.com/microsoft/monaco-editor#faq
    self.MonacoEnvironment = {
      getWorker() {
        return new Worker(
          new URL(
            "monaco-editor/esm/vs/editor/editor.worker.js",
            import.meta.url
          )
        );
      },
    };

    react.loader.config({ monaco });
    return react.Editor;
  },
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

interface MonacoEditorProps {
  theme?: string;
  language?: string;
  value?: string;
  onChange?: (value: string) => void;
  path?: string;
  className?: string;
  loading?: React.ReactNode;
  languageServer?: {
    enabled: boolean;
    endpoint?: string;
  };
  autoCompletion?: {
    enabled: boolean;
    endpoint?: string;
  };
  options?: editor.IStandaloneEditorConstructionOptions;
  onValidate?: (markers: editor.IMarker[]) => void;
  onEditorReady?: (editor: editor.IStandaloneCodeEditor) => void;
}

export const MonacoEditor = ({
  theme,
  language,
  value,
  onChange,
  path,
  className,
  loading,
  languageServer = { enabled: false },
  autoCompletion = { enabled: false },
  options,
  onValidate,
  onEditorReady,
}: MonacoEditorProps) => {
  const monacoRef = useRef<Monaco | null>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  // State to track editor readiness. This is crucial to prevent a race condition.
  // Initializing language services before the editor is fully mounted will cause
  // the "Uncaught (in promise) Error: Missing service editorService" error.
  const [isEditorReady, setIsEditorReady] = useState(false);

  useLanguageServer({
    // Enable the language server hook only after the editor is fully mounted.
    // Attempting to start it earlier (i.e., only with `languageServer.enabled`)
    // is the direct cause of the "Missing service editorService" error.
    enabled: languageServer.enabled && isEditorReady,
    endpoint: languageServer.endpoint,
    language,
  });

  useAutoCompletion({
    // The auto-completion hook also depends on the editor/monaco instances.
    // Gating it with `isEditorReady` prevents similar race conditions and errors
    // that occur when trying to access refs (`editorRef`, `monacoRef`) before they are set in onMount.
    enabled: autoCompletion.enabled && isEditorReady,
    endpoint: autoCompletion.endpoint,
    language,
    monaco: monacoRef.current,
    editor: editorRef.current,
  });

  const handleBeforeMount = useCallback(
    async (monaco: Monaco) => {
      if (!theme) return;
      const highlighter = await getHighlighter();
      shikiToMonaco(highlighter, monaco);
      monaco.editor.setTheme(theme);
    },
    [theme]
  );

  const handleOnMount = useCallback(
    (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
      editorRef.current = editor;
      monacoRef.current = monaco;
      // Signal that the editor is now fully initialized and ready for dependent services.
      setIsEditorReady(true);
      onEditorReady?.(editor);
    },
    [onEditorReady]
  );

  const handleOnChange = useCallback(
    (value: string | undefined) => {
      if (value !== undefined) {
        onChange?.(value);
      }
    },
    [onChange]
  );

  const handleOnValidate = useCallback(
    (markers: editor.IMarker[]) => {
      onValidate?.(markers);
    },
    [onValidate]
  );

  return (
    <Editor
      theme={theme}
      language={language}
      value={value}
      path={path}
      onChange={handleOnChange}
      beforeMount={handleBeforeMount}
      onMount={handleOnMount}
      loading={loading}
      className={className}
      options={options}
      onValidate={handleOnValidate}
    />
  );
};
