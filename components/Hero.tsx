"use client";

import { useRef, useEffect } from "react";
import type { MouseEvent } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { personalInfo } from "@/lib/tools-data";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border border-primary-400/30 animate-pulse" />
    </div>
  ),
});

function RevealText({
  children,
  delay = 0,
  className = "",
}: {
  children: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {children.split(" ").map((word, i) => (
        <span key={i} className="overflow-hidden mr-[0.24em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.95,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.06,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const COUNT = 280;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + Math.random() * 1.2,
      opacity: 0.15 + Math.random() * 0.45,
      speed: 0.00004 + Math.random() * 0.00008,
      drift: (Math.random() - 0.5) * 0.00003,
    }));

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < 0) { p.y = 1; p.x = Math.random(); }
        if (p.x < 0 || p.x > 1) { p.drift *= -1; }
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(182,255,0,${p.opacity})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 22, mass: 0.4 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 22, mass: 0.4 });

  const layerY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], [0, -90]);
  const visualRotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const visualRotateX = useTransform(smoothY, [-0.5, 0.5], [13, -13]);
  const scrollToTools = () => {
    document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-surface-950 scan-grid"
    >
      <ParticleCanvas />
      <motion.div className="absolute inset-0" style={{ y: layerY }}>
        <div className="absolute -top-28 right-[8%] w-[520px] h-[520px] rounded-full bg-primary-300/15 blur-[130px] float-drift" />
        <div className="absolute bottom-[8%] left-[4%] w-[460px] h-[460px] rounded-full bg-accent-400/15 blur-[140px]" />
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.08fr_0.92fr] gap-10 items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-3 rounded-full border border-white/[0.16] bg-white/[0.04] px-4 py-2 mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary-300" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/75">
                Crafted for utility, not noise
              </span>
            </motion.div>

            <h1 className="font-hero font-bold leading-[0.88] tracking-tight mb-8 text-balance">
              <span className="block text-[clamp(2.7rem,8vw,7.2rem)] text-white">
                <RevealText delay={0.2}>{personalInfo.name}</RevealText>
              </span>
              <span className="block text-[clamp(2rem,5.2vw,4.3rem)] text-white/45 mt-2">
                <RevealText delay={0.55}>builds tools that earn trust</RevealText>
              </span>
              <span className="block text-[clamp(2rem,5.2vw,4.3rem)] mt-1 gradient-text">
                <RevealText delay={0.8}>and feel unmistakably different</RevealText>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 1.1 }}
              className="max-w-2xl text-base md:text-lg text-white/60 leading-relaxed mb-12"
            >
              A growing ecosystem of practical web tools for developers and creators.
              Fast, private, and designed with a bold visual identity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 1.25 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                onClick={scrollToTools}
                className="panel-cut group px-8 py-4 bg-primary-300 text-surface-950 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-primary-200 transition-colors"
              >
                <span className="inline-flex items-center gap-2">
                  Explore tools
                  <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </span>
              </button>
              <a
                href={`mailto:${personalInfo.email}`}
                className="panel-cut px-8 py-4 border border-white/[0.2] text-white/80 text-xs font-semibold uppercase tracking-[0.2em] hover:border-accent-300/80 hover:text-accent-200 transition-colors"
              >
                Start a project
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: 28 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="hidden lg:flex items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX: visualRotateX, rotateY: visualRotateY, transformStyle: "preserve-3d" }}
          >
            <div className="relative w-[560px] h-[560px] overflow-visible">
              <div className="absolute inset-0">
                <HeroScene />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Scroll</span>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent" />
      </motion.div>
    </section>
  );
}
