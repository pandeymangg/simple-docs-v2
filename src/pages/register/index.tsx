import {
  type TRegisterForm,
  registerUserSchema,
} from "@/server/schema/user.schema";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Conditional } from "@pandeymangg/react-conditional";
import type { NextPage } from "next";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react";

const RegisterPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterForm>({
    resolver: zodResolver(registerUserSchema),
  });

  const { mutate: registerUser } = api.auth.register.useMutation();

  const onSubmit: SubmitHandler<TRegisterForm> = (data) => {
    registerUser(
      {
        email: data.email,
        name: data.name,
        password: data.password,
      },
      {
        onSuccess: (_, { email, password }) => {
          void signIn("credentials", {
            email,
            password,
            callbackUrl: "/",
          });
        },

        onError: (err) => {
          console.log({ err });
          toast.error(err?.message ?? "Something went wrong");
        },
      }
    );
  };

  return (
    <div className="container mt-32 flex w-full flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-xs flex-col rounded-lg border border-cpOverlay2 bg-cpMantle p-4 shadow-md">
        <h1 className="text-3xl text-cpText">Register</h1>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex flex-col gap-4"
        >
          <label className="flex flex-col gap-1">
            <span className="text-cpText">Email</span>
            <input
              className="input-bordered input bg-cpCrust text-cpText"
              placeholder="Email"
              {...register("email")}
            />

            <Conditional condition={!!errors?.email?.message}>
              <span className="text-xs text-error">
                {errors?.email?.message}
              </span>
            </Conditional>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-cpText">Name</span>
            <input
              className="input-bordered input bg-cpCrust text-cpText"
              placeholder="Your name"
              {...register("name")}
            />

            <Conditional condition={!!errors?.name?.message}>
              <span className="text-xs text-error">
                {errors?.name?.message}
              </span>
            </Conditional>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-cpText">Password</span>
            <input
              className="input-bordered input bg-cpCrust text-cpText"
              placeholder="Password"
              {...register("password")}
            />

            <Conditional condition={!!errors?.password?.message}>
              <span className="text-xs text-error">
                {errors?.password?.message}
              </span>
            </Conditional>
          </label>

          <button className="btn-primary btn capitalize" type="submit">
            Register
          </button>
        </form>
      </div>

      <Toaster />
    </div>
  );
};

export default RegisterPage;
