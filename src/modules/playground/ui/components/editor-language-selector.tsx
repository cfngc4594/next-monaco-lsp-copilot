import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import COriginal from "devicons-react/icons/COriginal";
import CplusplusOriginal from "devicons-react/icons/CplusplusOriginal";

interface EditorLanguageSelectorProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

export const EditorLanguageSelector = ({
  language,
  onLanguageChange,
}: EditorLanguageSelectorProps) => {
  return (
    <Select value={language} onValueChange={onLanguageChange}>
      <SelectTrigger
        className="data-[size=default]:h-6 px-0 py-0 border-none shadow-none focus-visible:ring-0 bg-transparent hover:bg-input/50 dark:bg-transparent dark:hover:bg-input/50"
        aria-label="Select programming language"
      >
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="c">
          <COriginal size={16} aria-hidden="true" />
          <span className="truncate font-semibold">C</span>
        </SelectItem>
        <SelectItem value="cpp">
          <CplusplusOriginal size={16} aria-hidden="true" />
          <span className="truncate font-semibold">C++</span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
