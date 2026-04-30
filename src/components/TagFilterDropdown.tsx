"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function TagFilterDropdown({ tags }: { tags: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag") || "";

  return (
    <select
      value={currentTag}
      data-umami-event="filter-used"
      onChange={(e) => {
        const val = e.target.value;
        if (val) {
          router.push(`/insights?tag=${encodeURIComponent(val)}`);
        } else {
          router.push(`/insights`);
        }
      }}
      className="w-full bg-[#0A192F] border border-accent text-accent rounded-sm px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer transition-colors hover:bg-accent/10"
    >
      <option value="" className="bg-slate-900 text-gray-400">Filter by Skill...</option>
      {tags.map((tag) => (
        <option key={tag} value={tag} className="bg-slate-900 text-white hover:text-accent">
          {tag}
        </option>
      ))}
    </select>
  );
}
