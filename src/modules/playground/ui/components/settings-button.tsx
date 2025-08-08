import { Button } from "@/components/ui/button";
import { SettingsIcon } from "lucide-react";

export const SettingsButton = () => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-6 w-6 p-0 cursor-pointer"
      aria-label="Editor settings"
    >
      <SettingsIcon className="h-3 w-3" aria-hidden="true" />
    </Button>
  );
};
