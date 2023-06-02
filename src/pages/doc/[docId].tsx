import PlateEditor from "@/components/editor";
import Loader from "@/components/ui/Loader/Loader";
import { api } from "@/utils/api";
import { Conditional } from "@pandeymangg/react-conditional";
import clsx from "clsx";
import debounce from "lodash.debounce";
import { BadgeCheck, Loader2 } from "lucide-react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";

const UpdateDocForm: React.FC<{
  initialData: { docId: string; title: string; content: string };
}> = ({ initialData }) => {
  const { content: initialContent, docId, title: initialTitle } = initialData;
  const utils = api.useContext();
  const { mutate: updateDocById, isLoading } =
    api.doc.updateDocById.useMutation({
      onSuccess: () => {
        void utils.doc.getDocById.invalidate({ docId });
      },
    });

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const debouncedTitleUpdate = useMemo(
    () =>
      debounce((title: string) => {
        updateDocById({
          docId,
          title,
        });
      }, 1000),
    [docId, updateDocById]
  );

  const debouncedUpdateContent = useMemo(
    () =>
      debounce((content: string) => {
        updateDocById({
          docId,
          content,
        });
      }, 1000),
    [docId, updateDocById]
  );

  return (
    <div className="container mx-auto flex w-full flex-col gap-8 p-4">
      <div className="flex items-center gap-2">
        <Conditional
          condition={isLoading}
          fallback={
            <>
              <BadgeCheck size={16} className="text-cpGreen" />
              <span className="text-cpGreen">Saved</span>
            </>
          }
        >
          <>
            <Loader2 className="animate-spin" size={16} />
            <span className="text-cpSubtext0">Saving...</span>
          </>
        </Conditional>
      </div>

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

  const { mutate: createCollaborationRequest } =
    api.collaborationRequest.create.useMutation();

  const {
    data: docData,
    isLoading,
    isError,
    error,
  } = api.doc.getDocById.useQuery(
    {
      docId: docId as string,
    },
    {
      enabled: !!docId,
      retry: false,
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    switch (error?.data?.httpStatus) {
      case 401: {
        return (
          <div className="text-center">
            <p>You are not authorized to view this document</p>
            <button
              className="btn-primary btn mt-4"
              onClick={() => {
                void createCollaborationRequest({ docId: docId as string });
              }}
            >
              Request access
            </button>
          </div>
        );
      }

      case 404: {
        return <div className="text-center">Document not found</div>;
      }

      default: {
        return <div className="text-center">Something went wrong</div>;
      }
    }
  }

  if (docData) {
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
  }

  return null;
};

export default DocumentPage;
