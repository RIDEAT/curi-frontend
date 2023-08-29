import { ModuleContentEditor } from "../../../@modal/(.)content/[sid]/[mid]/components/module-content-editor";

export default function Content({
  params,
}: {
  params: { slug: string; id: string; sid: string; mid: string };
}) {
  return <ModuleContentEditor params={params} />;
}
