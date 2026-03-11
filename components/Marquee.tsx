"use client";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Web Tools",
  "Privacy-first",
  "Performance",
  "UX Systems",
];

export default function Marquee() {
  const doubled = [...skills, ...skills, ...skills];

  return (
    <section className="relative bg-white flex flex-col overflow-hidden select-none border-y-4 border-black w-full pb-0">
      
      {/* First Marquee - Massive Text */}
      <div className="border-b-4 border-black bg-vivid-yellow py-6 overflow-hidden flex items-center">
        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((skill, i) => (
            <div key={`a-${i}`} className="flex items-center">
              <span className="mx-8 text-4xl md:text-6xl font-black uppercase text-black">
                {skill}
              </span>
              <span className="text-4xl md:text-6xl font-black text-black">
                *
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Second Marquee - Reverse, contrasting */}
      <div className="bg-black py-4 overflow-hidden flex items-center border-b-4 border-black">
        <div className="flex animate-marquee-reverse whitespace-nowrap">
          {doubled.map((skill, i) => (
            <div key={`b-${i}`} className="flex items-center">
              <span className="mx-6 text-xl md:text-2xl font-black uppercase tracking-widest text-white">
                {skill}
              </span>
              <span className="text-xl md:text-2xl font-black text-hot-red">
                /
              </span>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}
