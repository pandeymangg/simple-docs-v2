import Loader from "@/components/ui/Loader/Loader";
import { api } from "@/utils/api";
import clsx from "clsx";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const UpdateDocForm: React.FC<{
  initialData: { docId: string; title: string; content: string };
}> = ({ initialData }) => {
  const { content: initialContent, docId, title: initialTitle } = initialData;

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const { mutate: updateDocById } = api.doc.updateDocById.useMutation();

  const onSave = (): void => {
    updateDocById(
      {
        docId,
        title,
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
  };

  return (
    <div className="container mx-auto flex w-full flex-col gap-8 p-4">
      <button className="btn-primary btn w-fit capitalize" onClick={onSave}>
        Save
      </button>
      <input
        className={clsx(
          "rounded-lg border-none bg-cpBase p-1 text-3xl font-semibold outline-none",
          "hover:outline hover:outline-cpOverlay1 focus:outline focus:outline-cpOverlay1",
          "transition-all duration-200 ease-in-out"
        )}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <div className="content__container w-full">
        <textarea
          className={clsx(
            "content__editable w-full rounded-lg border-none bg-cpSurface0 p-4 outline-none",
            "hover:outline hover:outline-cpOverlay1 focus:outline focus:outline-cpOverlay1",
            "transition-all duration-200 ease-in-out"
          )}
          rows={6}
          placeholder="Start typing..."
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
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
