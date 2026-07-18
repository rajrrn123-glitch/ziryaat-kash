import React from "react";
import { useApp } from "../context/AppContext";
import { ProductCard } from "./ProductCard";
import { Search, SlidersHorizontal, Filter, Grid, ArrowUpDown, RefreshCw } from "lucide-react";

export const ProductCatalog: React.FC = () => {
  const {
    products,
    isLoadingProducts,
    selectedCategory,
    setSelectedCategory,
    searchKeyword,
    setSearchKeyword,
    maxPrice,
    setMaxPrice,
    sortBy,
    setSortBy,
    reloadProducts
  } = useApp();

  const categories = ["All", "Pashmina Shawls", "Saffron", "Dry Fruits", "Handicrafts", "Leather Bags", "Home Decor"];

  // Filter & Sort Logic
  const filteredProducts = products
    .filter((p) => {
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchSearch = 
        p.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        p.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchKeyword.toLowerCase());
      const matchPrice = p.price <= maxPrice;
      return matchCat && matchSearch && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      // Default: featured first, then standard order
      const aFeat = a.featured ? 1 : 0;
      const bFeat = b.featured ? 1 : 0;
      return bFeat - aFeat;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
      
      {/* Page Title header */}
      <div className="border-b border-gold-200 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-gold-600 font-luxury-display text-xs tracking-[0.3em] uppercase block mb-1">
            Ziryaat Kash Boutique
          </span>
          <h1 className="text-2xl sm:text-4xl font-luxury-display tracking-widest uppercase font-medium text-neutral-950">
            {selectedCategory === "All" ? "HERITAGE COUTURE CATALOG" : `${selectedCategory.toUpperCase()} COLLECTION`}
          </h1>
          <p className="text-xs text-neutral-400 font-light mt-1 uppercase tracking-wider">
            {filteredProducts.length} unique collectibles identified
          </p>
        </div>

        {/* Search bar input */}
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search catalog by term, SKU, craft..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-3 bg-white border border-gold-300 outline-none rounded-sm font-light focus:border-gold-500 shadow-sm transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Filters Panel (lg:span-3) */}
        <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-24">
          
          {/* Categories select menu block */}
          <div className="bg-white border border-gold-200 p-5 rounded-sm shadow-sm space-y-4">
            <h3 className="text-xs font-luxury-display uppercase tracking-widest font-bold text-neutral-950 pb-2 mb-3 border-b border-gold-100 flex items-center space-x-2">
              <Filter className="h-3.5 w-3.5 text-gold-500" />
              <span>Heritage Collections</span>
            </h3>
            
            <div className="flex flex-col space-y-1.5 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left py-2 px-3 transition-all rounded-sm uppercase tracking-wider font-medium text-[10px] cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-neutral-950 text-gold-300 border-l-2 border-gold-500"
                      : "text-neutral-600 hover:bg-gold-50 hover:text-gold-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing slider block */}
          <div className="bg-white border border-gold-200 p-5 rounded-sm shadow-sm space-y-4">
            <h3 className="text-xs font-luxury-display uppercase tracking-widest font-bold text-neutral-950 pb-2 mb-3 border-b border-gold-100 flex items-center space-x-2">
              <SlidersHorizontal className="h-3.5 w-3.5 text-gold-500" />
              <span>Investment Range</span>
            </h3>
            
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-gold-500"
              />
              <div className="flex justify-between items-center text-xs font-medium font-mono text-neutral-700 bg-neutral-50 p-2 border border-neutral-100 rounded-sm">
                <span>Max: ${maxPrice.toLocaleString()} USD</span>
                <button 
                  onClick={() => setMaxPrice(5000)}
                  className="text-[9px] uppercase tracking-wider font-sans font-bold text-gold-600 hover:underline"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Sort selection block */}
          <div className="bg-white border border-gold-200 p-5 rounded-sm shadow-sm space-y-4">
            <h3 className="text-xs font-luxury-display uppercase tracking-widest font-bold text-neutral-950 pb-2 mb-3 border-b border-gold-100 flex items-center space-x-2">
              <ArrowUpDown className="h-3.5 w-3.5 text-gold-500" />
              <span>Organise Collection</span>
            </h3>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full text-xs p-2.5 border border-gold-200 outline-none rounded-sm bg-[#FCF9F6] focus:border-gold-500 font-medium cursor-pointer"
            >
              <option value="featured">Featured Heirlooms</option>
              <option value="price-asc">Value: Low to High</option>
              <option value="price-desc">Value: High to Low</option>
              <option value="rating">Collector Ratings</option>
            </select>
          </div>

        </div>

        {/* Right Column: Catalog Grid (lg:span-9) */}
        <div className="lg:col-span-9">
          {isLoadingProducts ? (
            <div className="text-center py-20 space-y-4">
              <RefreshCw className="h-8 w-8 text-gold-500 animate-spin mx-auto" />
              <p className="text-xs text-neutral-400 italic">Accessing Kashmiri heritage archive databases...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-gold-200 p-8 rounded-sm space-y-4">
              <Grid className="h-10 w-10 text-gold-400 mx-auto" />
              <p className="text-sm text-neutral-500 font-light italic">
                No Kashmiri collectibles correspond to your specifications.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchKeyword("");
                  setMaxPrice(5000);
                  setSortBy("featured");
                }}
                className="px-6 py-2.5 bg-neutral-950 hover:bg-gold-500 text-gold-300 hover:text-neutral-950 text-[10px] tracking-widest uppercase font-semibold transition-all rounded-sm cursor-pointer"
              >
                Reset Specifications
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <div key={prod.id} className="animate-fadeIn">
                  <ProductCard product={prod} />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
