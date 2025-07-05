import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export default function clsxm(...args: ClassValue[]) {
	return twMerge(clsx(...args));
}
