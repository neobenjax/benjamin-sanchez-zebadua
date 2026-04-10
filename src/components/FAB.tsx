"use client";

import { MessageSquare } from "lucide-react";
import { profileData } from "@/data/profile";

export default function FAB() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={`mailto:${profileData.social.email}`}
        className="group relative flex items-center justify-center w-14 h-14 bg-[#10B981] text-[#0A192F] rounded-full shadow-lg shadow-[#10B981]/30 hover:shadow-[#10B981]/50 hover:scale-110 transition-all duration-300"
        aria-label="Contact Email"
      >
        <MessageSquare className="w-6 h-6" />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-[#0A192F] text-white text-sm font-semibold px-3 py-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none">
          Get in Touch
        </span>
      </a>
    </div>
  );
}
