'use client';

import { motion } from 'framer-motion';
import { RefObject } from 'react';
import { ProjectCard } from './ProjectCard';
import { useProjects } from '@/hooks/useProjects';
import { getGithubAvatarUrl } from '@/services/studentsService';

interface ProjectsSectionProps {
  projectsRef: RefObject<HTMLDivElement | null>;
}

export default function ProjectsSection({ projectsRef }: ProjectsSectionProps) {
  const { projects, students, technologies, loading, error } = useProjects();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur de chargement</div>;

  const getStudentAvatars = (studentIds: string[]) => {
    return studentIds
      .map((id) => {
        const student = students.find((student) => student.id === id);
        if (!student) return null;
        return {
          avatarUrl: student.gitHub ? getGithubAvatarUrl(student.gitHub) : '/default_avatar.png',
          fullName: student.fullName,
        };
      })
      .filter((student) => student !== null) as { avatarUrl: string; fullName: string }[];
  };
  

  const getProjectTechnologies = (technologyIds: string[]) => {
    return technologyIds
      .map((id) => technologies.find((tech) => tech.id === id))
      .filter((tech) => tech !== undefined);
  };


  return (
    <motion.section
      id="projects"
      ref={projectsRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-start justify-start pt-8 px-6"
    >
      <h2 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)]">Nos projets</h2>

      <div className="mt-8 grid grid-cols-3 gap-8 w-full">
      {projects && projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.name}
            imageUrl={project.mainImage[0].url|| '/placeholder.jpg'}
            technologies={getProjectTechnologies(project.technologies)}
            studentAvatars={getStudentAvatars(project.students)}
            likes={project.likesTotal}
            slug={project.slug}
          />
        ))}
      </div>
    </motion.section>
  );
}
