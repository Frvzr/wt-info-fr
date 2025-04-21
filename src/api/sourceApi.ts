import type { Source } from "@/types/referenceTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchSource = async (): Promise<Source[]> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/source/`);
  if (!response.ok) {
    throw new Error("Failed to fetch source");
  }
  return response.json();
}
