'use client';

import { motion } from 'framer-motion';
import { skills } from '@/lib/data';
import type{ Skill } from '@/types';

const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="font-medium">{skill.name}</span>
        <span className="text-sm text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
          viewport={{ once: true }}
          className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
        />
      </div>
    </motion.div>
  );
};

const SkillCategory = ({ title, categorySkills, delay }: { 
  title: string; 
  categorySkills: Skill[]; 
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="card space-y-6"
    >
      <h3 className="text-xl font-semibold text-center capitalize">{title}</h3>
      <div className="space-y-4">
        {categorySkills.map((skill, index) => (
          <SkillBar key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const skillCategories = {
    frontend: skills.filter(skill => skill.category === 'frontend'),
    backend: skills.filter(skill => skill.category === 'backend'),
    database: skills.filter(skill => skill.category === 'database'),
    tools: skills.filter(skill => skill.category === 'tools'),
  };

  return (
    <section id="skills" className="section bg-slate-50 dark:bg-slate-800">
      <div className="container">
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

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <SkillCategory 
            title="Frontend Development" 
            categorySkills={skillCategories.frontend} 
            delay={0.2}
          />
          <SkillCategory 
            title="Backend Development" 
            categorySkills={skillCategories.backend} 
            delay={0.4}
          />
          <SkillCategory 
            title="Database Technologies" 
            categorySkills={skillCategories.database} 
            delay={0.6}
          />
          <SkillCategory 
            title="Tools & Technologies" 
            categorySkills={skillCategories.tools} 
            delay={0.8}
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;
