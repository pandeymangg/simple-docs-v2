import PlateEditor from "@/components/editor";
import Loader from "@/components/ui/Loader/Loader";
import { api } from "@/utils/api";
import clsx from "clsx";
import debounce from "lodash.debounce";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";

const UpdateDocForm: React.FC<{
  initialData: { docId: string; title: string; content: string };
}> = ({ initialData }) => {
  const { content: initialContent, docId, title: initialTitle } = initialData;
  const { mutate: updateDocById } = api.doc.updateDocById.useMutation();

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const debouncedTitleUpdate = useMemo(
    () =>
      debounce((title: string) => {
        updateDocById(
          {
            docId,
            title,
          },
          {
            onSuccess: (data) => {
              console.log({ data });
            },
            onError: (err) => {
              console.log({ err });
            },
          }
        );
      }, 300),
    [docId, updateDocById]
  );

  const debouncedUpdateContent = useMemo(
    () =>
      debounce((content: string) => {
        updateDocById(
          {
            docId,
            content,
          },
          {
            onSuccess: (data) => {
              console.log({ data });
            },
            onError: (err) => {
              console.log({ err });
            },
          }
        );
      }, 300),
    [docId, updateDocById]
  );

  return (
    <div className="container mx-auto flex w-full flex-col gap-8 p-4">
      <input
        className={clsx(
          "rounded-lg border-none bg-cpBase p-1 text-3xl font-semibold outline-none",
          "hover:outline hover:outline-cpOverlay1 focus:outline focus:outline-cpOverlay1",
          "transition-all duration-200 ease-in-out"
        )}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);

          debouncedTitleUpdate(e.target.value);
        }}
      />

      <div className="content__container w-full">
        <div className="min-h-16 bg-cpMantle">
          <PlateEditor
            editorValue={content}
            setEditorValue={setContent}
            onChange={(newValue) => debouncedUpdateContent(newValue)}
          />
        </div>
      </div>
    </div>
  );
};

const DocumentPage: NextPage = () => {
  const router = useRouter();
  const { docId } = router.query;

  const { data: docData, isLoading } = api.doc.getDocById.useQuery(
    {
      id: docId as string,
    },
    {
      enabled: !!docId,
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  if (!docData) {
    return <div>404</div>;
  }

  return (
    <div className="mt-16 w-full">
      <UpdateDocForm
        initialData={{
          docId: docData.id,
          title: docData.title,
          content: docData.content,
        }}
      />
    </div>
  );
};

export default DocumentPage;
