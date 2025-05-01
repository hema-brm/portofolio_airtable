'use client';

import { AnimatePresence, motion } from 'framer-motion';

export default function PageTransitionWrapper({
  children,
  keyName,
}: {
  children: React.ReactNode;
  keyName: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={keyName}
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '-100%', opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
