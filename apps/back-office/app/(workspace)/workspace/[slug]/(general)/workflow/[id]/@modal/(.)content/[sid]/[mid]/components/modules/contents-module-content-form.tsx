import { useEffect, useState } from "react";
import { useContent } from "../../../../../../../../../../../../../lib/hook/swr/useContent";
import { useCurrentWorkflow } from "../../../../../../../../../../../../../lib/hook/useCurrentWorkflow";
import { useCurrentWorkspace } from "../../../../../../../../../../../../../lib/hook/useCurrentWorkspace";
import Editor from "ui/components/editor";
import { ContentAPI } from "../../../../../../../../../../../../../lib/api/content";

function ContentsModuleContentForm({ content, sequenceId, moduleId }) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { currentWorkflowId } = useCurrentWorkflow();
  const { contentMutate } = useContent(sequenceId, moduleId);

  const [editedContent, setEditedContent] = useState(content.content);
  const [requesting, setRequesting] = useState(false);

  const saveContent = async () => {
    const { response, result } = await ContentAPI.patchContents(
      currentWorkspaceId,
      currentWorkflowId,
      sequenceId,
      moduleId,
      {
        content: editedContent,
      }
    );
    await contentMutate();
  };

  useEffect(() => {
    if (
      editedContent &&
      currentWorkspaceId &&
      currentWorkflowId &&
      sequenceId &&
      moduleId
    ) {
      saveContent();
    }
  }, [editedContent]);

  return (
    <div className="h-full">
      <Editor
        content={
          editedContent
            ? editedContent
            : {
                type: "doc",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "",
                      },
                    ],
                  },
                ],
              }
        }
        setContent={setEditedContent}
      />
    </div>
  );
}

export { ContentsModuleContentForm };
