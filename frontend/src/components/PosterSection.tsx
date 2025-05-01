'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { RefObject } from 'react';

interface GridSectionProps {
  gridRef: RefObject<HTMLDivElement | null>;
}

export default function GridSection({ gridRef }: GridSectionProps) {
  return (
    <section
      ref={gridRef}
      className="min-h-screen bg-black text-white grid grid-cols-12 grid-rows-6 gap-6 px-12 py-12"
    >
      <div className="col-span-3 row-span-2 relative">
        <Image
          src="/img1.png"
          alt="Image 1"
          fill
          className="object-cover rounded-md"
        />
      </div>

      <div className="col-span-3 row-span-2 relative row-start-3">
        <Image
          src="/img2.png"
          alt="Image 2"
          fill
          className="object-cover rounded-md"
        />
      </div>

      <div className="col-start-7 col-span-6 row-span-3 flex items-center justify-center">
        <motion.h1
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-6xl font-bold leading-tight text-right"
        >
          PORTFOLIO <br /> ESGI
        </motion.h1>
      </div>

      <div className="col-start-7 col-span-6 row-start-4 row-span-2 relative">
        <Image
          src="/img3.png"
          alt="Image 3"
          fill
          className="object-cover rounded-md"
        />
      </div>

      <div className="col-span-6 row-start-5 row-span-1 flex flex-col justify-end">
        <motion.h2
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="text-xl font-semibold mb-2"
        >
          Creative Portfolio
        </motion.h2>
        <p className="text-sm text-gray-300 max-w-md leading-relaxed">
          Découvrez les projets réalisés par les étudiants de l’ESGI, mêlant innovation,
          technologie et créativité. Chaque réalisation reflète leur savoir-faire, leur
          engagement et leur passion pour l’ingénierie du web et du numérique.
        </p>
      </div>

      <div className="col-start-11 col-span-2 row-start-6 flex items-end justify-end text-sm text-gray-500">
        <span className="border-t border-gray-600 w-8 mr-2"></span> ©2024 - 2025
      </div>
      <div>
        
      </div>
    </section>
  );
}
