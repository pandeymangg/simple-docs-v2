import DocItem from "@/components/DocItem";
import { api } from "@/utils/api";
import { Conditional } from "@pandeymangg/react-conditional";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const MyCollabs = () => {
  const { data: myCollabs, isLoading } = api.collaboration.getAll.useQuery();

  return (
    <div className="flex flex-col gap-4">
      <Conditional condition={isLoading}>
        <div className="mt-16 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" size={48} />
        </div>
      </Conditional>

      <Conditional condition={myCollabs?.length === 0}>
        <div className="mt-16 flex flex-col items-center justify-center gap-4">
          <Image
            alt="no-data"
            src="/images/EmptyState.png"
            width={400}
            height={(4 / 3) * 400}
          />
          <p className="text-cpText">You have no collaborations yet.</p>
        </div>
      </Conditional>

      <Conditional condition={!!myCollabs && myCollabs?.length > 0}>
        <div className="mt-6 flex flex-wrap gap-4">
          {myCollabs?.map((collab) => (
            <DocItem
              key={collab.doc.id}
              docId={collab.doc.id}
              docTitle={collab.doc.title}
              isCollaboration={true}
            />
          ))}
        </div>
      </Conditional>
    </div>
  );
};

export default MyCollabs;
