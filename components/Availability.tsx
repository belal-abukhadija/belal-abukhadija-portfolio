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
  cyan: "bg-slate-blue",
  pink: "bg-hot-red",
  amber: "bg-vivid-yellow",
};

export default function Availability() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="availability" className="relative py-28 bg-slate-blue border-b-4 border-black overflow-hidden bg-grid-pattern">
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-16 h-2 bg-black" />
            <span className="text-xl font-black uppercase tracking-widest text-black">Availability</span>
          </motion.div>

          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-[5rem] leading-[0.85] font-black uppercase text-black mb-8"
              >
                Available
                <br />
                <span className="bg-white px-2 mt-3 inline-block -rotate-2 border-4 border-black shadow-[6px_6px_0px_0px_#000]">
                  Worldwide
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-black font-bold text-xl leading-relaxed mb-12 bg-cream border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000] rotate-1"
              >
                For remote work, I collaborate globally. For on-site projects,
                I&apos;m available in key Arab region hubs shown on the map.
              </motion.p>

              <div className="space-y-6">
                {[
                  {
                    icon: Wifi,
                    title: "Remote collaboration",
                    value: "Worldwide",
                    text: "Planning, design, and development with async + live collaboration.",
                    color: "bg-hot-red"
                  },
                  {
                    icon: Plane,
                    title: "On-site availability",
                    value: "Arab region",
                    text: "Available for product workshops, launches, and focused sprints.",
                    color: "bg-vivid-yellow"
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                    className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] flex gap-6"
                  >
                    <div className={`w-16 h-16 border-4 border-black ${item.color} flex items-center justify-center shrink-0 shadow-[4px_4px_0px_0px_#000] -rotate-3`}>
                      <item.icon className="w-8 h-8 text-black" strokeWidth={3} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-black mb-1 px-2 py-1 bg-cream border-4 border-black inline-block">{item.title}</p>
                      <p className="text-2xl text-black font-black uppercase">{item.value}</p>
                      <p className="text-lg font-bold text-black mt-2 leading-snug">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="border-4 border-black bg-cream p-6 md:p-8 shadow-[12px_12px_0px_0px_#000] rotate-1 relative"
            >
              <div className="relative aspect-[16/10] border-4 border-black bg-[#FFD93D] overflow-hidden shadow-[inset_6px_6px_0px_0px_#000]">
                {/* Abstract brutalist map representation using raw SVGs */}
                <svg viewBox="0 0 1000 620" className="absolute inset-0 w-full h-full" aria-hidden="true">
                  <path
                    d="M86 165 L450 165 L500 150 L642 150 L720 185 L804 188 L878 238 L888 300 L850 352 L780 357 L736 406 L652 406 L592 364 L538 364 L486 319 L430 319 L382 336 L318 336 L278 316 L214 316 L150 326 L86 326 Z"
                    fill="#FFFFFF"
                    stroke="#000000"
                    strokeWidth="6"
                  />
                  <path
                    d="M384 316 L438 314 L478 334 L520 365 L558 365 L590 388 L650 407 L724 406 L764 362 L792 362 L827 340"
                    stroke="#000000"
                    strokeWidth="6"
                    fill="none"
                  />
                  <path
                    d="M216 318 L240 280 L290 280 L324 315"
                    stroke="#000000"
                    strokeWidth="6"
                    fill="none"
                  />
                </svg>

                {markers.map((marker, i) => {
                  const bgClass = toneClasses[marker.tone];
                  return (
                    <motion.div
                      key={marker.country}
                      className="absolute"
                      style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{ duration: 0.45, delay: 0.55 + i * 0.1 }}
                    >
                      {/* Hard Shadow / Connection Line removed for a blocky sticker effect */}
                      <div className="relative -translate-x-1/2 -translate-y-1/2 group">
                        <div className={`w-12 h-12 border-4 border-black ${bgClass} flex items-center justify-center font-black text-sm uppercase cursor-pointer hover:rotate-12 hover:scale-110 transition-transform shadow-[4px_4px_0px_0px_#000] rotate-${i % 2 === 0 ? '-6' : '6'}`}>
                          {marker.flag}
                        </div>
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
                        stroke="#000000"
                        strokeWidth="0.8"
                        strokeDasharray="2 2"
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
                  className="absolute top-4 right-4 border-4 border-black bg-white px-4 py-2 font-black uppercase text-sm inline-flex items-center gap-2 shadow-[4px_4px_0px_0px_#000]"
                >
                  <Radar className="w-5 h-5" strokeWidth={3} />
                  Live reach
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.2 }}
                  className="absolute bottom-4 left-4 border-4 border-black bg-black px-4 py-3 font-black uppercase text-white inline-flex items-center gap-3 text-sm shadow-[4px_4px_0px_0px_#FFD93D]"
                >
                  <Globe2 className="w-5 h-5 text-white" strokeWidth={3} />
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
