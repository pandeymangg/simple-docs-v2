import { Conditional } from "@pandeymangg/react-conditional";
import { FileText, Settings, Trash2 } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import { DOC_SETTINGS_MODAL_ID } from "@/lib/constants";

type TDocItemProps = {
  docId: string;
  docTitle: string;
  isCollaboration?: boolean;
  onDelete?: () => void;
};

const DocItem: React.FC<TDocItemProps> = (props) => {
  const { docId, docTitle, isCollaboration = false, onDelete } = props;

  const router = useRouter();

  return (
    <>
      <div
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
            void router.push(`/doc/${docId}`);
          }}
        >
          <FileText size={64} className="text-primary" />
        </div>

        <div className="flex flex-col gap-4 p-4">
          <p className="line-clamp-2 text-sm font-medium text-cpText">
            {docTitle}
          </p>

          <Conditional condition={!isCollaboration}>
            <div className="flex items-center gap-2">
              <Trash2
                size={16}
                onClick={() => {
                  if (onDelete) {
                    void onDelete();
                  }

                  return;
                }}
                className="cursor-pointer"
              />

              <label htmlFor={DOC_SETTINGS_MODAL_ID}>
                <Settings
                  size={16}
                  className="cursor-pointer"
                  onClick={() => void router.push(`/doc/${docId}/settings`)}
                />
              </label>
            </div>
          </Conditional>
        </div>
      </div>
    </>
  );
};

export default DocItem;
