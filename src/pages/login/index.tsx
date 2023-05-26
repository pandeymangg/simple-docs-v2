import type { NextPage } from "next";
import React from "react";
import { GithubIcon } from "lucide-react";
import { signIn } from "next-auth/react";

const LoginPage: NextPage = () => {
  const handleGithubSignIn = async () => {
    await signIn("github");
  };

  return (
    <div className="mt-32 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6 rounded-lg bg-surface0 p-6">
        <h1 className="text-center text-3xl font-bold text-text">
          Sign in to your account
        </h1>

        <button
          onClick={() => {
            void handleGithubSignIn();
          }}
          className="w-full rounded-lg border border-flamingo bg-surface2 py-4 hover:bg-surface1"
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
