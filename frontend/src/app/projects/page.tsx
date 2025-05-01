'use client';

import AuthHeader from '@/components/Header';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import ProjectsSection from '@/components/ProjectsSection';
import { useRef } from 'react';

export default function ProjectsPage() {
    const projectsRef = useRef<HTMLDivElement>(null);
  return (
    <PageTransitionWrapper keyName="projects">
        <AuthHeader />
      <main className="min-h-screen flex flex-col px-8 w-full">
        <ProjectsSection projectsRef={projectsRef}/>
      </main>
    </PageTransitionWrapper>
  );
}
