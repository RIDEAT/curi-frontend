import { headers } from "next/headers";
import { Metadata, ResolvingMetadata } from "next";
import { WorkspaceLayoutComponent } from "./components/workspace-layout-component";
import { pathExtractor } from "../../lib/function/pathExtractor";

// export const metadata: Metadata = {
//   title: "Curi Board - workflow",
//   description: "모든 신입사원의 공통 워크플로우입니다.",
// };

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const curPathname = pathExtractor(pathname);

  return {
    title: "Curi Board - " + curPathname,
  };
}

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-[230px_minmax(900px,_1fr)]">
            <WorkspaceLayoutComponent>{children}</WorkspaceLayoutComponent>
          </div>
        </div>
      </div>
    </div>
  );
}
