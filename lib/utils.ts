import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getErrorMessage(res: Response) {
  try {
    const data = await res.json();
    if (typeof data?.message === "string") return data.message;
  } catch {}
  return `Request failed (${res.status})`;
}