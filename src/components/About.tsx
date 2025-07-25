import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import InfoCard from "./InfoCard";
import Sticky from "react-stickynode";
import { useEffect, useState } from "react";

const About = () => {
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const updateNavHeight = () => {
      const nav = document.getElementById("navigation");
      if (nav) {
        setNavHeight(nav.clientHeight + 10);
      }
    };

    // Initial check
    updateNavHeight();

    // Listen for resize events in case nav height changes
    window.addEventListener("resize", updateNavHeight);

    // Use a MutationObserver to watch for DOM changes
    const observer = new MutationObserver(() => {
      updateNavHeight();
    });

    // Start observing the document for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("resize", updateNavHeight);
      observer.disconnect();
    };
  }, []);
  return (
    <section id="about" className="section bg-white dark:bg-slate-900">
      <div className="container flex">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto"
        >
          <div className="grid md:grid-cols-4 gap-8 items-start ">
            <div className="col-span-1 md:col-span-1 hidden md:block">
              <Sticky innerZ={100} className="w-72" top={navHeight || 80}>
                <InfoCard />
              </Sticky>
            </div>
            <div className="flex flex-col items-center w-full col-span-1 md:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="space-y-6 max-w-3xl"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                  About <span className="gradient-text">Me</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{personalInfo.bio}</p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  With a strong foundation in both frontend and backend technologies, I enjoy creating seamless user
                  experiences while ensuring robust and scalable backend systems. I&apos;m passionate about clean code,
                  modern design patterns, and staying up-to-date with the latest technologies.
                </p>

                <div className="grid grid-cols-2 gap-6 text-center md:text-left">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Experience</h3>
                    <p className="text-2xl font-bold text-primary">4+ Years</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Projects</h3>
                    <p className="text-2xl font-bold text-primary">20+</p>
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
