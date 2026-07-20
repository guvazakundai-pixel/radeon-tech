import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import AIAssistant from "./components/AIAssistant";
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
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminRepairs from "./pages/AdminRepairs";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import RepairBooking from "./pages/RepairBooking";
import PCBuilder from "./pages/PCBuilder";

function SiteLayout() {
  return (
    <div className="min-h-screen bg-bg-primary font-body text-text-primary">
      <ErrorBoundary>
        <Navbar />
        <MobileNav />
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
        <AIAssistant />
      </ErrorBoundary>
    </div>
  );
}

function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-bg-primary font-body text-text-primary">
      <ErrorBoundary>
        <Navbar />
        <MobileNav />
        <main className="pt-16 lg:pt-20">{children}</main>
        <Footer />
        <ScrollToTop />
        <AIAssistant />
      </ErrorBoundary>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/repairs" element={<AdminRepairs />} />
          <Route path="/shop" element={<PageLayout><Shop /></PageLayout>} />
          <Route path="/shop/:id" element={<PageLayout><ProductDetail /></PageLayout>} />
          <Route path="/repair" element={<PageLayout><RepairBooking /></PageLayout>} />
          <Route path="/pc-builder" element={<PageLayout><PCBuilder /></PageLayout>} />
          <Route path="*" element={<SiteLayout />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
