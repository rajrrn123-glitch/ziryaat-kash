import React, { useState } from "react";
import { Product } from "../types";
import { useApp } from "../context/AppContext";
import { X, Star, Calendar, Shield, MapPin, Award, User, ShoppingBag, Plus, Minus } from "lucide-react";

export const ProductDetail: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, submitReview, currentUser } = useApp();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  if (!selectedProduct) return null;

  const product = selectedProduct;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    submitReview(product.id, rating, comment);
    setComment("");
    setRating(5);
  };

  const incrementQty = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const decrementQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAcquire = () => {
    addToCart(product, quantity);
    setSelectedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      
      <div className="relative w-full max-w-6xl bg-white border border-gold-300 shadow-2xl rounded-sm max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute right-4 top-4 z-10 text-neutral-500 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 p-2 rounded-full transition-colors cursor-pointer"
          aria-label="Close details"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 sm:p-8">
          
          {/* Left Column: Image Gallery (lg:span-5) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="border border-gold-200 p-1.5 bg-white shadow-inner aspect-square overflow-hidden bg-neutral-50">
              <img
                src={product.images[activeImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-all"
              />
            </div>
            
            {/* Gallery Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-2.5">
                {product.images.map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => setActiveImage(idx)}
                    className={`w-20 h-20 border p-1 bg-white cursor-pointer transition-all ${
                      activeImage === idx ? "border-gold-500 ring-1 ring-gold-400" : "border-neutral-200 hover:border-gold-300"
                    }`}
                  >
                    <img src={img} alt="Product thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Authenticity Certificate Box (Frame Styled) */}
            <div className="border-2 border-double border-gold-400 bg-gold-50/45 p-5 mt-6 rounded-sm relative overflow-hidden shadow-sm">
              {/* Subtle watermark background */}
              <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                <Shield className="h-48 w-48 text-gold-900" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between border-b border-gold-300/60 pb-2 mb-3">
                  <span className="font-luxury-display text-[10px] tracking-[0.2em] text-gold-700 font-bold uppercase">
                    Certificate of Heritage Authenticity
                  </span>
                  <Award className="h-4 w-4 text-gold-600" />
                </div>
                
                <div className="space-y-1.5 text-xs text-neutral-800">
                  <p className="font-mono text-[10px] text-neutral-500">
                    CERTIFICATE NO: <span className="text-neutral-900 font-semibold">{product.certificate.certificateNo}</span>
                  </p>
                  <p>
                    <strong className="text-neutral-700">Validating Laboratory:</strong> {product.certificate.testingLab}
                  </p>
                  {product.certificate.giTagged && (
                    <p className="flex items-center space-x-1 text-emerald-800 font-medium text-[11px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                      <span>Govt. Geographical Indication (GI) Protected</span>
                    </p>
                  )}
                  {product.certificate.threadCount && (
                    <p><strong className="text-neutral-700">Verified Fiber Grade:</strong> {product.certificate.threadCount}</p>
                  )}
                  {product.certificate.crocinLevel && (
                    <p><strong className="text-neutral-700">Crocin Content Rating:</strong> {product.certificate.crocinLevel}</p>
                  )}
                  {product.certificate.purityGrade && (
                    <p><strong className="text-neutral-700">Materials Purity Rating:</strong> {product.certificate.purityGrade}</p>
                  )}
                  {product.certificate.moistureLevel && (
                    <p><strong className="text-neutral-700">Curing Moisture Limit:</strong> {product.certificate.moistureLevel}</p>
                  )}
                  {product.certificate.materialSource && (
                    <p><strong className="text-neutral-700">Ethical Source Core:</strong> {product.certificate.materialSource}</p>
                  )}
                  {product.certificate.woodType && (
                    <p><strong className="text-neutral-700">Seasoned Timber Spec:</strong> {product.certificate.woodType}</p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-gold-200/50 flex justify-between items-end">
                  <div>
                    <span className="text-[8px] text-neutral-400 block uppercase tracking-wider">Heritage Signatory</span>
                    <span className="font-serif-elegant italic text-[11px] text-neutral-800 font-bold">{product.certificate.artisanSignature}</span>
                  </div>
                  <div className="bg-neutral-900 border border-gold-300 text-[8px] font-luxury-display text-gold-300 uppercase tracking-widest px-2 py-1 select-none">
                    Ziryaat Verified
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Spec Sheet & Custom interactions (lg:span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Header detail */}
            <div>
              <div className="flex items-center justify-between text-[10px] tracking-widest uppercase font-semibold text-gold-600 mb-2">
                <span>{product.category}</span>
                <span className="font-mono text-neutral-400">{product.sku}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-luxury-display tracking-wide font-medium text-neutral-950 mb-3">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-gold-400 stroke-gold-500"
                          : "text-neutral-200 fill-neutral-100"
                      }`}
                    />
                  ))}
                  <span className="text-xs font-semibold text-neutral-800 ml-2">
                    {product.rating.toFixed(1)} / 5.0
                  </span>
                </div>
                <span className="text-xs text-neutral-400">|</span>
                <span className="text-xs text-neutral-500 font-light">
                  {product.reviews.length} Collector Reviews
                </span>
              </div>

              <div className="text-xl sm:text-2xl font-luxury-display font-medium text-neutral-950 mb-4 bg-gold-50/50 p-3 inline-block border-l-2 border-gold-500 rounded-r-sm">
                ${product.price.toLocaleString()}
                <span className="text-xs text-neutral-400 font-light ml-2 uppercase tracking-widest">USD (Duty-Free Shipping)</span>
              </div>

              <p className="text-sm text-neutral-600 font-light leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Technical Specifications */}
            <div className="border border-neutral-100 bg-neutral-50/50 p-4 rounded-sm">
              <h3 className="text-xs font-luxury-display uppercase tracking-widest font-semibold text-neutral-900 border-b border-neutral-200 pb-2 mb-3">
                Specification Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 text-xs">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between border-b border-neutral-100 pb-1.5">
                    <span className="text-neutral-500 font-light">{key}</span>
                    <span className="text-neutral-900 font-medium text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Artisan Story Section */}
            <div className="border border-gold-100 bg-gold-50/20 p-5 rounded-sm flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5">
              <div className="flex-shrink-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-gold-300 p-0.5">
                  <img
                    src={product.artisan.avatar}
                    alt={product.artisan.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="space-y-1.5 flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <span className="text-xs font-luxury-display uppercase tracking-widest text-gold-700 font-bold">
                    Master Craftsman Profile
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    Experience: {product.artisan.experience}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-neutral-950 flex items-center space-x-1.5">
                  <span>{product.artisan.name}</span>
                  <span className="text-xs text-neutral-400 font-normal">of {product.artisan.village}</span>
                </h4>
                <p className="text-xs text-neutral-600 font-light italic leading-relaxed">
                  "{product.artisan.story}"
                </p>
              </div>
            </div>

            {/* Acquisition Settings (Qty and Add to bag) */}
            <div className="border-t border-neutral-200 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-3">
                <span className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Quantity</span>
                <div className="flex items-center border border-gold-300 rounded-sm overflow-hidden bg-white">
                  <button
                    onClick={decrementQty}
                    className="p-2 hover:bg-gold-50 text-neutral-600 transition-colors cursor-pointer"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="px-5 text-xs font-medium text-neutral-950 font-mono">{quantity}</span>
                  <button
                    onClick={incrementQty}
                    className="p-2 hover:bg-gold-50 text-neutral-600 transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-neutral-400 font-light font-mono">({product.stock} pieces in archive)</span>
              </div>

              <div>
                {product.stock > 0 ? (
                  <button
                    onClick={handleAcquire}
                    className="w-full sm:w-auto px-8 py-3.5 bg-neutral-950 hover:bg-gold-500 text-gold-300 hover:text-neutral-950 font-luxury-display text-xs tracking-widest uppercase font-semibold transition-all duration-300 border border-gold-400/50 rounded-sm shadow-xl flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Acquire Heritage Masterpiece</span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full sm:w-auto px-8 py-3.5 bg-neutral-100 text-neutral-400 text-xs tracking-widest uppercase font-semibold rounded-sm cursor-not-allowed border border-neutral-200"
                  >
                    Awaiting Restock
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Reviews Section */}
        <div className="border-t border-neutral-200 bg-[#FCF9F6] p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Reviews display (lg:span-7) */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-sm font-luxury-display uppercase tracking-widest font-semibold text-neutral-950 mb-6 flex items-center justify-between">
                <span>Collector Reviews ({product.reviews.length})</span>
              </h3>

              {product.reviews.length === 0 ? (
                <p className="text-xs text-neutral-500 font-light italic">No heritage reviews submitted for this specific collectible yet.</p>
              ) : (
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="bg-white border border-gold-100 p-4 rounded-sm shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="h-6 w-6 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 text-[10px] font-bold">
                            {rev.userName.charAt(0)}
                          </div>
                          <span className="text-xs font-semibold text-neutral-900">{rev.userName}</span>
                          {rev.verified && (
                            <span className="text-[8px] bg-emerald-50 border border-emerald-200 text-emerald-800 uppercase px-1.5 py-0.5 rounded-sm font-semibold tracking-wider">
                              Verified Patron
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-neutral-400 font-mono">{rev.date}</span>
                      </div>
                      <div className="flex items-center space-x-0.5 mb-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < rev.rating ? "fill-gold-400 stroke-gold-500" : "text-neutral-200 fill-neutral-100"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-neutral-600 font-light leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit review form (lg:span-5) */}
            <div className="lg:col-span-5 bg-white border border-gold-200 p-6 rounded-sm">
              <h3 className="text-xs font-luxury-display uppercase tracking-widest font-semibold text-neutral-950 pb-2 mb-4 border-b border-gold-100">
                Share Your Experience
              </h3>
              
              {currentUser ? (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">Rating</label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setRating(val)}
                          className="hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              val <= rating ? "fill-gold-400 stroke-gold-500" : "text-neutral-200"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">Patron Comments</label>
                    <textarea
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your thoughts on the fiber quality, packaging, and heritage authenticity..."
                      className="w-full text-xs p-3 border border-gold-200 focus:border-gold-500 outline-none rounded-sm min-h-[100px] font-light bg-[#FCF9F6]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-neutral-950 hover:bg-gold-500 text-gold-300 hover:text-neutral-950 text-[10px] tracking-widest uppercase font-semibold transition-all rounded-sm cursor-pointer border border-gold-400/30"
                  >
                    Publish Review
                  </button>
                </form>
              ) : (
                <div className="text-center py-6">
                  <p className="text-xs text-neutral-500 font-light mb-4">You must enter our patron lounge to publish master evaluations.</p>
                  <p className="text-[10px] text-gold-600 font-medium uppercase tracking-wider">Please Sign In from the Top Bar</p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
