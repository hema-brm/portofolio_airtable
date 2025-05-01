'use client';

import { useEffect, useState } from 'react';

import { Project } from '@/types/project';
import { Heart } from 'lucide-react';
import { createLike, deleteLike, getUserIp } from '@/services/likesService';

interface ProjectLikeButtonProps {
  project: Project;
}

export default function ProjectLikeButton({ project }: ProjectLikeButtonProps) {
  const [userIp, setUserIp] = useState<string | null>(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(project.likesTotal); 

  useEffect(() => {
    async function loadIp() {
      const ip = await getUserIp();
      setUserIp(ip);

      if (ip && project.likes.includes(ip)) {
        setHasLiked(true);
      }
    }

    loadIp();
  }, [project.likes]);

  const handleLike = async () => {
    if (!userIp) return;

    if (hasLiked) {
        await deleteLike(project.id, userIp);
        setHasLiked(false);
        setLikesCount((prev) => prev - 1);
      } else {
        await createLike(project.id, userIp);
        setHasLiked(true);
        setLikesCount((prev) => prev + 1);
      }
  };

  return (
    <button
      onClick={handleLike}
      className="flex items-center space-x-2 text-white hover:text-accent transition"
    >
        <span>{likesCount}</span>  
        <Heart
            className={`w-10 h-10 p-1 rounded-full cursor-pointer transition 
            ${hasLiked ? 'bg-red-950' : 'hover:bg-red-950'}
            `}
            fill={hasLiked ? '#900C3F' : 'none'}
            stroke="white"
        />
    </button>
  );
}
