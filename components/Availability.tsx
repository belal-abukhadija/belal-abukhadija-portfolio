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

const toneClasses: Record<PinTone, string> = {
  cyan: "text-[#5B6B85]",
  pink: "text-accent",
  amber: "text-[#C9A227]",
};

export default function Availability() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="availability"
      className="relative py-28 bg-surface overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="neu-divider w-16" />
            <span className="text-sm font-medium tracking-wide text-ink-soft">
              Availability
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-[4rem] leading-[0.95] font-semibold tracking-tight text-ink mb-8"
              >
                Available
                <br />
                <span className="text-accent">Worldwide</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-ink-soft text-lg leading-relaxed mb-10 neu-inset p-6"
              >
                For remote work, I collaborate globally. For on-site projects,
                I&apos;m available in key Arab region hubs shown on the map.
              </motion.p>

              <div className="space-y-5">
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
                    className="neu-surface p-6 flex gap-5"
                  >
                    <span className="neu-icon w-14 h-14 shrink-0 text-accent">
                      <item.icon className="w-7 h-7" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="text-xs font-medium tracking-wide text-ink-subtle mb-1 uppercase">
                        {item.title}
                      </p>
                      <p className="text-xl text-ink font-semibold tracking-tight">
                        {item.value}
                      </p>
                      <p className="text-sm text-ink-soft mt-2 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="neu-surface-xl p-6 md:p-8 relative"
            >
              <div className="relative aspect-[16/10] neu-inset-deep overflow-hidden rounded-[20px]">
                <svg
                  viewBox="0 0 1000 620"
                  className="absolute inset-0 w-full h-full"
                  aria-hidden="true"
                >
                  <path
                    d="M86 165 L450 165 L500 150 L642 150 L720 185 L804 188 L878 238 L888 300 L850 352 L780 357 L736 406 L652 406 L592 364 L538 364 L486 319 L430 319 L382 336 L318 336 L278 316 L214 316 L150 326 L86 326 Z"
                    fill="#E4EAED"
                    stroke="#8A94A3"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M384 316 L438 314 L478 334 L520 365 L558 365 L590 388 L650 407 L724 406 L764 362 L792 362 L827 340"
                    stroke="#8A94A3"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M216 318 L240 280 L290 280 L324 315"
                    stroke="#8A94A3"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>

                {markers.map((marker, i) => {
                  const toneText = toneClasses[marker.tone];
                  return (
                    <motion.div
                      key={marker.country}
                      className="absolute"
                      style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{ duration: 0.45, delay: 0.55 + i * 0.1 }}
                    >
                      <div className="relative -translate-x-1/2 -translate-y-1/2 group">
                        <div
                          className={`w-11 h-11 rounded-full flex items-center justify-center text-[11px] font-semibold tracking-wide cursor-pointer hover:scale-110 transition-transform neu-surface-sm ${toneText}`}
                        >
                          {marker.flag}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 100"
                >
                  {markers
                    .filter((m) => m.country !== "Saudi Arabia")
                    .map((m, i) => (
                      <motion.line
                        key={m.country}
                        x1={m.x}
                        y1={m.y}
                        x2={56}
                        y2={60}
                        stroke="#8A94A3"
                        strokeWidth="0.5"
                        strokeDasharray="1.5 2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
                        transition={{ duration: 1.2, delay: 1 + i * 0.15 }}
                      />
                    ))}
                </svg>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.15 }}
                  className="absolute top-4 right-4 neu-chip text-xs font-medium tracking-wide text-ink-soft inline-flex items-center gap-2"
                >
                  <Radar className="w-4 h-4 text-accent" strokeWidth={2} />
                  Live reach
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.2 }}
                  className="absolute bottom-4 left-4 neu-chip text-xs font-medium tracking-wide text-ink inline-flex items-center gap-2"
                >
                  <Globe2 className="w-4 h-4 text-accent" strokeWidth={2} />
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
