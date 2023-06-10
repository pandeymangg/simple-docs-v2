import DocItem from "@/components/DocItem";
import { api } from "@/utils/api";
import { Conditional } from "@pandeymangg/react-conditional";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const MyDocs = () => {
  const { data: myDocs, isLoading } = api.doc.getAll.useQuery();
  const { mutate: deleteDoc } = api.doc.deleteDocById.useMutation();

  const utils = api.useContext();

  return (
    <div className="flex flex-col gap-4">
      <Conditional condition={isLoading}>
        <div className="mt-16 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" size={48} />
        </div>
      </Conditional>

      <Conditional condition={myDocs?.length === 0}>
        <div className="mt-16 flex flex-col items-center justify-center gap-4">
          <Image
            alt="no-data"
            src="/images/EmptyState.png"
            width={400}
            height={(4 / 3) * 400}
          />

          <p className="text-cpText">
            You haven&apos;t created any documents yet.
          </p>
        </div>
      </Conditional>

      <Conditional condition={!!myDocs && myDocs?.length > 0}>
        <div className="mt-6 flex flex-wrap gap-4">
          {myDocs?.map((doc) => (
            <DocItem
              key={doc.id}
              docId={doc.id}
              docTitle={doc.title}
              onDelete={() =>
                deleteDoc(
                  { docId: doc.id },
                  {
                    onSuccess: () => {
                      void utils.doc.getAll.invalidate();
                    },
                    onError: (err) => {
                      console.log({ err });
                    },
                  }
                )
              }
              isCollaboration={false}
            />
          ))}
        </div>
      </Conditional>
    </div>
  );
};

export default MyDocs;
