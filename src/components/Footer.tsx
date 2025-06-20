'use client';

import { Heart } from 'lucide-react';
import { personalInfo, socialLinks } from '@/lib/data';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 gradient-text">
              {personalInfo.name}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Full Stack Developer passionate about creating amazing web experiences
              and solving complex problems with clean, efficient code.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#about" className="text-slate-300 hover:text-white transition-colors">
                About
              </a>
              <a href="#skills" className="text-slate-300 hover:text-white transition-colors">
                Skills
              </a>
              <a href="#experience" className="text-slate-300 hover:text-white transition-colors">
                Experience
              </a>
              <a href="#projects" className="text-slate-300 hover:text-white transition-colors">
                Projects
              </a>
              <a href="#contact" className="text-slate-300 hover:text-white transition-colors">
                Contact
              </a>
            </nav>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-2 mb-4">
              <p className="text-slate-300">{personalInfo.email}</p>
              <p className="text-slate-300">{personalInfo.phone}</p>
              <p className="text-slate-300">{personalInfo.location}</p>
            </div>
            
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors"
                >
                  <span className="sr-only">{link.name}</span>
                  {/* Icon placeholder */}
                  <div className="w-5 h-5 bg-slate-400 rounded"></div>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-300 flex items-center gap-1">
            © {currentYear} {personalInfo.name}. Made with{' '}
            <Heart size={16} className="text-red-400 fill-current" />{' '}
            using Next.js & Tailwind CSS
          </p>
          
          <p className="text-slate-300 mt-4 md:mt-0">
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
