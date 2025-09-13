import { clsx, type ClassValue } from "clsx";

// Simple className merging function without tailwind-merge dependency
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
