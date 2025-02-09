import { About } from "./components/about";
import { CaseStudy } from "./components/case-study";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { Skills } from "./components/skills";

function App() {
  return (
    <div className="font-sans text-dark">
      <Header />
      <main className="container mx-auto max-w-6xl space-y-12 p-6">
        <Hero />
        <CaseStudy />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
