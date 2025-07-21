import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

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
        <Contact />
      </div>
      <Footer />
    </main>
  );
}

export default App;
