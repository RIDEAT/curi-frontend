import { NotionAPI } from "notion-client";
import NotionPage from "../../react-notion-x/components/NotionPage";

export default async function Home({ params }: { params: any }) {
  const notion = new NotionAPI();

  const recordMap = await notion.getPage(params.id);
  return (
    <main>
      <NotionPage recordMap={recordMap} />
    </main>
  );
}
