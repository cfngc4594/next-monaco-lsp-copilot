import { Badge } from "@/components/ui/badge";
import { MarkerSeverity } from "@/modules/playground/constants";
import { type editor } from "monaco-editor";

interface ErrorWarningBadgesProps {
  markers: editor.IMarker[];
}

export const ErrorWarningBadges = ({ markers }: ErrorWarningBadgesProps) => {
  const errorCount = markers.filter(
    (m) => m.severity === MarkerSeverity.Error
  ).length;
  const warningCount = markers.filter(
    (m) => m.severity === MarkerSeverity.Warning
  ).length;

  return (
    <>
      <Badge variant="destructive" className="text-xs">
        错误 {errorCount}
      </Badge>
      <Badge variant="secondary" className="text-xs">
        警告 {warningCount}
      </Badge>
    </>
  );
};
