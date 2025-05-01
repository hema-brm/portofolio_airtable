import { Project } from "@/types/project";
import { handleResponse } from '@/services/fetcher';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchAllProjects(token: string): Promise<Project[]> {
  const res = await fetch(`${BASE_URL}/projects/admin/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  return handleResponse<Project[]>(res);
}

export async function fetchPublishedProjects(): Promise<Project[]> {
  const res = await fetch(`${BASE_URL}/projects/published`, {
    next: { revalidate: 60 },
  });
  return handleResponse<Project[]>(res);
}

export async function fetchProjectBySlug(slug: string): Promise<Project> {
  const res = await fetch(`${BASE_URL}/projects/${slug}`, {
    next: { revalidate: 60 }, 
  });
  return handleResponse<Project>(res);
}

export async function publishProject(id: string, token: string): Promise<Project> {
  const res = await fetch(`${BASE_URL}/projects/${id}/publish`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  return handleResponse<Project>(res);
}

export async function unpublishProject(id: string, token: string): Promise<Project> {
  const res = await fetch(`${BASE_URL}/projects/${id}/unpublish`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  return handleResponse<Project>(res);
}

