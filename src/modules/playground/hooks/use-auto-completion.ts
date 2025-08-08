import { type Monaco } from "@monaco-editor/react";
import { type editor } from "monaco-editor";
import { registerCompletion, type CompletionRegistration } from "monacopilot";
import { useEffect, useRef } from "react";

interface useAutoCompletionProps {
  enabled: boolean;
  endpoint?: string;
  language?: string;
  monaco: Monaco | null;
  editor: editor.IStandaloneCodeEditor | null;
}

export const useAutoCompletion = ({
  enabled,
  endpoint,
  language,
  monaco,
  editor,
}: useAutoCompletionProps) => {
  const completionRef = useRef<CompletionRegistration | null>(null);

  useEffect(() => {
    if (!enabled || !endpoint || !language || !monaco || !editor) return;

    completionRef.current = registerCompletion(monaco, editor, {
      endpoint: endpoint,
      language,
    });

    return () => {
      completionRef.current?.deregister();
      completionRef.current = null;
    };
  }, [editor, enabled, endpoint, language, monaco]);

  return { completion: completionRef.current };
};
