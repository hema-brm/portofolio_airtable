'use client';

import Image from 'next/image';
import { RefObject } from 'react';

interface GridSectionProps {
  gridRef: RefObject<HTMLDivElement | null>;
}

export default function GridSection({ gridRef }: GridSectionProps) {
  return (
    <div ref={gridRef} 
        className="flex-1 grid grid-cols-2 grid-rows-2 gap-6 gap-y-1"
    >
      <div className="relative w-full h-64 bg-blue-200 flex justify-center items-center">
        Image 1 + 2
      </div>
      <div className="relative w-full h-64 bg-amber-400 flex justify-center items-center">
        Titre
      </div>
      <div className="relative w-full h-64 bg-pink-400 flex justify-center items-center">
        Texte Description
      </div>
      <div className="relative w-full h-64 bg-blue-100 flex justify-center items-center">
        Image 3
      </div>
    </div>
  );
}
