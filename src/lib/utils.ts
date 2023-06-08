import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tw-merge";
import { DEFAULT_USER_IMAGE } from "./constants";

export const cn = (...classNames: ClassValue[]) => twMerge(clsx(classNames));

export const getUserImageURL = (imageURL: string | null) =>
  imageURL || DEFAULT_USER_IMAGE;
