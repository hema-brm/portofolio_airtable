'use client';

import { useRouter } from 'next/navigation';
import GridSection from '@/components/PosterSection';
import ChevronButton from '@/components/ChevronButton';
import { useRef } from 'react';

export default function Home() {
  const router = useRouter();
  const gridRef = useRef<HTMLDivElement>(null);
  
  const handleChevronClick = () => {
    router.push('/projects');
  };

  return (
      <main className="min-h-screen flex flex-col justify-between w-full">
        <GridSection gridRef={gridRef}/>
        <ChevronButton onClick={handleChevronClick} />
      </main>
  );
}
