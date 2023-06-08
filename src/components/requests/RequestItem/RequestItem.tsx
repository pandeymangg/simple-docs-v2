import { getUserImageURL } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IRequestItemProps {
  requestId: string;
  docTitle: string;
  docId: string;
  requesterName: string;
  requesterId: string;
  requesterImage: string | null;
  approvedStatus: string;
}

const RequestItem: React.FC<IRequestItemProps> = (props) => {
  const {
    approvedStatus,
    docTitle,
    docId,
    requestId,
    requesterId,
    requesterImage,
    requesterName,
  } = props;

  return (
    <div className="flex w-full items-center justify-between bg-cpMantle p-4 shadow-md">
      <div className="flex items-center gap-2">
        <Image
          alt="user-image"
          src={getUserImageURL(requesterImage)}
          width={48}
          height={48}
          className="rounded-full"
        />

        <div className="flex flex-col">
          <p className="text-base font-semibold">{requesterName}</p>
          <p className="text-sm">
            for{" "}
            <Link href={`/doc/${docId}`}>
              <span className="font-semibold text-primary">{docTitle}</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequestItem;
