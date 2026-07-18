import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { ShoppingBag, User, Phone, MapPin, Compass, ShieldAlert, LogOut, Menu, X, Landmark } from "lucide-react";
import { isCloudActive } from "../lib/firebaseService";

export const Navbar: React.FC<{ onOpenCart: () => void; onOpenAuth: () => void }> = ({ onOpenCart, onOpenAuth }) => {
  const { activeView, setActiveView, cartCount, currentUser, logoutUser, setSelectedCategory, language, setLanguage } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCategoryNav = (category: string) => {
    setSelectedCategory(category);
    setActiveView("products");
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: "Heritage Home", view: "home" as const },
    { label: "Boutique", view: "products" as const },
    { label: "Contact", view: "contact" as const },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#EADEBE] px-4 sm:px-8 py-3.5 sm:py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center space-x-8 text-xs tracking-widest uppercase font-medium">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setActiveView(item.view);
                if (item.view === "products") setSelectedCategory("All");
              }}
              className={`hover:text-gold-500 transition-colors duration-300 cursor-pointer ${
                activeView === item.view ? "text-gold-500 border-b border-gold-500 pb-1" : "text-neutral-700"
              }`}
            >
              {item.label}
            </button>
          ))}
          
          {/* Quick Categories dropdown hint */}
          <div className="relative group">
            <button className="text-neutral-700 hover:text-gold-500 uppercase tracking-widest transition-colors cursor-pointer pb-1">
              Collections
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gold-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 rounded-sm">
              {["Pashmina Shawls", "Saffron", "Dry Fruits", "Handicrafts", "Leather Bags", "Home Decor"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryNav(cat)}
                  className="w-full text-left px-4 py-2 text-xs text-neutral-800 hover:bg-gold-50 hover:text-gold-600 transition-all uppercase tracking-wider"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Brand Identity Logo */}
        <div className="flex flex-col items-center">
          <button 
            onClick={() => { setActiveView("home"); setSelectedCategory("All"); }}
            className="flex flex-col items-center group cursor-pointer"
          >
            <span className="font-luxury-display text-lg sm:text-2xl font-semibold tracking-[0.25em] text-neutral-950 group-hover:text-gold-600 transition-colors">
              ZIRYAAT KASH
            </span>
            <span className="text-[9px] sm:text-[10px] font-luxury-display tracking-[0.4em] text-gold-500 uppercase mt-0.5 sm:mt-1 font-light">
              Kashmiri Heritage Luxury
            </span>
          </button>
        </div>

        {/* Right Side: Account, Cart, System status */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          
          {/* Language Selector */}
          <button
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="text-[10px] uppercase font-semibold tracking-wider text-neutral-800 border border-[#EADEBE] bg-white hover:bg-gold-50 px-2.5 py-1.5 rounded-sm cursor-pointer transition-all font-mono"
            title="Switch Language / भाषा बदलें"
          >
            {language === "en" ? "English" : "हिन्दी"}
          </button>

          {/* Cloud Database Status Indicator */}
          <div className="hidden md:flex items-center space-x-1.5 border border-gold-100 bg-gold-50/50 px-2.5 py-1.5 rounded-full">
            <span className={`h-1.5 w-1.5 rounded-full ${isCloudActive ? "bg-emerald-500 animate-pulse" : "bg-gold-500"}`} />
            <span className="text-[10px] text-neutral-500 font-mono tracking-wider uppercase font-medium">
              {isCloudActive ? "Cloud Sync" : "Heritage Offline Sandbox"}
            </span>
          </div>

          {/* User profile / Auth button */}
          {currentUser ? (
            <div className="relative group">
              <button className="flex items-center space-x-1 sm:space-x-2 text-neutral-800 hover:text-gold-600 transition-colors cursor-pointer py-1">
                <User className="h-4 sm:h-4.5 w-4 sm:w-4.5" />
                <span className="hidden sm:inline text-xs font-medium max-w-[100px] truncate">
                  {currentUser.displayName.split(" ")[0]}
                </span>
              </button>
              
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gold-200 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 rounded-sm text-xs">
                <div className="px-4 py-2 border-b border-neutral-100 font-medium text-neutral-800">
                  {currentUser.displayName}
                  <p className="text-[10px] text-neutral-400 font-light truncate">{currentUser.email}</p>
                </div>
                
                <button
                  onClick={() => setActiveView("profile")}
                  className="w-full text-left px-4 py-2.5 hover:bg-gold-50 text-neutral-700 hover:text-gold-600 transition-colors flex items-center space-x-2"
                >
                  <MapPin className="h-3.5 w-3.5 text-gold-500" />
                  <span>My Heritage Account</span>
                </button>

                {currentUser.isAdmin && (
                  <button
                    onClick={() => setActiveView("admin")}
                    className="w-full text-left px-4 py-2.5 hover:bg-gold-50 text-gold-700 font-medium hover:text-gold-600 transition-colors flex items-center space-x-2 border-t border-neutral-100"
                  >
                    <Compass className="h-3.5 w-3.5 text-gold-500 animate-spin" />
                    <span>Director Dashboard</span>
                  </button>
                )}

                <button
                  onClick={logoutUser}
                  className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors flex items-center space-x-2 border-t border-neutral-100"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Exit Lounge</span>
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="text-neutral-800 hover:text-gold-600 transition-colors text-xs font-medium uppercase tracking-wider flex items-center space-x-1 sm:space-x-1.5 cursor-pointer"
            >
              <User className="h-4 sm:h-4.5 w-4 sm:w-4.5" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

          {/* Cart Icon with badge */}
          <button
            onClick={onOpenCart}
            className="relative text-neutral-800 hover:text-gold-600 transition-colors p-1.5 cursor-pointer"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="h-4.5 sm:h-5 w-4.5 sm:w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#121212] border border-[#D4AF37] text-gold-300 text-[9px] font-bold h-4 sm:h-4.5 w-4 sm:w-4.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger (Mobile Menu Toggle) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-neutral-800 hover:text-gold-600 focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 sm:h-6 w-5 sm:w-6" /> : <Menu className="h-5 sm:h-6 w-5 sm:w-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-gold-100 flex flex-col space-y-4 pb-4 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setActiveView(item.view);
                if (item.view === "products") setSelectedCategory("All");
                setMobileMenuOpen(false);
              }}
              className={`text-left text-xs uppercase tracking-widest font-medium py-1.5 ${
                activeView === item.view ? "text-gold-600 border-l-2 border-gold-500 pl-2" : "text-neutral-700"
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="border-t border-gold-100 pt-3">
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest mb-2 font-medium">Collections</p>
            <div className="grid grid-cols-2 gap-2 text-[11px] uppercase tracking-wider text-neutral-600">
              {["Pashmina Shawls", "Saffron", "Dry Fruits", "Handicrafts", "Leather Bags", "Home Decor"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryNav(cat)}
                  className="text-left hover:text-gold-600 py-1"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
