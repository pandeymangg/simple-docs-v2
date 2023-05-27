import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tw-merge";

export const cn = (...classNames: ClassValue[]) => twMerge(clsx(classNames));
