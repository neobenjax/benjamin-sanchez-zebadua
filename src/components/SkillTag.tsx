import Link from "next/link";

interface SkillTagProps {
  tag: string;
}

export default function SkillTag({ tag }: SkillTagProps) {
  return (
    <Link
      href={`/insights?tag=${encodeURIComponent(tag)}`}
      className="inline-flex items-center px-3 py-1 rounded-full border border-accent text-accent text-xs font-semibold bg-transparent hover:bg-accent/10 transition-colors mr-2 mb-2"
    >
      {tag}
    </Link>
  );
}
