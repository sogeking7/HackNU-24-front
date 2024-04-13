import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "auto",
  });
};

export const shorten = (text: string, length: number) => {
  if (!text) return null;
  return text.length > length ? text.slice(0, length) + "..." : text;
};

// export const formatDate = (date: Date) => {
//   let day = date.getDate();
//   let month = date.getMonth();
//   let year = date.getFullYear();
// };

export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};
