"use client";

import { motion, Variants } from "framer-motion";
import { profileData } from "@/data/profile";
import { Code, LineChart, Cpu } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Code,
  LineChart,
  Cpu,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Synergy() {
  return (
    <section id="synergy" className="relative py-32 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center space-x-4 mb-4">
            <span className="h-px bg-accent w-12" />
            <span className="text-accent tracking-widest text-sm font-semibold uppercase">
              Core Competencies
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">The Synergy</h2>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl">
            Fusing software engineering precision with wealth management analytics.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {profileData.synergy.map((item) => {
            const Icon = iconMap[item.iconName] || Code;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                className="glass p-8 rounded-sm group hover:glass-hover transition-all duration-300"
              >
                <div className="p-4 bg-accent/10 rounded-sm inline-block mb-6 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-400 mb-8 flex-grow">
                  {item.description}
                </p>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
                    Core Focus
                  </h4>
                  <ul className="space-y-2">
                    {item.technologies.map((tech, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-400">
                        <span className="w-1.5 h-1.5 bg-accent/50 rounded-full mr-2" />
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
