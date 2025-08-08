import { HeaderToolbarSection } from "@/modules/playground/ui/sections/header-toolbar-section";

interface PlaygroundLayoutProps {
  children: React.ReactNode;
}

export const PlaygroundLayout = ({ children }: PlaygroundLayoutProps) => {
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <HeaderToolbarSection />
      <main className="flex-1 min-h-0 p-4 pt-0">{children}</main>
    </div>
  );
};
