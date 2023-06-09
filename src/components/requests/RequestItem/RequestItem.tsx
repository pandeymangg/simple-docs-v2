import { getUserImageURL } from "@/lib/utils";
import { api } from "@/utils/api";
import { Conditional } from "@pandeymangg/react-conditional";
import { type CollaborationRequest } from "@prisma/client";
import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface IRequestItemProps {
  requestId: string;
  docTitle: string;
  docId: string;
  requesterName: string;
  requesterId: string;
  requesterImage: string | null;
  approvedStatus: CollaborationRequest["approvedStatus"];
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

  const [expanded, setExpanded] = useState(false);

  const { mutate: acceptRequest } =
    api.collaborationRequest.accept.useMutation();

  return (
    <div className="flex w-full flex-col bg-cpMantle p-4 shadow-md">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Conditional
              condition={expanded}
              fallback={
                <ChevronDown
                  onClick={() => setExpanded(true)}
                  className="cursor-pointer"
                />
              }
            >
              <ChevronUp
                onClick={() => setExpanded(false)}
                className="cursor-pointer"
              />
            </Conditional>
            <Image
              alt="user-image"
              src={getUserImageURL(requesterImage)}
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>

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

        <div
          className={clsx(
            "rounded-full px-2 py-1 text-center text-sm capitalize",
            approvedStatus === "PENDING" && "bg-cpPeach text-cpBase"
          )}
        >
          {approvedStatus.toLocaleLowerCase()}
        </div>
      </div>

      <Conditional condition={expanded}>
        <div className="mt-4 flex items-center gap-2">
          <button
            className="text-primary"
            onClick={() => {
              acceptRequest({ requestId });
            }}
          >
            Accept
          </button>

          <button className="text-primary">Reject</button>
        </div>
      </Conditional>
    </div>
  );
};

export default RequestItem;
