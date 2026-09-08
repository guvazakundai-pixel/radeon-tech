import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import AIAssistant from "./components/AIAssistant";
import Hero from "./components/Hero";
import ServicePanels from "./components/ServicePanels";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Background from "./components/Background";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminRepairs from "./pages/AdminRepairs";
import ProductDetail from "./pages/ProductDetail";
import RepairBooking from "./pages/RepairBooking";
import PCBuilder from "./pages/PCBuilder";
import RepairsPage from "./pages/RepairsPage";
import ServicesPage from "./pages/ServicesPage";
import StorePage from "./pages/StorePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

function SiteLayout() {
  return (
    <div className="min-h-screen bg-bg-primary font-body text-text-primary">
      <Background />
      <ErrorBoundary>
        <Navbar />
        <MobileNav />
        <main className="relative z-10">
          <Hero />
          <ServicePanels />
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
      <Background />
      <ErrorBoundary>
        <Navbar />
        <MobileNav />
        <main className="relative z-10">{children}</main>
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
          <Route path="/shop" element={<PageLayout><StorePage /></PageLayout>} />
          <Route path="/store" element={<PageLayout><StorePage /></PageLayout>} />
          <Route path="/shop/:id" element={<PageLayout><ProductDetail /></PageLayout>} />
          <Route path="/repair" element={<PageLayout><RepairBooking /></PageLayout>} />
          <Route path="/repairs" element={<PageLayout><RepairsPage /></PageLayout>} />
          <Route path="/services" element={<PageLayout><ServicesPage /></PageLayout>} />
          <Route path="/pc-builder" element={<PageLayout><PCBuilder /></PageLayout>} />
          <Route path="/about" element={<PageLayout><AboutPage /></PageLayout>} />
          <Route path="/contact" element={<PageLayout><ContactPage /></PageLayout>} />
          <Route path="*" element={<SiteLayout />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
