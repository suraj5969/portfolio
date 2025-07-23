import { motion } from "framer-motion";
import { tools } from "@/lib/data";
// import type { Skill } from "@/types";

// const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, delay: index * 0.1 }}
//       viewport={{ once: true }}
//       className="space-y-2"
//     >
//       <div className="flex justify-between items-center">
//         <span className="font-medium">{skill.name}</span>
//         <span className="text-sm text-muted-foreground">{skill.level}%</span>
//       </div>
//       <div className="w-full bg-muted rounded-full h-2">
//         <motion.div
//           initial={{ width: 0 }}
//           whileInView={{ width: `${skill.level}%` }}
//           transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
//           viewport={{ once: true }}
//           className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
//         />
//       </div>
//     </motion.div>
//   );
// };

// const SkillCategory = ({ title, categorySkills, delay }: { title: string; categorySkills: Skill[]; delay: number }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8, delay }}
//       viewport={{ once: true }}
//       className="card space-y-6"
//     >
//       <h3 className="text-xl font-semibold text-center capitalize">{title}</h3>
//       <div className="space-y-4">
//         {categorySkills.map((skill, index) => (
//           <SkillBar key={skill.name} skill={skill} index={index} />
//         ))}
//       </div>
//     </motion.div>
//   );
// };

const Skills = () => {
  return (
    <section id="skills" className="section bg-slate-50 dark:bg-slate-800">
      <div className="container grid md:grid-cols-4 gap-8 items-start ">
        <div className="col-span-1 md:col-span-1"></div>
        <div className="space-y-6 ms-3 col-span-1 md:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here&apos;s a breakdown of my technical expertise across different domains
            </p>
          </motion.div>

          {/* Tool Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-center max-w-6xl mx-auto">
            {tools.map((tool, idx) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="relative group cursor-pointer"
              >
                {/* Card Container */}
                <div className="w-32 h-40 mx-auto [perspective:800px]">
                  <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* Front Side */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 [backface-visibility:hidden]">
                      <img src={tool.logoUrl} alt={tool.name} className="w-16 h-16 object-contain mb-2" />
                      <span className="mt-2 font-semibold text-center text-sm">{tool.name}</span>
                    </div>
                    {/* Back Side */}
                    <div
                      className="absolute inset-0 flex items-center justify-center text-white rounded-xl shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden] px-4"
                      style={{ background: "linear-gradient(to bottom right, #4f46e5, #8b5cf6)" }}
                    >
                      <span className="text-center text-sm font-medium">{tool.backText}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
