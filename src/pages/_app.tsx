import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import BaseLayout from "@/components/layout/BaseLayout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ThemeProvider
      attribute="data-theme"
      enableSystem
      defaultTheme="rosepineDawn"
    >
      <SessionProvider session={session}>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
