"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe2, Wifi, Plane, Radar } from "lucide-react";

type PinTone = "cyan" | "pink" | "amber";

const markers: Array<{
  country: string;
  flag: string;
  x: number;
  y: number;
  tone: PinTone;
}> = [
  { country: "Egypt", flag: "EG", x: 20, y: 46, tone: "amber" },
  { country: "Jordan", flag: "JO", x: 42, y: 36, tone: "pink" },
  { country: "Iraq", flag: "IQ", x: 48, y: 35, tone: "cyan" },
  { country: "Saudi Arabia", flag: "SA", x: 56, y: 60, tone: "amber" },
  { country: "UAE", flag: "AE", x: 74, y: 50, tone: "pink" },
  { country: "Kuwait", flag: "KW", x: 64, y: 38, tone: "cyan" },
];

const toneClasses: Record<PinTone, { pin: string; dot: string }> = {
  cyan: {
    pin: "bg-cyan-400",
    dot: "bg-cyan-300",
  },
  pink: {
    pin: "bg-pink-500",
    dot: "bg-pink-400",
  },
  amber: {
    pin: "bg-amber-400",
    dot: "bg-amber-300",
  },
};

export default function Availability() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="availability" className="relative py-28 bg-surface-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(21,206,255,0.12),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-16 h-px bg-gradient-to-r from-primary-300 to-transparent" />
            <span className="text-xs uppercase tracking-[0.2em] text-primary-200">Availability</span>
          </motion.div>

          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-center">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-6xl leading-[0.95] font-display text-white mb-7"
              >
                Available
                <br />
                <span className="gradient-text">across the Arab region + remote worldwide</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white/60 leading-relaxed mb-10"
              >
                For remote work, I collaborate globally. For on-site projects,
                I&apos;m available in key Arab region hubs shown on the map.
              </motion.p>

              <div className="space-y-4">
                {[
                  {
                    icon: Wifi,
                    title: "Remote collaboration",
                    value: "Worldwide",
                    text: "Planning, design, and development with async + live collaboration.",
                  },
                  {
                    icon: Plane,
                    title: "On-site availability",
                    value: "Arab region",
                    text: "Available for product workshops, launches, and focused sprints.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                    className="panel-cut section-frame p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-lg bg-primary-300/15 border border-primary-300/40 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-primary-200" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{item.title}</p>
                        <p className="text-lg text-white font-semibold">{item.value}</p>
                        <p className="text-sm text-white/55 mt-1">{item.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="panel-cut section-frame p-5 md:p-7"
            >
              <div className="relative aspect-[16/10] rounded-2xl border border-white/[0.08] bg-[linear-gradient(180deg,#243173,#1f2a62)] overflow-hidden">
                <svg viewBox="0 0 1000 620" className="absolute inset-0 w-full h-full" aria-hidden="true">
                  <path
                    d="M86 165 L450 165 L500 150 L642 150 L720 185 L804 188 L878 238 L888 300 L850 352 L780 357 L736 406 L652 406 L592 364 L538 364 L486 319 L430 319 L382 336 L318 336 L278 316 L214 316 L150 326 L86 326 Z"
                    fill="rgba(70,92,155,0.9)"
                    stroke="rgba(25,40,90,0.8)"
                    strokeWidth="2"
                  />
                  <path
                    d="M384 316 L438 314 L478 334 L520 365 L558 365 L590 388 L650 407 L724 406 L764 362 L792 362 L827 340"
                    stroke="rgba(25,40,90,0.75)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M216 318 L240 280 L290 280 L324 315"
                    stroke="rgba(25,40,90,0.75)"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>

                {markers.map((marker, i) => {
                  const tone = toneClasses[marker.tone];
                  return (
                    <motion.div
                      key={marker.country}
                      className="absolute"
                      style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{ duration: 0.45, delay: 0.55 + i * 0.1 }}
                    >
                      <motion.div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        animate={{ scale: [1, 1.55, 1], opacity: [0.35, 0, 0.35] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      >
                        <div className={`w-10 h-10 rounded-full ${tone.dot}`} />
                      </motion.div>

                      <div className="relative -translate-x-1/2 -translate-y-full">
                        <div className={`w-8 h-8 rounded-full ${tone.pin} p-[3px] shadow-xl`}>
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-surface-900">
                            {marker.flag}
                          </div>
                        </div>
                        <div
                          className={`mx-auto w-0 h-0 border-l-[6px] border-r-[6px] border-t-[12px] border-l-transparent border-r-transparent ${tone.pin}`}
                        />
                      </div>
                    </motion.div>
                  );
                })}

                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                  {markers
                    .filter((m) => m.country !== "Saudi Arabia")
                    .map((m, i) => (
                      <motion.line
                        key={m.country}
                        x1={m.x}
                        y1={m.y}
                        x2={56}
                        y2={60}
                        stroke="rgba(94,223,255,0.35)"
                        strokeWidth="0.32"
                        strokeDasharray="1.2 1.2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                        transition={{ duration: 1.2, delay: 1 + i * 0.15 }}
                      />
                    ))}
                </svg>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.15 }}
                  className="absolute top-4 right-4 panel-cut border border-primary-300/45 bg-primary-300/15 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-primary-100 inline-flex items-center gap-2"
                >
                  <Radar className="w-3.5 h-3.5" />
                  Live reach
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.2 }}
                  className="absolute bottom-4 left-4 panel-cut border border-white/[0.12] bg-surface-900/75 px-3 py-2 text-xs text-white/75 inline-flex items-center gap-2"
                >
                  <Globe2 className="w-4 h-4 text-accent-200" />
                  Regional on-site + global remote
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
