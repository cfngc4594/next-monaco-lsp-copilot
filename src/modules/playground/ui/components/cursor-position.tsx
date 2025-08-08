"use client";

import { type editor } from "monaco-editor";
import { useEffect, useState } from "react";

interface CursorPositionProps {
  editor: editor.IStandaloneCodeEditor | null;
}

export const CursorPosition = ({ editor }: CursorPositionProps) => {
  const [position, setPosition] = useState<{
    lineNumber: number;
    column: number;
  } | null>(null);

  useEffect(() => {
    if (!editor) return;

    const initialPosition = editor.getPosition();
    if (initialPosition) {
      setPosition(initialPosition);
    }

    const listener = editor.onDidChangeCursorPosition((e) => {
      setPosition(e.position);
    });

    return () => {
      listener.dispose();
    };
  }, [editor]);

  return (
    <span>
      行 {position?.lineNumber ?? "-"}, 列 {position?.column ?? "-"}
    </span>
  );
};
