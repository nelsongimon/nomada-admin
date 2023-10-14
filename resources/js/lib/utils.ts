import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function capitalizeString(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(str: string): string {
    const normalizedString = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const replacedString = normalizedString.replace(/ñ/g, "n").replace(/Ñ/g, "N");
    return replacedString.replace(/\s+/g, "-").toLowerCase();
  }
  