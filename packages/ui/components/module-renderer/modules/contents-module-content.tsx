import Editor from "../../editor";

function ContentsModuleContent({ contents }: { contents: any }) {
  return (
    <div>
      <Editor editable={false} content={contents?.content} />
    </div>
  );
}

export { ContentsModuleContent };
