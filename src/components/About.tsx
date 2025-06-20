'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data';

const About = () => {
  return (
    <section id="about" className="section bg-white dark:bg-slate-900">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            About <span className="gradient-text">Me</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-full max-w-md mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl p-1">
                <div className="w-full h-96 bg-slate-200 dark:bg-slate-700 rounded-xl flex items-center justify-center">
                  <span className="text-slate-500 dark:text-slate-400">Profile Image Placeholder</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                {personalInfo.bio}
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                With a strong foundation in both frontend and backend technologies, I enjoy creating 
                seamless user experiences while ensuring robust and scalable backend systems. 
                I&apos;m passionate about clean code, modern design patterns, and staying up-to-date 
                with the latest technologies.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Experience</h3>
                  <p className="text-2xl font-bold text-primary">5+ Years</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Projects</h3>
                  <p className="text-2xl font-bold text-primary">50+</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Location</h3>
                  <p className="text-muted-foreground">{personalInfo.location}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Status</h3>
                  <p className="text-green-600 font-medium">Available</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
