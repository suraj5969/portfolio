import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
// import Contact from "./components/Contact";
import Footer from "./components/Footer";
import InfoCard from "./components/InfoCard";
import { motion } from "framer-motion";

function App() {
  return (
    <main className="min-h-screen selection:bg-primary/90 selection:text-foreground">
      <Navigation />
      <Hero />
      <div className="mx-auto">
        <About />
        <Skills />
        <Experience />
        <Projects />
        {/* <Contact /> */}
        <div className="md:hidden section w-72 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I&apos;m always open to discussing new opportunities and interesting projects
            </p>
          </motion.div>
          <InfoCard />
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default App;
