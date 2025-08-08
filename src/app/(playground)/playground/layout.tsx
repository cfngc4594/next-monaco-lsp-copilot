import { PlaygroundLayout } from "@/modules/playground/ui/layouts/playground-layout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <PlaygroundLayout>{children}</PlaygroundLayout>;
};

export default Layout;
