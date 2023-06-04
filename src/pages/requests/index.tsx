import { api } from "@/utils/api";
import { Loader2 } from "lucide-react";
import type { NextPage } from "next";
import React from "react";

const CollaborationRequestsPage: NextPage = () => {
  const { data: collaborationRequests, isLoading } =
    api.collaborationRequest.getAll.useQuery();

  console.log({
    collaborationRequests,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="container flex w-full items-center justify-center border border-cpRed p-4">
      <div className="flex flex-col items-center">
        {collaborationRequests?.map((collaborationRequest) => (
          <div key={collaborationRequest.id}>
            <p>requested by: {collaborationRequest.requester.name}</p>

            <p>for doc: {collaborationRequest.doc.title}</p>

            <p>status: {collaborationRequest.approvedStatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollaborationRequestsPage;
