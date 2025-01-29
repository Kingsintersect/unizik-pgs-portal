import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function debounce(func: any, delay:any) {
   let timer: string | number | NodeJS.Timeout | undefined;
   return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
   };
}