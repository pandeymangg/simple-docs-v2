import { api } from "@/utils/api";
import { Conditional } from "@pandeymangg/react-conditional";
import type { NextPage } from "next";
import React from "react";
import { Loader2 } from "lucide-react";
import { Plus } from "lucide-react";
import { useRouter } from "next/router";

const DashboardPage: NextPage = () => {
  const router = useRouter();
  const { data: allDocs, isLoading } = api.doc.getAll.useQuery();
  const { mutate: createDoc } = api.doc.create.useMutation();

  const utils = api.useContext();

  if (isLoading)
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
              <div
                className="flex w-full min-w-[80px]
               max-w-[120px] cursor-pointer items-center justify-center
               rounded-sm border border-cpOverlay0 bg-cpMantle hover:border-cpMauve"
                style={{
                  aspectRatio: "3/4",
                }}
                onClick={() => {
                  createDoc(
                    {
                      title: "Untitled",
                    },
                    {
                      onSuccess: (data) => {
                        const { id } = data;
                        void router.push(`/doc/${id}`);
                      },
                    }
                  );
                }}
              >
                <Plus size={64} className="text-cpMauve" />
              </div>

              <p className="text-sm font-medium text-cpText">Blank</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="container mx-auto w-full p-4">
          <h2 className="font-medium">Recent documents</h2>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;