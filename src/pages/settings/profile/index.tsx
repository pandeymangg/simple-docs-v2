import {
  updateUserSchema,
  type TUpdateUserForm,
} from "@/server/schema/user.schema";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Conditional } from "@pandeymangg/react-conditional";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

const ProfileSettingsForm = ({
  userData,
}: {
  userData: { name: string; avatar: string };
}) => {
  const { update } = useSession();
  const { avatar, name } = userData;

  const { mutate: updateUser } = api.user.update.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUpdateUserForm>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name,
      avatar,
    },
  });

  const onSubmit: SubmitHandler<TUpdateUserForm> = (data) => {
    updateUser(
      {
        avatar: data.avatar ?? null,
        name: data.name,
      },
      {
        onSuccess: (resp, vars) => {
          console.log({ vars });
          console.log({ resp });

          void update({
            name: resp.name,
            image: resp.image,
          });
        },

        onError: (error) => {
          console.log({ error });
        },
      }
    );
  };

  return (
    <div>
      <h1>Profile Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="flex flex-col gap-1">
            <span className="text-cpText">Name</span>
            <input
              className="input-bordered input bg-cpCrust text-cpText"
              placeholder="Name"
              {...register("name")}
            />
            <Conditional condition={!!errors?.name}>
              <span className="text-cpRed">{errors?.name?.message}</span>
            </Conditional>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-cpText">Username</span>
            <input
              className="input-bordered input bg-cpCrust text-cpText"
              placeholder="avatar"
              {...register("avatar", {})}
            />

            <Conditional condition={!!errors?.avatar}>
              <span className="text-cpRed">{errors?.avatar?.message}</span>
            </Conditional>
          </label>

          <button className="btn-primary btn mt-2" type="submit">
            <span>Save</span>
          </button>
        </div>
      </form>
    </div>
  );
};

const ProfileSettingsPage: NextPage = () => {
  const { data: userData, status } = useSession();

  const isAuthenticated = status === "authenticated";

  if (status === "loading") {
    return <div>loading...</div>;
  }

  if (isAuthenticated && userData?.user) {
    return (
      <ProfileSettingsForm
        userData={{
          name: userData?.user?.name ?? "",
          avatar: userData?.user?.image ?? "",
        }}
      />
    );
  }

  return <div>Not authenticated</div>;
};

export default ProfileSettingsPage;
