interface SectionBandProps {
  index: string;
  meta: string;
  word: string;
  title: string;
}

export default function SectionBand({ index, meta, word, title }: SectionBandProps) {
  const repeated = Array.from({ length: 6 }, () => word);

  return (
    <div className="mb-10 md:mb-14">
      <div className="flex items-center justify-between border-t border-line pt-3">
        <span className="font-display text-sm font-bold text-mint tracking-widest">
          {index}
        </span>
        <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">
          {meta}
        </span>
      </div>

      <h2 className="sr-only">{title}</h2>

      <div
        aria-hidden="true"
        className="mt-2 overflow-hidden whitespace-nowrap select-none"
      >
        <span className="stroke-text font-display text-[13vw] sm:text-[9vw] md:text-[7vw] font-black uppercase leading-none tracking-tight">
          {repeated.join("  ")}
        </span>
      </div>
    </div>
  );
}
