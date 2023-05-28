import Loader from "@/components/ui/Loader/Loader";
import { api } from "@/utils/api";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const DocumentPage: NextPage = () => {
  const router = useRouter();
  const { docId } = router.query;

  const { data: docData, isLoading } = api.doc.getDocById.useQuery(
    {
      id: docId as string,
    },
    {
      enabled: !!docId,
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  if (!docData) {
    return <div>404</div>;
  }

  return (
    <div className="mt-16 w-full">
      <div className="container mx-auto flex w-full flex-col gap-8 p-4">
        <h1 className="text-3xl font-semibold">{docData.title}</h1>

        <div className="content__container w-full">
          <textarea className="content__editable w-full" />
        </div>
      </div>
    </div>
  );
};

export default DocumentPage;
