'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ChevronButtonProps {
  onClick: () => void;
}

export default function ChevronButton({ onClick }: ChevronButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex justify-center bg-black items-center cursor-pointer"
      onClick={onClick}
    >
      <ChevronDown className="w-8 h-8 text-accent animate-bounce" />
    </motion.div>
  );
}
