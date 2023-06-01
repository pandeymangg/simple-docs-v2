import { api } from "@/utils/api";
import { Conditional } from "@pandeymangg/react-conditional";
import type { NextPage } from "next";
import React from "react";
import { Loader2, Plus } from "lucide-react";
import { FileText, Trash2 } from "lucide-react";
import { useRouter } from "next/router";
import CreateDocForm from "@/components/form";
import { CREATE_FORM_MODAL_ID } from "@/lib/constants";

const DashboardPage: NextPage = () => {
  const router = useRouter();
  const { data: allDocs, isLoading, isFetching } = api.doc.getAll.useQuery();
  const { mutate: deleteDoc } = api.doc.deleteDocById.useMutation();

  const utils = api.useContext();

  if (isLoading || isFetching)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" size={48} />
      </div>
    );

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col bg-cpCrust">
        <div className="container mx-auto w-full p-4">
          <div className="flex flex-col gap-4">
            <h3 className="text-cpText">Start a new document</h3>

            <div className="flex flex-col gap-2">
              <label htmlFor={CREATE_FORM_MODAL_ID}>
                <div className="flex flex-col gap-1">
                  <div
                    className="
                    flex w-full min-w-[80px] max-w-[120px] cursor-pointer
                    items-center justify-center rounded-sm border 
                    border-cpOverlay0 bg-cpMantle hover:border-cpMauve"
                    style={{
                      aspectRatio: "3/4",
                    }}
                  >
                    <Plus size={64} className="text-primary" />
                  </div>

                  <p className="text-sm font-medium text-cpText">Blank</p>
                </div>
              </label>

              <CreateDocForm />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="container mx-auto w-full p-4">
          <div>
            <h2 className="font-medium">Recent documents</h2>
          </div>

          <div className="flex flex-col gap-4">
            <Conditional condition={allDocs?.length === 0}>
              <div className="flex flex-col gap-4">
                <p className="text-cpText">
                  You haven&apos;t created any documents yet.
                </p>
              </div>
            </Conditional>
            <Conditional condition={!!allDocs && allDocs?.length > 0}>
              <div className="mt-6 flex flex-wrap gap-4">
                {allDocs?.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex w-full min-w-[140px]
                    max-w-[180px]  flex-col gap-2 rounded-sm border border-cpOverlay0"
                  >
                    <div
                      className="flex w-full cursor-pointer items-center justify-center
                bg-cpMantle hover:border-cpMauve"
                      style={{
                        aspectRatio: "3/4",
                      }}
                      onClick={() => {
                        void router.push(`/doc/${doc.id}`);
                      }}
                    >
                      <FileText size={64} className="text-primary" />
                    </div>

                    <div className="flex items-center justify-between p-4">
                      <p className="text-sm font-medium text-cpText">
                        {doc.title}
                      </p>

                      <div
                        className="btn-ghost btn"
                        onClick={() =>
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
                      >
                        <Trash2 size={16} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Conditional>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
