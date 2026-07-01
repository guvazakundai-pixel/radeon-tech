import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import FeaturedProducts from "./components/FeaturedProducts";
import Brands from "./components/Brands";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import KnowledgeCentre from "./components/KnowledgeCentre";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <div className="min-h-screen bg-bg-lavender font-body text-text-primary">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <WhyChooseUs />
        <FeaturedProducts />
        <Brands />
        <Process />
        <Testimonials />
        <KnowledgeCentre />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
