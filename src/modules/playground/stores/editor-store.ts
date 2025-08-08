import { type editor } from "monaco-editor";
import { create } from "zustand";

interface EditorState {
  editor: editor.IStandaloneCodeEditor | null;
  markers: editor.IMarker[];
  value: string;
  language: string;
  languageServerEnabled: boolean;
  autoCompleteEnabled: boolean;
}

interface EditorActions {
  setEditor: (editor: editor.IStandaloneCodeEditor) => void;
  setMarkers: (markers: editor.IMarker[]) => void;
  setValue: (value: string) => void;
  setLanguage: (language: string) => void;
  setLanguageServerEnabled: (enabled: boolean) => void;
  setAutoCompleteEnabled: (enabled: boolean) => void;
}

export const useEditorStore = create<EditorState & EditorActions>((set) => ({
  editor: null,
  markers: [],
  value: "",
  language: "c",
  languageServerEnabled: false,
  autoCompleteEnabled: false,
  setEditor: (editor) => set({ editor }),
  setMarkers: (markers) => set({ markers }),
  setValue: (value) => set({ value }),
  setLanguage: (language) => set({ language }),
  setLanguageServerEnabled: (enabled) =>
    set({ languageServerEnabled: enabled }),
  setAutoCompleteEnabled: (enabled) => set({ autoCompleteEnabled: enabled }),
}));
