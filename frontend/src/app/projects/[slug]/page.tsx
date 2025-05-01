'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProjectBySlug } from '@/services/projectsService';
import { fetchAllStudents } from '@/services/studentsService';
import { fetchAllTechnologies } from '@/services/technologiesService';
import { getGithubAvatarUrl } from '@/services/studentsService';
import { Project } from '@/types/project';
import { Student } from '@/types/student';
import { Technology } from '@/types/technology';
import Image from 'next/image';
import MediaCarousel from '@/components/MediaCarousel';
import LikeToggle from '@/components/LikeToggle';
import Loader from '@/components/Loader';
import { getCurrentUser } from '@/services/authService';
import AuthHeader from '@/components/Header';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);

  useEffect(() => {
    async function load() {
      const [p, s, t] = await Promise.all([
        fetchProjectBySlug(slug as string),
        fetchAllStudents(),
        fetchAllTechnologies(),
      ]);
      setProject(p);
      setStudents(s);
      setTechnologies(t);

      try {
        const token = localStorage.getItem('token');
        if (token) {
          const currentUser = await getCurrentUser(token);
          setUser(currentUser);
        }
      } catch {
        setUser(null);
      }
    }
    load();
    
  }, [slug]);

  if (!project) {
    return (
    <div className="text-white">    
      <Loader size={20} />
    </div>);

  }

  const handleTogglePublish = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
  
    const endpoint = project.isPublished ? 'unpublish' : 'publish';
  
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${project.id}/${endpoint}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    setProject((prev) => ({ ...prev!, isPublished: !prev!.isPublished }));
  };

  const studentList = students.filter((s) => project.students.includes(s.id));
  const techList = technologies.filter((t) => project.technologies.includes(t.id));

  return (
    <>
    <AuthHeader />
    <main className="min-h-screen w-full px-8 py-16 text-white">
      <div className="max-w-5xl mx-auto">
        <div className='flex justify-between'>
          <div className='flex flex-row gap-4'>
          <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
            {user?.role === 'admin' && (
            <button
              onClick={handleTogglePublish}
              className={`bg-transparent border-0 ml-3 text-m rounded font-medium  ${
                project.isPublished ? ' text-yellow-600 hover:bg-gray-700/40' 
                : ' text-blue-500 hover:bg-gray-700/40'}
                transition duration-150 ease-in-out
                `}
            >
              {project.isPublished ? 'Dépublier' : 'Publier'}
            </button>
            )}
          </div>
          <LikeToggle project={project} />
        </div>
        <p className="text-secondaryText mb-6 max-w-3xl leading-relaxed">
          {project.description}
        </p>

        <div className="relative w-full h-96 mb-8">
          <MediaCarousel media={project.media} />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Technologies utilisées</h2>
          <div className="flex flex-wrap gap-2">
            {techList.map((tech) => (
              <span
                key={tech.id}
                className="bg-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Équipe</h2>
          <div className="flex gap-4 flex-wrap">
            {studentList.map((student) => (
              <div key={student.id} className="flex items-center space-x-2">
                <Image
                  src={getGithubAvatarUrl(student.gitHub)}
                  alt={student.fullName}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <a
                  href={student.gitHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
                >
                  {student.fullName}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
