import { api } from "@/utils/api";
import { Conditional } from "@pandeymangg/react-conditional";
import type { NextPage } from "next";
import React from "react";
import { Loader2 } from "lucide-react";

const DashboardPage: NextPage = () => {
  const { data: allDocs, isLoading } = api.doc.getAll.useQuery();
  const { mutate: createDoc } = api.doc.create.useMutation();

  const utils = api.useContext();

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 size={48} />
      </div>
    );

  return (
    <div className="mt-8">
      <div className="w-96 rounded-lg border border-mauve p-4">
        <h1 className="text-center text-3xl font-bold text-subtext1">
          Dashboard
        </h1>
        <div className="flex flex-col items-center justify-center gap-4">
          <button
            className="mt-4 rounded-lg bg-surface0 px-4 py-2 text-text hover:bg-surface1"
            onClick={() => {
              createDoc(
                { title: "Untitled", content: "" },
                {
                  onSuccess: () => {
                    void utils.doc.getAll.invalidate();
                  },
                }
              );
            }}
          >
            + Create
          </button>

          <div className="flex flex-col items-center gap-4">
            <Conditional condition={!!allDocs?.length}>
              {allDocs?.map((doc) => (
                <div key={doc.id}>
                  <p className="text-[16px] font-medium text-text">
                    {doc.title}
                  </p>
                </div>
              ))}
            </Conditional>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
