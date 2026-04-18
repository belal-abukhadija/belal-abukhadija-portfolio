interface Props {
  className?: string;
  strokeWidth?: number;
}

export default function WhatsAppIcon({ className, strokeWidth = 2 }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path d="M8.5 9c0-.5.5-1 1-1h1l1 2.5-1 .5a5 5 0 0 0 2.5 2.5l.5-1 2.5 1v1c0 .5-.5 1-1 1A7.5 7.5 0 0 1 8.5 9z" />
    </svg>
  );
}
