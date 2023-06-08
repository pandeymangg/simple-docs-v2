import RequestItem from "@/components/requests/RequestItem/RequestItem";
import { api } from "@/utils/api";
import { Loader2 } from "lucide-react";
import type { NextPage } from "next";
import React from "react";

const CollaborationRequestsPage: NextPage = () => {
  const { data: collaborationRequests, isLoading } =
    api.collaborationRequest.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (!collaborationRequests?.length) {
    return <div>Empty State</div>;
  }

  return (
    <div className="container flex w-full items-center justify-center p-4">
      <div className="flex flex-1 flex-col items-center">
        {collaborationRequests?.map((collaborationRequest) => (
          <div className="mb-4 w-full overflow-hidden rounded-lg border border-cpOverlay0">
            <RequestItem
              key={collaborationRequest.id}
              approvedStatus={collaborationRequest.approvedStatus}
              docId={collaborationRequest.doc.id}
              docTitle={collaborationRequest.doc.title}
              requesterId={collaborationRequest.requester.id}
              requesterImage={collaborationRequest.requester.image}
              requesterName={collaborationRequest.requester.name ?? "Unknown"}
              requestId={collaborationRequest.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollaborationRequestsPage;
