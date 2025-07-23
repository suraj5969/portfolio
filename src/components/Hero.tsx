import { motion } from 'framer-motion';
import { ChevronDown, Download, Mail } from 'lucide-react';
import { personalInfo, socialLinks } from '@/lib/data';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto md:mt-24"
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hi I&apos;m{' '}
            <span className="gradient-text">
              {personalInfo.name}
            </span>
          </motion.h1>
          
          <motion.h2 
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {personalInfo.title}
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {personalInfo.bio}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a
              // onClick={() => scrollToSection('contact')}
              href="mailto:surajgupta6178@gmail.com"
              className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
            >
              <Mail size={20} />
              Get In Touch
            </a>
            
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2 text-lg px-8 py-4"
            >
              <Download size={20} />
              Download Resume
            </a>
          </motion.div>
          
          <motion.div 
            className="flex justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {/* {socialLinks.map((link, index) => (
                <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-border hover:bg-accent transition-colors group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                >
                <span className="sr-only">{link.name}</span>
                <div className="w-6 h-6 rounded group-hover:text-background transition-colors">
                  <link.icon />
                </div>
                </motion.a>
            ))} */}
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border border p-3 rounded-full flex items-center justify-center text-light-gray hover:text-accent hover:bg-opacity-10 transition-all duration-300 hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              >
                <span className="sr-only">{link.name}</span>
                <link.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      <motion.button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-2 rounded-full border border-border hover:text-accent transition-colors"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={24} />
      </motion.button>
    </section>
  );
};

export default Hero;
