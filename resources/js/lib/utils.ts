import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function capitalizeString(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(str: string): string {
    return str.replace(/\s+/g, "-").toLowerCase();
}