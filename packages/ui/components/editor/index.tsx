"use client";

import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { TiptapEditorProps } from "./props";
import { TiptapExtensions } from "./extensions";
import { useDebouncedCallback } from "use-debounce";
// import { useCompletion } from "ai/react";

import { EditorBubbleMenu } from "./components";
import { getPrevText } from "./lib/editor";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export default function Editor({
  editable = true,
  content,
  setContent,
}: {
  editable?: boolean;
  content: any;
  setContent?: any;
}) {
  const [saveStatus, setSaveStatus] = useState("Saved");

  const [hydrated, setHydrated] = useState(false);

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON();
    setSaveStatus("Saving...");
    setContent(json);
    // Simulate a delay in saving.
    setTimeout(() => {
      setSaveStatus("Saved");
    }, 500);
  }, 1000 * 60);

  const editor = useEditor({
    editable,
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: (e) => {
      setSaveStatus("Unsaved");
      const selection = e.editor.state.selection;
      const lastTwo = getPrevText(e.editor, {
        chars: 2,
      });
      const lastChar = getPrevText(e.editor, {
        chars: 1,
      });

      // if (lastTwo === "++" && !isLoadingText) {
      //   e.editor.commands.deleteRange({
      //     from: selection.from - 2,
      //     to: selection.from,
      //   });
      //   complete(
      //     getPrevText(e.editor, {
      //       chars: 5000,
      //     })
      //   );
      //   // complete(e.editor.storage.markdown.getMarkdown());
      //   // va.track("Autocomplete Shortcut Used");
      // } else {
      // }
      debouncedUpdates(e);
    },
    autofocus: "end",
  });

  // const {
  //   complete,
  //   completion,
  //   isLoading: isLoadingText,
  //   stop,
  // } = useCompletion({
  //   id: "curi_text_gpt",
  //   api: "/api/generate/text",
  //   onFinish: (_prompt, completion) => {
  //     editor?.commands.setTextSelection({
  //       from: editor.state.selection.from - completion.length,
  //       to: editor.state.selection.from,
  //     });
  //   },
  //   onError: (err) => {
  //     toast({ title: err.message });
  //     // if (err.message === "You have reached your request limit for the day.") {
  //     //   va.track("Rate Limit Reached");
  //     // }
  //   },
  // });

  // const { completion: completionImage, isLoading: isLoadingImage } =
  //   useCompletion({
  //     id: "curi_image_gpt",
  //     api: "/api/generate/text",
  //     onError: (err) => {
  //       toast({ title: err.message });
  //     },
  //   });

  const prev = useRef("");

  // Insert chunks of the generated text
  // useEffect(() => {
  //   const diff = completion.slice(prev.current.length);
  //   prev.current = completion;
  //   editor?.commands.insertContent(diff);
  // }, [isLoadingText, editor, completion]);

  // Insert chunks of the generated image
  // useEffect(() => {
  //   editor?.commands.insertContent(completionImage);
  // }, [isLoadingImage, editor, completionImage]);

  useEffect(() => {
    // if user presses escape or cmd + z and it's loading,
    // stop the request, delete the completionText, and insert back the "++"

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || (e.metaKey && e.key === "z")) {
        stop();
        // if (e.key === "Escape") {
        //   editor?.commands.deleteRange({
        //     from: editor.state.selection.from - completion.length,
        //     to: editor.state.selection.from,
        //   });
        // }
        editor?.commands.insertContent("++");
      }

      if (e.metaKey && e.key === "s") {
        debouncedUpdates.flush();
      }
    };
    const mousedownHandler = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      stop();
      // if (window.confirm("AI writing paused. Continue?")) {
      //   complete(editor?.getText() || "");
      // }
    };
    // if (isLoadingText) {
    //   document.addEventListener("keydown", onKeyDown);
    //   window.addEventListener("mousedown", mousedownHandler);
    // } else {
    //   document.removeEventListener("keydown", onKeyDown);
    //   window.removeEventListener("mousedown", mousedownHandler);
    // }
    document.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("mousedown", mousedownHandler);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", mousedownHandler);
    };
  }, [stop, editor]);
  // }, [stop, isLoadingText, editor, complete, completion.length]);

  // Hydrate the editor with the content from localStorage.
  useEffect(() => {
    if (editor && content && !hydrated) {
      editor.commands.setContent(content);
      setHydrated(true);
    }
  }, [editor, content, hydrated]);

  return (
    <div
      onClick={() => {
        editor?.chain().focus().run();
      }}
      className={
        editable
          ? "relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white p-12 px-8 sm:rounded-lg sm:border sm:px-12 sm:shadow-lg overflow-scroll scrollbar-hide h-full"
          : "relative w-full max-w-screen-lg border-stone-200 bg-white sm:rounded-lg"
      }
    >
      {editable && (
        <div
          className={cn(
            "flex w-full justify-end sticky -right-5 -top-5 mb-5 z-10"
          )}
        >
          <div
            className={cn(
              "w-fit rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400 z-50",
              saveStatus === "Unsaved" &&
                "cursor-pointer bg-stone-700 text-white hover:bg-stone-600 active:bg-stone-600"
            )}
            onClick={() => {
              debouncedUpdates.flush();
            }}
          >
            {saveStatus === "Unsaved" ? "Save" : saveStatus}
          </div>
        </div>
      )}
      {editor && editable && <EditorBubbleMenu editor={editor} />}

      <EditorContent editor={editor} />
    </div>
  );
}
