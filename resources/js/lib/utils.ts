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

export const formattedPrice = (price: string) => {
    let formattedValue = price.replace(/[^0-9.]/g, '');
    const parts = formattedValue.split('.');
    if (parts.length > 1) {
      const decimalPart = parts[1].slice(0, 2);
      formattedValue = `${parts[0]}.${decimalPart}`;
    }
    return formattedValue;
}

export const formatCurrency = (value: string) => {
    const price = parseFloat(value);
    const formattedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

    return formattedPrice;
}




  