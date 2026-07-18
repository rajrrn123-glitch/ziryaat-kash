import React from "react";
import { useApp } from "../context/AppContext";
import { Compass, Sparkles, Award, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export const Hero: React.FC = () => {
  const { setActiveView, setSelectedCategory } = useApp();

  const handleExplore = () => {
    setSelectedCategory("All");
    setActiveView("products");
  };

  return (
    <div className="relative">
      
      {/* SECTION 1: MASTER BANNER */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-neutral-950 text-white py-16 px-4">
        {/* Background Image with golden twilight overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1595815771614-1217511655c2?auto=format&fit=crop&q=80&w=1600"
            alt="Kashmiri Highlands"
            className="w-full h-full object-cover object-center opacity-45 scale-105"
          />
          {/* Champagne gold vignette gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/90 via-neutral-950/70 to-neutral-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950/80" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-3"
          >
            <span className="text-gold-400 font-luxury-display text-[10px] sm:text-xs tracking-[0.5em] uppercase font-light border border-gold-400/30 px-3 py-1.5 rounded-full bg-gold-950/20">
              Preserving Royal Lineage Since 1872
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-luxury-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[0.1em] leading-none mb-6 text-white text-center"
          >
            THE SPIRIT OF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-100 to-gold-400 font-luxury-display">
              ROYAL KASHMIR
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-neutral-300 text-sm sm:text-lg max-w-2xl font-light tracking-wide leading-relaxed mb-10 text-center"
          >
            A curated sanctuary of authentic hand-spun Pashminas, premium Pampore saffron, hand-carved walnut masterpieces, and traditional Kashmiri heirlooms. Handcrafted slowly, authenticated meticulously.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md"
          >
            <button
              onClick={handleExplore}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-neutral-950 font-luxury-display text-xs tracking-widest uppercase font-semibold transition-all duration-300 rounded-sm shadow-lg shadow-gold-500/10 cursor-pointer flex items-center justify-center space-x-2 border border-gold-300"
            >
              <span>Explore Collection</span>
              <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
            </button>
            <a
              href="#brand-story"
              className="w-full sm:w-auto px-8 py-3.5 border border-[#EADEBE] hover:border-white hover:bg-white/5 text-gold-200 hover:text-white font-luxury-display text-xs tracking-widest uppercase transition-all duration-300 rounded-sm text-center cursor-pointer"
            >
              Our Heritage Story
            </a>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: BRAND TRILOGY METRICS */}
      <section className="bg-white py-12 border-b border-gold-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center p-4">
            <div className="h-10 w-10 flex items-center justify-center text-gold-500 bg-gold-50 rounded-full mb-3">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-luxury-display text-sm uppercase tracking-widest font-semibold text-neutral-900 mb-1">
              Government GI-Tag Validation
            </h3>
            <p className="text-xs text-neutral-500 max-w-xs font-light leading-relaxed">
              Every Pashmina, Saffron vial, and handicraft carries official GI verification and testing certification.
            </p>
          </div>

          <div className="flex flex-col items-center p-4 border-y md:border-y-0 md:border-x border-gold-100">
            <div className="h-10 w-10 flex items-center justify-center text-gold-500 bg-gold-50 rounded-full mb-3">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="font-luxury-display text-sm uppercase tracking-widest font-semibold text-neutral-900 mb-1">
              Direct-to-Artisan Registry
            </h3>
            <p className="text-xs text-neutral-500 max-w-xs font-light leading-relaxed">
              We eliminate intermediaries, transferring 85% of values directly to our registered Kashmiri heritage masters.
            </p>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className="h-10 w-10 flex items-center justify-center text-gold-500 bg-gold-50 rounded-full mb-3">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="font-luxury-display text-sm uppercase tracking-widest font-semibold text-neutral-900 mb-1">
              Unrivaled Imperial Quality
            </h3>
            <p className="text-xs text-neutral-500 max-w-xs font-light leading-relaxed">
              Each piece is custom checked, authenticated, and presented in premium handcrafted walnut wood or mulberry silk boxes.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE BRAND STORY & ORIGIN */}
      <section id="brand-story" className="py-20 px-4 bg-gradient-to-b from-white to-[#FCF9F6]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="border border-gold-200 p-2 bg-white shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=800"
                alt="Woven Heritage Detail"
                className="w-full h-auto object-cover aspect-[4/5]"
              />
            </div>
            {/* Absolute badge detail */}
            <div className="absolute -bottom-6 -right-6 bg-neutral-900 text-gold-300 p-6 border border-gold-400 hidden sm:block max-w-[200px] shadow-2xl">
              <p className="font-luxury-display text-2xl font-bold tracking-wider">85%</p>
              <p className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1">Returned directly to artisan families</p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center lg:pl-8">
            <span className="text-gold-600 font-luxury-display text-xs tracking-[0.3em] uppercase mb-2 font-medium">
              Authentic Kashmiri Lineage
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-luxury-display tracking-wide font-medium text-neutral-900 mb-6 leading-tight">
              Crafted Slowly, <br />
              Woven for Generations
            </h2>
            
            <div className="text-neutral-600 text-sm font-light space-y-4 leading-relaxed tracking-wide">
              <p>
                In the serene valleys of Kashmir, craftsmanship is not merely a job; it is a sacred inheritance. For centuries, our artisans have spun stories into threads and woven the pristine climate of the Himalayas into every texture.
              </p>
              <p>
                <strong>ZIRYAAT KASH</strong> (meaning "The Seed of Kash") was founded to safeguard this legacy. Each year, global markets are flooded with cheap machine-made duplicates. Our mission is absolute: to offer our international patrons exclusive access to certified Kashmiri treasures, with each piece carrying a story of its artisan.
              </p>
              <p className="italic font-serif-elegant text-gold-700 text-base pt-2">
                "When you purchase from Ziryaat Kash, you do not buy a commodity. You hold the life's work of a master craftsman."
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gold-200 flex items-center space-x-6">
              <button
                onClick={() => handleCategoryNav("Pashmina Shawls")}
                className="text-xs uppercase tracking-widest font-semibold text-neutral-900 hover:text-gold-600 transition-colors cursor-pointer flex items-center space-x-1.5"
              >
                <span>View Pashmina Shawls</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => handleCategoryNav("Saffron")}
                className="text-xs uppercase tracking-widest font-semibold text-neutral-900 hover:text-gold-600 transition-colors cursor-pointer flex items-center space-x-1.5"
              >
                <span>View Saffron</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: SELECT CATEGORIES LIST */}
      <section className="py-16 px-4 bg-[#FCF9F6] border-t border-gold-100">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <span className="text-gold-600 font-luxury-display text-xs tracking-[0.3em] uppercase mb-2 block">
            Signature Collections
          </span>
          <h2 className="text-2xl sm:text-3xl font-luxury-display tracking-widest uppercase font-medium text-neutral-950">
            SHOP BY HERITAGE DEPARTMENTS
          </h2>
          <div className="h-[1px] w-12 bg-gold-400 mx-auto mt-4" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Pashmina Shawls",
              desc: "100% fine handspun cashmere drapes.",
              img: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=600",
            },
            {
              name: "Saffron",
              desc: "Deep crimson stigmas from Pampore fields.",
              img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600",
            },
            {
              name: "Dry Fruits",
              desc: "Organic Kagzi walnuts and sweet almond halves.",
              img: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&q=80&w=600",
            },
            {
              name: "Handicrafts",
              desc: "Naqashi paper mache painted with 24K gold.",
              img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600",
            },
            {
              name: "Leather Bags",
              desc: "Vegetable tanned duffels using local walnut barks.",
              img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=600",
            },
            {
              name: "Home Decor",
              desc: "Hand-knotted silk rugs & carved walnut wood.",
              img: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=600",
            },
          ].map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategoryNav(cat.name)}
              className="relative group overflow-hidden border border-gold-200 p-1.5 bg-white shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-neutral-900">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/40 transition-colors duration-500" />
              </div>
              <div className="pt-4 pb-2 px-3 flex flex-col justify-between">
                <div>
                  <h3 className="font-luxury-display text-sm uppercase tracking-widest font-semibold text-neutral-900 group-hover:text-gold-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-neutral-500 font-light mt-1">{cat.desc}</p>
                </div>
                <div className="mt-4 pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] uppercase tracking-widest font-semibold text-neutral-900 group-hover:text-gold-600 transition-colors">
                  <span>Enter Salon</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );

  function handleCategoryNav(cat: string) {
    setSelectedCategory(cat);
    setActiveView("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
