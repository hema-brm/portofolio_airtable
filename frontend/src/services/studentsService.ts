import { Student } from "@/types/student";
import { handleResponse } from '@/services/fetcher';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchAllStudents(): Promise<Student[]> {
  const res = await fetch(`${BASE_URL}/students`, {
    next: { revalidate: 60 },
  });
  return handleResponse<Student[]>(res);
}

export async function fetchStudentById(id: string): Promise<Student> {
  const res = await fetch(`${BASE_URL}/students/${id}`, {
    next: { revalidate: 60 },
  });
  return handleResponse<Student>(res);
}

export function getGithubAvatarUrl(githubProfileUrl: string): string {
    try {
      const username = new URL(githubProfileUrl).pathname.split('/')[1];
      return `https://github.com/${username}.png`;
    } catch {
      return '/default-icon.png';
    }
  }
