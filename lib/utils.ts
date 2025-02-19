import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function debounce(func: any, delay: any) {
  let timer: string | number | NodeJS.Timeout | undefined;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

/**
 * Generic filter function that works for any dataset
 */
export function filterData<T extends Record<string, any>>(
  data: T[],
  filterKey: keyof T | null,
  filterValue: any,
  searchKeys: (keyof T)[],
  query: string
): T[] {
  let result = [...data]; // Avoid mutating the original array
  
  // If ALL is the filterValue, return all data
  if (filterValue === "ALL") result = result;

  // Apply filter if filterKey and filterValue exist
  if (filterValue !== "ALL" && filterKey && filterValue !== undefined) {
    result = result.filter((item) => {
      const itemValue = item[filterKey];

      // Check if either value is a number and convert both to the same type before comparison
      if (typeof itemValue === "number" && typeof filterValue === "string") {
        return itemValue === Number(filterValue); // Convert string to number
      } else if (
        typeof itemValue === "string" &&
        typeof filterValue === "number"
      ) {
        return Number(itemValue) === filterValue; // Convert string to number
      } else {
        return itemValue === filterValue; // Direct comparison for same types
      }
    });
  }


  // Apply search filtering if query exists
  if (query) {
    const lowerQuery = query.toLowerCase();
    result = result.filter((item) =>
      searchKeys.some((key) =>
        String(item[key] ?? "")
          .toLowerCase()
          .includes(lowerQuery)
      )
    );
  }

  return result;
}
