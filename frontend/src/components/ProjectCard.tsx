'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import { Technology } from '@/types/technology';
import { useRouter } from 'next/navigation';

interface ProjectCardProps {
  title: string;
  imageUrl: string;
  technologies: Technology[];
  studentAvatars: { avatarUrl: string; fullName: string }[];
  likes: number;
  slug: string;
}

export function ProjectCard({ title, imageUrl, technologies, studentAvatars, likes, slug }: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleTechs, setVisibleTechs] = useState<string[]>([]);
  const [remainingTechs, setRemainingTechs] = useState<number>(0);
  const router = useRouter();
  useEffect(() => {
    const updateVisibleTechs = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      let usedWidth = 0;
      const newVisibleTechs: string[] = [];

      const tempCanvas = document.createElement('canvas');
      const ctx = tempCanvas.getContext('2d');
      ctx!.font = "12px sans-serif";

      for (const tech of technologies) {
        const textWidth = ctx!.measureText(tech.name).width + 32;
        if (usedWidth + textWidth > containerWidth) {
          break;
        }
        usedWidth += textWidth + 8;
        newVisibleTechs.push(tech.name);
      }

      setVisibleTechs(newVisibleTechs);
      setRemainingTechs(technologies.length - newVisibleTechs.length);
    };

    updateVisibleTechs();
    window.addEventListener('resize', updateVisibleTechs);
    return () => window.removeEventListener('resize', updateVisibleTechs);
  }, [technologies]);

  const handleClick = () => {
    router.push(`/projects/${slug}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative flex flex-col bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 w-full max-w-sm"
      onClick={handleClick}
    >
     <div className="relative">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={300}
          className="object-cover w-full h-48 md:h-56"
        />
        
        <div className="absolute top-2 right-2 flex items-center bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm gap-1">
          <Heart className="w-4 h-4 text-red-500" />
          <span>{likes}</span>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-4 bg-gray-900 shadow-2xl">
        <h3 className="text-lg font-semibold text-primary leading-tight line-clamp-2">
          {title}
        </h3>

        <div ref={containerRef} className="flex items-center gap-2 mt-2 overflow-hidden whitespace-nowrap">
          {visibleTechs.map((tech, index) => (
            <span
              key={index}
              className="bg-gray-700 text-white text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap overflow-hidden text-ellipsis max-w-[80px]"
            >
              {tech}
            </span>
          ))}
          {remainingTechs > 0 && (
            <span className="bg-gray-500 text-white text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap">
              +{remainingTechs}
            </span>
          )}
        </div>

        <div className="flex items-center justify-end mt-3 overflow-hidden whitespace-nowrap">
          {studentAvatars.slice(0, 3).map((student, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full border-2 border-white overflow-hidden shrink-0 ${index !== 0 ? '-ml-2' : ''}`}
              title={student.fullName}
            >
              <Image 
                src={student.avatarUrl} 
                alt="Student Avatar" 
                width={32} 
                height={32} 
                className="object-cover w-full h-full" 
              />
            </div>
          ))}
          {studentAvatars.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-gray-600 text-white text-xs flex items-center justify-center border-2 border-white shrink-0 -ml-2">
              +{studentAvatars.length - 3}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
