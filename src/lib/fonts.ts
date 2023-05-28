import { Poppins, Lato } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});
