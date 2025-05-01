import { useEffect, useState } from 'react';
import { fetchAllProjects, fetchPublishedProjects } from '@/services/projectsService';
import { Project } from '@/types/project';
import { Student } from '@/types/student';
import { fetchAllStudents } from '@/services/studentsService';
import { Technology } from '@/types/technology';
import { fetchAllTechnologies } from '@/services/technologiesService';
import { getCurrentUser } from '@/services/authService';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchWithRetry = async <T>(fn: () => Promise<T>, retries = 2): Promise<T> => {
    try {
      return await fn();
    } catch (err) {
      if (retries > 0) {
        return fetchWithRetry(fn, retries - 1);
      }
      throw err;
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        const token = localStorage.getItem('token');
        let isAdmin = false;

        if (token) {
          try {
            const user = await getCurrentUser(token);
            isAdmin = user?.role === 'admin';
          } catch (e: unknown) {
            console.warn('Impossible de récupérer l’utilisateur courant, fallback à public', e);
          }
        }

        const [projectsData, studentsData, technologiesData] = await Promise.all([
          fetchWithRetry(() => isAdmin ? fetchAllProjects(token!) : fetchPublishedProjects()),
          fetchWithRetry(fetchAllStudents),
          fetchWithRetry(fetchAllTechnologies),
        ]);

        setProjects(projectsData);
        setStudents(studentsData);
        setTechnologies(technologiesData);

      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { projects, students, technologies, loading, error };
}
