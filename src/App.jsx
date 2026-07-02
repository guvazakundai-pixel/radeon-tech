import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import CustomBuilds from "./components/CustomBuilds";
import WhyChooseUs from "./components/WhyChooseUs";
import Process from "./components/Process";
import BusinessSolutions from "./components/BusinessSolutions";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <div className="min-h-screen bg-bg-lavender font-body text-text-primary">
      <ErrorBoundary>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <CustomBuilds />
          <WhyChooseUs />
          <Process />
          <Testimonials />
          <Gallery />
          <BusinessSolutions />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </ErrorBoundary>
    </div>
  );
}
