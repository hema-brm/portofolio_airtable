'use client';

import { useState } from 'react';
import { Media } from '@/types/project';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';

interface MediaCarouselProps {
  media: Media[];
}

export default function MediaCarousel({ media }: MediaCarouselProps) {
  const [index, setIndex] = useState(0);

  if (!media || media.length === 0) return null;

  const current = media[index];

  const next = () => setIndex((prev) => (prev + 1) % media.length);
  const prev = () => setIndex((prev) => (prev - 1 + media.length) % media.length);

  return (
    <div className="relative w-full h-[400px] bg-black rounded-xl overflow-hidden">
    {media.length > 1 && (
      <>
        <button
          onClick={prev}
          className="absolute top-1/2 left-3 -translate-y-1/2 z-10 text-white bg-black/50 p-2 rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={next}
          className="absolute top-1/2 right-3 -translate-y-1/2 z-10 text-white bg-black/50 p-2 rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </>
    )}

      {current.type.startsWith('image') ? (
        <Image
          src={current.url}
          alt={current.filename}
          fill
          className="object-cover"
        />
      ) : current.type.startsWith('video') ? (
        <video
          src={current.url}
          controls
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="text-white flex items-center justify-center h-full">
          <PlayCircle className="w-12 h-12" />
          Fichier non supporté
        </div>
      )}
    </div>
  );
}
