'use client';

import { motion } from 'framer-motion';
import { RefObject, useEffect, useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { useProjects } from '@/hooks/useProjects';
import { getGithubAvatarUrl } from '@/services/studentsService';
import SearchBar from './SearchBar';
import Loader from './Loader';
import { getCurrentUser } from '@/services/authService';

interface ProjectsSectionProps {
  projectsRef: RefObject<HTMLDivElement | null>;
}

export default function ProjectsSection({ projectsRef }: ProjectsSectionProps) {
  const { projects, students, technologies, loading, error } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
  
    getCurrentUser(token)
      .then((user) => {
        if (user?.role === 'admin') {
          setIsAdmin(true);
        }
      })
      .catch(() => {});
  }, []);
  
  if (loading) {
    return (
    <div className="text-white">    
      <Loader size={20} />
    </div>);
  }
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

  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
  
    const inName = project.name.toLowerCase().includes(query);
    const inDescription = project.description?.toLowerCase().includes(query);
  
    const inTechnologies = getProjectTechnologies(project.technologies)
      .some((tech) => tech?.name.toLowerCase().includes(query));
  
    const inStudents = project.students
      .map((id) => {
        const student = students.find((s) => s.id === id);
        return student?.fullName.toLowerCase();
      })
      .some((fullName) => fullName?.includes(query));
  
    return inName || inDescription || inTechnologies || inStudents;
  });


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
      <h2 className="text-4xl font-bold mb-10 font-[family-name:var(--font-geist-sans)]">Nos projets</h2>
      <div className="mb-8  w-full">
        <SearchBar
          placeholder="Rechercher un projet ou un étudiant..."
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>
      <div className="mt-8 mb-10 grid grid-cols-3 gap-8 w-full">
      {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.name}
            imageUrl={project.mainImage[0].url|| '/placeholder.jpg'}
            technologies={getProjectTechnologies(project.technologies)}
            studentAvatars={getStudentAvatars(project.students)}
            likes={project.likesTotal}
            slug={project.slug}
            isPublished={project.isPublished}
            isAdmin={isAdmin}
          />
        ))
      ): (
        <div className="text-white">Aucun projet trouvé.</div>
      )}
      </div>
    </motion.section>
  );
}
