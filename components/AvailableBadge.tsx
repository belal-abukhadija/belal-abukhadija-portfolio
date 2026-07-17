export default function AvailableBadge() {
  return (
    <div className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 bg-panel border border-line border-r-0 px-2.5 py-4">
      <span className="w-2 h-2 bg-mint animate-pulse rounded-full" aria-hidden="true" />
      <span className="[writing-mode:vertical-rl] rotate-180 font-display text-[0.68rem] font-semibold uppercase tracking-widest text-ink">
        Available
      </span>
    </div>
  );
}
