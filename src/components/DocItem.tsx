import { Conditional } from "@pandeymangg/react-conditional";
import { FileText, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

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

      <div className="flex items-center justify-between p-4">
        <p className="text-sm font-medium text-cpText">{docTitle}</p>

        <Conditional condition={!isCollaboration}>
          <div
            className="btn-ghost btn"
            onClick={() => {
              if (onDelete) {
                void onDelete();
              }

              return;
            }}
          >
            <Trash2 size={16} />
          </div>
        </Conditional>
      </div>
    </div>
  );
};

export default DocItem;
