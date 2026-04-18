"use client";

import { useState } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 500);
  });

  const scrollToTop = () => {
    const start = window.scrollY || window.pageYOffset;
    if (start <= 0) return;
    const duration = Math.min(1.1, 0.35 + start / 3000);
    animate(start, 0, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => window.scrollTo(0, v),
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, y: 24, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.85 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="neu-pressable-accent fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[55] w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full"
        >
          <ArrowUp className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.25} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
