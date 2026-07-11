"use client";

import { useState } from "react";
import {
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

  // A single native smooth-scroll call. Driving window.scrollTo manually on
  // every animation frame (as this used to) inherits the global CSS
  // `scroll-behavior: smooth`, so each frame started its own competing native
  // scroll animation — dozens stacking per tap. Mobile browsers show that as
  // stutter/stall far more visibly than desktop. One explicit call has only
  // one animation to retarget, so nothing fights.
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
          className="icon-tile hover:border-amber hover:text-amber fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[55] w-12 h-12 md:w-14 md:h-14 rounded-full bg-panel"
        >
          <ArrowUp className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
