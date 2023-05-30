import type { NextPage } from "next";
import React from "react";
import { GithubIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type Credentials = z.infer<typeof credentialsSchema>;

const LoginPage: NextPage = () => {
  const handleGithubSignIn = async () => {
    await signIn("github", {
      callbackUrl: "/",
    });
  };

  const { register, handleSubmit } = useForm<Credentials>({
    resolver: zodResolver(credentialsSchema),
  });

  const onCredentialsSubmit: SubmitHandler<Credentials> = (data) => {
    void signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="mt-32 flex items-center justify-center">
      <div className="bg-surface0 flex flex-col items-center justify-center gap-6 rounded-lg p-6">
        <h1 className="text-text text-center text-3xl font-bold">
          Sign in to your account
        </h1>

        <form onSubmit={handleSubmit(onCredentialsSubmit)}>
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-text">Email</p>
              <input
                className="input bg-cpSurface1"
                {...register("email")}
              ></input>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-text">Password</p>
              <input
                className="input bg-cpSurface1"
                type="password"
                {...register("password")}
              ></input>
            </div>

            <button className="btn" type="submit">
              <p className="text-surface0">Sign in</p>
            </button>
          </div>
        </form>

        <button
          onClick={() => {
            void handleGithubSignIn();
          }}
          className="border-teal bg-surface2 hover:bg-surface1 dark:border-flamingo w-full rounded-lg border-2 py-4"
        >
          <div className="flex w-full items-center justify-center gap-4">
            <button>
              <GithubIcon size={24} />
            </button>
            <p className="font-semibold">Continue with Github</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
