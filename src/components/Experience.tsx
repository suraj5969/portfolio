import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { experiences } from "@/lib/data";
import type { Experience as ExperienceType } from "@/types";

const ExperienceCard = ({ experience, index }: { experience: ExperienceType; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="card hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">{experience.title}</h3>
            <h4 className="text-md text-primary font-medium mb-2">{experience.company}</h4>
          </div>
          <div className="flex flex-col md:items-end text-muted-foreground">
            <div className="flex items-center text-sm gap-1 mb-1">
              <Calendar size={14} />
              <span>{experience.duration}</span>
              {experience.current && (
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-xs">
                  Current
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <MapPin size={14} />
              <span>{experience.location}</span>
            </div>
          </div>
        </div>

        <ul className="space-y-2 mb-6 text-sm">
          {experience.description.map((item: string, itemIndex: number) => (
            <li key={itemIndex} className="text-muted-foreground flex items-start">
              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech: string) => (
            <span key={tech} className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="section bg-white dark:bg-slate-900">
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
              Work <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My professional journey and the impact I&apos;ve made at various organizations
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative space-y-4">
            {experiences.map((experience, index) => (
              <ExperienceCard key={experience.id} experience={experience} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
