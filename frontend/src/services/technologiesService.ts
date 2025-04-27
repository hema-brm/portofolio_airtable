import { Technology } from "@/types/technology";
import { handleResponse } from '@/services/fetcher';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchAllTechnologies(): Promise<Technology[]> {
  const res = await fetch(`${BASE_URL}/technologies`, {
    next: { revalidate: 60 },
  });
  return handleResponse<Technology[]>(res);
}

export async function fetchTechnologyById(id: string): Promise<Technology> {
  const res = await fetch(`${BASE_URL}/technologies/${id}`, {
    next: { revalidate: 60 },
  });
  return handleResponse<Technology>(res);
}
