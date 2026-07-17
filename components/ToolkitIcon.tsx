import { Code2 } from "lucide-react";
import { brandIcons } from "@/lib/toolkit-icons";

interface ToolkitIconProps {
  slug: string;
  size?: number;
}

export default function ToolkitIcon({ slug, size = 26 }: ToolkitIconProps) {
  if (slug === "vscode") {
    return <Code2 size={size} color="#007ACC" strokeWidth={1.75} />;
  }

  const icon = brandIcons[slug];
  if (!icon) return null;

  return (
    <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill={icon.color} aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}
