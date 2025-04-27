import { useEffect, useState } from 'react';
import { fetchPublishedProjects } from '@/services/projectsService';
import { Project } from '@/types/project';
import { Student } from '@/types/student';
import { fetchAllStudents } from '@/services/studentsService';
import { Technology } from '@/types/technology';
import { fetchAllTechnologies } from '@/services/technologiesService';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [projectsData, studentsData, technologiesData] = await Promise.all([
          fetchPublishedProjects(),
          fetchAllStudents(),
          fetchAllTechnologies()
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
