import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProductCatalog } from "./components/ProductCatalog";
import { ProductDetail } from "./components/ProductDetail";
import { Cart } from "./components/Cart";
import { AuthModal } from "./components/AuthModal";
import { UserProfile } from "./components/UserProfile";
import { AdminDashboard } from "./components/AdminDashboard";
import { Contact } from "./components/Contact";
import { ShieldCheck, MessageCircle, Mail, Phone, Compass, ArrowRight, Instagram, Facebook, X } from "lucide-react";

function MainLayout() {
  const { activeView, setActiveView, selectedProduct, alert, showAlert } = useApp();
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F6] relative text-neutral-900 selection:bg-gold-200 selection:text-neutral-900">
      
      {/* Golden alert notifier bar */}
      {alert && (
        <div className={`fixed top-4 right-4 z-50 p-4 border rounded-sm shadow-2xl flex items-center space-x-3 transition-all duration-300 transform translate-y-0 ${
          alert.type === "success" ? "bg-neutral-950 border-gold-400 text-gold-300" :
          alert.type === "error" ? "bg-red-950 border-red-500 text-red-200" :
          "bg-white border-gold-200 text-neutral-800"
        }`}>
          <ShieldCheck className={`h-5 w-5 ${alert.type === "success" ? "text-gold-400 animate-bounce" : "text-neutral-500"}`} />
          <span className="text-xs uppercase tracking-wider font-semibold font-sans">{alert.message}</span>
        </div>
      )}

      {/* Top micro announcement bar */}
      <div className="bg-neutral-950 text-gold-300 text-[9px] font-luxury-display uppercase tracking-[0.4em] text-center py-2 border-b border-gold-950 px-4">
        Complimentary Duty-Free Carriage Worldwide on All Curations Exceeding $500
      </div>

      {/* Primary header */}
      <Navbar onOpenCart={() => setCartOpen(true)} onOpenAuth={() => setAuthOpen(true)} />

      {/* Main interactive page routing */}
      <main className="flex-grow">
        {activeView === "home" && <Hero />}
        {activeView === "products" && <ProductCatalog />}
        {activeView === "profile" && <UserProfile />}
        {activeView === "admin" && <AdminDashboard />}
        {activeView === "contact" && <Contact />}
      </main>

      {/* Absolute Details Dialog */}
      {selectedProduct && <ProductDetail />}

      {/* Slide-out Acquisitions Drawer */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} onOpenAuth={() => setAuthOpen(true)} />

      {/* Auth Lounge entrance */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      {/* LUXURY FOOTER BRAND STORY & SIGNATURE */}
      <footer className="bg-neutral-950 text-white pt-16 pb-8 border-t border-gold-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-xs">
          
          {/* Brand presentation */}
          <div className="space-y-4">
            <span className="font-luxury-display text-lg tracking-[0.2em] text-white block uppercase font-bold">
              ZIRYAAT KASH
            </span>
            <span className="text-[9px] font-luxury-display tracking-[0.3em] text-gold-400 block uppercase mt-0.5 font-light">
              Kashmiri Heritage Luxury
            </span>
            <p className="text-neutral-400 font-light leading-relaxed">
              Preserving and verifying the centuries-old, slow craftsmanship of royal weavers, saffron harvesters, and timber artisans from the Jammu & Kashmir Valley.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-neutral-400 hover:text-gold-400 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-gold-400 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-gold-400 transition-colors">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-luxury-display text-gold-400 text-[10px] uppercase tracking-widest font-bold">
              Heritage Collections
            </h4>
            <div className="flex flex-col space-y-2.5 text-neutral-400 uppercase tracking-widest text-[9px] font-medium">
              {["Pashmina Shawls", "Saffron", "Dry Fruits", "Handicrafts", "Leather Bags", "Home Decor"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveView("products");
                    import("./context/AppContext").then(() => {
                      // We'll set the category
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    });
                  }}
                  className="text-left hover:text-white transition-colors cursor-pointer"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Contact help */}
          <div className="space-y-4">
            <h4 className="font-luxury-display text-gold-400 text-[10px] uppercase tracking-widest font-bold">
              Patron Lounge Support
            </h4>
            <div className="space-y-2 text-neutral-400 font-light">
              <p className="flex items-center space-x-2">
                <Phone className="h-3.5 w-3.5 text-gold-500 flex-shrink-0" />
                <span className="font-mono">+91 194 245 90212 (Srinagar)</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="h-3.5 w-3.5 text-gold-500 flex-shrink-0" />
                <span className="font-mono">concierege@ziryaat-kash.com</span>
              </p>
              <p className="flex items-center space-x-2">
                <Compass className="h-3.5 w-3.5 text-gold-500 flex-shrink-0" />
                <span>Dal Lake Boulevard, Srinagar, J&K</span>
              </p>
            </div>
          </div>

          {/* Newsletter / Circle entrance */}
          <div className="space-y-4">
            <h4 className="font-luxury-display text-gold-400 text-[10px] uppercase tracking-widest font-bold">
              Enter The Patrons Circle
            </h4>
            <p className="text-neutral-400 font-light leading-relaxed">
              Subscribe to secure seasonal previews of rare GI-tagged lot selections and new artisan arrivals.
            </p>
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                showAlert("Thank you. Your email is added to our private ledger.", "success");
              }}
              className="flex border border-gold-400/30 rounded-sm overflow-hidden bg-neutral-900"
            >
              <input
                required
                type="email"
                placeholder="EMAIL COORDINATES"
                className="flex-grow p-2.5 bg-transparent text-white outline-none text-[10px] font-light placeholder:text-neutral-500 uppercase font-mono tracking-wider"
              />
              <button
                type="submit"
                className="px-4 bg-gold-500 hover:bg-gold-600 text-neutral-950 font-semibold cursor-pointer"
                aria-label="Submit newsletter subscription"
              >
                <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 border-t border-neutral-900 mt-12 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[10px] text-neutral-500 uppercase tracking-widest font-mono gap-4">
          <p>© 2026 Ziryaat Kash Heritage Ltd. All Rights Reserved.</p>
          <p className="flex items-center space-x-1">
            <ShieldCheck className="h-4 w-4 text-gold-500" />
            <span>Guaranteed Direct Artisan Return System.</span>
          </p>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
