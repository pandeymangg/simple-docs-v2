import {
  updateUserSchema,
  type TUpdateUserForm,
} from "@/server/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Conditional } from "@pandeymangg/react-conditional";
import type { NextPage } from "next";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ProfileSettingsPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUpdateUserForm>({
    resolver: zodResolver(updateUserSchema),
  });

  const onSubmit: SubmitHandler<TUpdateUserForm> = (data) => {
    console.log({ data });
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
            <span className="text-cpText">Email</span>
            <input
              className="input-bordered input bg-cpCrust text-cpText"
              placeholder="email"
              type="email"
              {...register("email")}
            />

            <Conditional condition={!!errors?.email}>
              <span className="text-cpRed">{errors?.email?.message}</span>
            </Conditional>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-cpText">Username</span>
            <input
              className="input-bordered input bg-cpCrust text-cpText"
              placeholder="avatar"
              {...register("avatar", { required: false })}
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

export default ProfileSettingsPage;
