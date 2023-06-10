import { getUserImageURL } from "@/lib/utils";
import { api } from "@/utils/api";
import { Conditional } from "@pandeymangg/react-conditional";
import type { Collaboration } from "@prisma/client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

type TAccessLevel = Collaboration["accessLevel"];

const Settings = () => {
  const router = useRouter();

  const { docId } = router.query;

  const { data: docCollaborators, isLoading } =
    api.collaboration.getAllCollaborationsByDocId.useQuery(
      {
        docId: docId as string,
      },
      {
        enabled: !!docId,
      }
    );

  const [accessLevel, setAccessLevel] = useState<TAccessLevel>("READ");

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mt-16 p-4">
      <h1 className="text-2xl font-bold">Collaboration Settings</h1>

      <div className="flex flex-col gap-2">
        <Conditional
          condition={!!docCollaborators && docCollaborators?.length > 0}
        >
          {docCollaborators?.map((collaborator) => {
            return (
              <div
                key={collaborator.id}
                className="flex items-center justify-between gap-2 border-b border-primary last:border-b-0"
              >
                <div className="flex items-center gap-2">
                  <Image
                    alt="user-avatar"
                    src={getUserImageURL(collaborator.collaborator.image)}
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-cpMauve"
                  />

                  <p className="text-sm font-medium text-cpText">
                    {collaborator.collaborator.name}
                  </p>
                </div>

                <div>
                  <select
                    value={accessLevel}
                    onChange={(e) => {
                      const selectedValue = e.target.value as TAccessLevel;
                      setAccessLevel(selectedValue);
                    }}
                    className="select-primary select w-full max-w-[160px] bg-cpCrust text-sm"
                  >
                    <option disabled>Access Level</option>
                    <option onClick={() => setAccessLevel("READ")}>Read</option>
                    <option onClick={() => setAccessLevel("WRITE")}>
                      Write
                    </option>
                  </select>
                </div>
              </div>
            );
          })}
        </Conditional>
      </div>
    </div>
  );
};

export default Settings;
