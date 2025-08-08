"use client";

import { type editor } from "monaco-editor";
import { useEffect, useState } from "react";

interface EditorSettingsProps {
  editor: editor.IStandaloneCodeEditor | null;
}

export const EditorSettings = ({ editor }: EditorSettingsProps) => {
  const [tabSize, setTabSize] = useState<number>(4);

  useEffect(() => {
    if (!editor) return;

    const initialTabSize = editor.getModel()?.getOptions().tabSize ?? 4;
    setTabSize(initialTabSize);

    const listener = editor.onDidChangeModelContent(() => {
      const model = editor.getModel();
      if (model) {
        setTabSize(model.getOptions().tabSize);
      }
    });

    return () => {
      listener.dispose();
    };
  }, [editor]);

  return <span>空格: {tabSize}</span>;
};
