'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GridSection from '@/components/PosterSection';
import ChevronButton from '@/components/ChevronButton';
import ProjectsSection from '@/components/ProjectsSection';

export default function Home() {
  const [showProjects, setShowProjects] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleChevronClick = () => {
    setShowProjects(true);
    setTimeout(() => {
      if (projectsRef.current) {
        projectsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  

  useEffect(() => {
    const gridElement = gridRef.current;

    if (!gridElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setShowProjects(false);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(gridElement);

    return () => {
      observer.observe(gridElement);
    };
  }, []);

  return (
    <main className="h-screen flex flex-col justify-between px-8 py-30 w-full">
      <GridSection gridRef={gridRef} />
      <ChevronButton onClick={handleChevronClick} />

      {showProjects && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1 }}
          className="border-b-2 border-primaryText my-2"
        />
      )}

      <AnimatePresence>
        {showProjects && <ProjectsSection projectsRef={projectsRef} />}
      </AnimatePresence>
    </main>
  );
}
