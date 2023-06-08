import { getUserImageURL } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface IRequestItemProps {
  requestId: string;
  docTitle: string;
  requesterName: string;
  requesterId: string;
  requesterImage: string | null;
  approvedStatus: string;
}

const RequestItem: React.FC<IRequestItemProps> = (props) => {
  const {
    approvedStatus,
    docTitle,
    requestId: id,
    requesterId,
    requesterImage,
    requesterName,
  } = props;

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="">
          <Image
            alt="user-image"
            src={getUserImageURL(requesterImage)}
            width={64}
            height={64}
          />
        </div>
      </div>
    </div>
  );
};

export default RequestItem;
