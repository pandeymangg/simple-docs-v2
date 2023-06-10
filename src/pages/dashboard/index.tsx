import { Conditional } from "@pandeymangg/react-conditional";
import type { NextPage } from "next";
import React, { useState } from "react";
import CreateDocForm from "@/components/dashboard/CreateDocForm";
import { CREATE_DOC_FORM_MODAL_ID } from "@/lib/constants";
import clsx from "clsx";
import MyDocs from "@/components/dashboard/MyDocs/MyDocs";
import MyCollabs from "@/components/dashboard/MyCollabs/MyCollabs";
import { Plus } from "lucide-react";

type TTabs = "owned" | "not-owned";

const DashboardPage: NextPage = () => {
  const [activeTab, setActiveTab] = useState<TTabs>("owned");

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col bg-cpCrust">
        <div className="container mx-auto w-full p-4">
          <div className="flex flex-col gap-4">
            <h3 className="text-cpText">Start a new document</h3>

            <div className="flex flex-col gap-2">
              <label htmlFor={CREATE_DOC_FORM_MODAL_ID}>
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
          <div className="flex flex-col gap-2">
            <h2 className="font-medium">Recent documents</h2>

            <div className="tabs tabs-boxed">
              <a
                onClick={() => setActiveTab("owned")}
                className={clsx("tab", activeTab === "owned" && "tab-active")}
              >
                My documents
              </a>
              <a
                onClick={() => setActiveTab("not-owned")}
                className={clsx(
                  "tab",
                  activeTab === "not-owned" && "tab-active"
                )}
              >
                My collaborations
              </a>
            </div>
          </div>

          <Conditional condition={activeTab === "owned"}>
            <MyDocs />
          </Conditional>

          <Conditional condition={activeTab === "not-owned"}>
            <MyCollabs />
          </Conditional>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
