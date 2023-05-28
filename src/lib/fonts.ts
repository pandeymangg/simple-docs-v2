import { Noto_Sans, Lato } from "next/font/google";

export const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});
