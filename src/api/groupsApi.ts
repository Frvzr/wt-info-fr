import type { Group } from "@/types/referenceTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchGroups = async (): Promise<Group[]> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/groups/`);
  if (!response.ok) {
    throw new Error("Failed to fetch groups");
  }
  return response.json();
}
