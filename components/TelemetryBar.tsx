"use client";

import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { personalInfo } from "@/lib/tools-data";

const sections = [
  { id: "hero", label: "INTRO" },
  { id: "work", label: "WORK" },
  { id: "articles", label: "ARTICLES" },
  { id: "skills", label: "SKILLS" },
  { id: "about", label: "ABOUT" },
  { id: "contact", label: "CONTACT" },
];

export default function TelemetryBar() {
  const { scrollYProgress } = useScroll();
  const [scrl, setScrl] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [time, setTime] = useState("");

  useMotionValueEvent(scrollYProgress, "change", (latest) => setScrl(latest));

  useEffect(() => {
    const onScroll = () => {
      let current = 0;
      sections.forEach((section, i) => {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          current = i;
        }
      });
      setActiveIndex(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: personalInfo.timezone,
        }).format(new Date())
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const active = sections[activeIndex];

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 hidden md:flex items-center justify-between border-t border-line bg-bg px-4 lg:px-6 py-2 font-display text-[0.65rem] font-medium tracking-widest text-ink-faint">
      <span>
        SCRL <span className="text-ink">{scrl.toFixed(2)}</span>
      </span>
      <span className="text-ink">
        {String(activeIndex).padStart(2, "0")} — {active.label}
      </span>
      <span className="flex items-center gap-2">
        THEME
        <span className="inline-block w-2.5 h-2.5 bg-mint" aria-hidden="true" />
        <span className="text-mint">#C3FFFC</span>
        <span className="text-ink ml-3">{time || "--:--:--"} +3</span>
      </span>
    </div>
  );
}
