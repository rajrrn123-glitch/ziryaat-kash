import React from "react";
import { Product } from "../types";
import { useApp } from "../context/AppContext";
import { Star, ShieldCheck, Heart } from "lucide-react";

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { setSelectedProduct, addToCart } = useApp();

  return (
    <div className="group relative bg-white border border-gold-200 p-2 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between h-full">
      
      {/* Product Image & Tags */}
      <div className="relative overflow-hidden aspect-square bg-neutral-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* GI Tag indicators */}
        {product.certificate.giTagged && (
          <span className="absolute top-3 left-3 bg-neutral-900/90 border border-gold-400 text-gold-300 text-[8px] font-mono tracking-widest uppercase font-semibold px-2.5 py-1 rounded-sm shadow-md">
            GI Certified
          </span>
        )}

        {product.stock <= 0 ? (
          <span className="absolute top-3 right-3 bg-red-950/95 border border-red-400 text-red-200 text-[8px] font-mono tracking-widest uppercase font-semibold px-2.5 py-1 rounded-sm shadow-md">
            Sold Out
          </span>
        ) : product.stock <= 3 ? (
          <span className="absolute top-3 right-3 bg-gold-950/95 border border-gold-300 text-gold-200 text-[8px] font-mono tracking-widest uppercase font-semibold px-2.5 py-1 rounded-sm shadow-md">
            Only {product.stock} left
          </span>
        ) : null}

        {/* Hover overlay quick controls */}
        <div className="absolute inset-0 bg-neutral-950/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <button
            onClick={() => setSelectedProduct(product)}
            className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-950 text-gold-300 border border-gold-400 hover:border-gold-300 text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 rounded-sm cursor-pointer shadow-lg"
          >
            Discover Craftsmanship
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="pt-4 pb-2 px-2 flex-grow flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[10px] tracking-widest uppercase font-semibold text-gold-600 mb-1.5">
            <span>{product.category}</span>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-gold-400 stroke-gold-500" />
              <span className="text-neutral-800 font-medium">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Name */}
          <h3 
            onClick={() => setSelectedProduct(product)}
            className="font-luxury-display text-xs sm:text-sm font-bold text-neutral-950 leading-snug tracking-wide group-hover:text-gold-600 cursor-pointer transition-colors line-clamp-2 h-10"
          >
            {product.name}
          </h3>

          {/* Sku / Specs teaser */}
          <p className="text-[10px] text-neutral-400 font-mono tracking-wider mt-1.5">
            SKU: {product.sku}
          </p>
        </div>

        {/* Price & Primary Action */}
        <div className="mt-4 pt-3 border-t border-gold-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-medium">Acquisition Price</span>
            <span className="text-sm sm:text-base font-luxury-display font-semibold text-neutral-950">
              ${product.price.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {product.stock > 0 ? (
              <button
                onClick={() => addToCart(product)}
                className="px-3.5 py-2 bg-neutral-950 hover:bg-gold-500 hover:text-neutral-950 text-gold-300 border border-gold-500/50 text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 rounded-sm cursor-pointer"
              >
                Acquire
              </button>
            ) : (
              <button
                disabled
                className="px-3 py-2 bg-neutral-100 text-neutral-400 border border-neutral-200 text-[10px] tracking-widest uppercase font-semibold rounded-sm cursor-not-allowed"
              >
                Inactive
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
