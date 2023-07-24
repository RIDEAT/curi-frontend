import { Metadata } from "next";
import { Sidebar } from "./components/sidebar";

export const metadata: Metadata = {
  title: "Curi Board",
  description: "동료의 첫번째 경험을 디자인하세요",
};

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="hidden md:block">
      <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <Sidebar className="hidden lg:block" />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
