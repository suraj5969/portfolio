import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '@/lib/data';
import type { Project } from '@/types';

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="card group hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative overflow-hidden rounded-lg mb-4">
        <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
          {/* <span className="text-muted-foreground">Project Image Placeholder</span> */}
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-contain mb-2" />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full hover:scale-110 transition-transform"
              >
                <Github size={20} className="text-black" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full hover:scale-110 transition-transform"
              >
                <ExternalLink size={20} className="text-black" />
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            {/* {project.featured && (
              <span className="px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs">
                Featured
              </span>
            )} */}
          </div>
          <p className="text-muted-foreground text-sm">{project.description}</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3 pt-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2 text-xs py-3 px-4 "
            >
              <Github size={16} />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 text-xs px-4 py-3"
            >
              <ExternalLink size={16} />
              Visit
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="section bg-slate-50 dark:bg-slate-800">
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
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that showcase my skills and experience
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
