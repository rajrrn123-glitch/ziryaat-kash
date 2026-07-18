import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { X, Trash2, ShieldCheck, MapPin, CreditCard, ChevronRight, CheckCircle, Ticket } from "lucide-react";
import { Order } from "../types";

export const Cart: React.FC<{ isOpen: boolean; onClose: () => void; onOpenAuth: () => void }> = ({ isOpen, onClose, onOpenAuth }) => {
  const { 
    cart, 
    cartTotal, 
    updateCartQuantity, 
    removeFromCart, 
    currentUser, 
    checkoutCart,
    showAlert
  } = useApp();

  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Checkout Form fields
  const [fullName, setFullName] = useState(currentUser?.displayName || "");
  const [addressLine1, setAddressLine1] = useState(currentUser?.address?.addressLine1 || "");
  const [city, setCity] = useState(currentUser?.address?.city || "");
  const [stateRegion, setStateRegion] = useState(currentUser?.address?.state || "");
  const [postalCode, setPostalCode] = useState(currentUser?.address?.postalCode || "");
  const [country, setCountry] = useState(currentUser?.address?.country || "United States");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [paymentMethod, setPaymentMethod] = useState<Order["paymentMethod"]>("Credit Card");

  // Promo code
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  if (!isOpen) return null;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "KASHMIR10") {
      setDiscount(Math.round(cartTotal * 0.10));
      showAlert("Promo code applied: 10% Legacy Discount.", "success");
    } else {
      showAlert("Invalid promo code.", "error");
    }
  };

  const finalSubtotal = cartTotal - discount;
  const shippingCost = finalSubtotal > 500 ? 0 : 50;
  const estTax = Math.round(finalSubtotal * 0.08);
  const orderTotal = finalSubtotal + shippingCost + estTax;

  const handleProceedToCheckout = () => {
    if (!currentUser) {
      onOpenAuth();
      onClose();
      showAlert("Please log in or register to complete your acquisition.", "info");
      return;
    }
    // Update defaults if they changed in user profile
    setFullName(currentUser.displayName || "");
    setAddressLine1(currentUser.address?.addressLine1 || "");
    setCity(currentUser.address?.city || "");
    setStateRegion(currentUser.address?.state || "");
    setPostalCode(currentUser.address?.postalCode || "");
    setCountry(currentUser.address?.country || "United States");
    setPhone(currentUser.phone || "");
    
    setStep("checkout");
  };

  const handleSubmitCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !addressLine1 || !city || !stateRegion || !postalCode || !phone) {
      showAlert("Please fill in all shipping coordinates.", "error");
      return;
    }

    const shippingAddress: Order["shippingAddress"] = {
      fullName,
      addressLine1,
      city,
      state: stateRegion,
      postalCode,
      country,
      phone,
    };

    try {
      const order = await checkoutCart(shippingAddress, paymentMethod);
      setCreatedOrder(order);
      setStep("success");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseSuccess = () => {
    setStep("cart");
    setCreatedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm transition-opacity" 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        
        {/* Sliding Panel */}
        <div className="w-screen max-w-lg bg-white border-l border-gold-300 shadow-2xl flex flex-col justify-between h-full relative">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-gold-200 flex items-center justify-between bg-[#FCF9F6]">
            <div>
              <h2 className="font-luxury-display text-base tracking-widest uppercase font-semibold text-neutral-950">
                {step === "cart" && "YOUR ACQUISITIONS"}
                {step === "checkout" && "SECURE CHECKOUT"}
                {step === "success" && "PURCHASE SUCCESSFUL"}
              </h2>
              {step === "cart" && (
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-0.5 font-mono">
                  {cart.length} items curated
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-900 p-2 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* STEP 1: CART LIST */}
            {step === "cart" && (
              <>
                {cart.length === 0 ? (
                  <div className="text-center py-20 space-y-4">
                    <div className="h-12 w-12 border border-gold-200 rounded-full flex items-center justify-center mx-auto text-gold-400">
                      <Trash2 className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-light text-neutral-500 italic">
                      Your acquisitions drawer is currently empty.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 bg-neutral-950 hover:bg-gold-500 text-gold-300 hover:text-neutral-950 text-[10px] tracking-widest uppercase font-semibold transition-all rounded-sm cursor-pointer"
                    >
                      Browse Boutique
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={`${item.product.id}-${item.variant || ""}`} className="flex space-x-4 border border-gold-100 p-3 bg-white shadow-sm rounded-sm">
                        
                        {/* Thumb */}
                        <div className="w-20 h-20 bg-neutral-50 border border-neutral-200 flex-shrink-0 overflow-hidden">
                          <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Title & Controls */}
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] text-gold-600 uppercase tracking-widest font-mono font-medium block">
                              {item.product.category}
                            </span>
                            <h4 className="text-xs font-semibold text-neutral-950 line-clamp-1">
                              {item.product.name}
                            </h4>
                            <p className="text-xs font-luxury-display font-medium text-neutral-900 mt-1">
                              ${item.product.price.toLocaleString()}
                            </p>
                          </div>

                          {/* Controls */}
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-50">
                            <div className="flex items-center border border-gold-200 rounded-sm scale-90 origin-left">
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.variant)}
                                className="px-2 py-0.5 hover:bg-gold-50 text-neutral-500 text-xs"
                              >
                                -
                              </button>
                              <span className="px-3 text-xs font-semibold text-neutral-900 font-mono">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.variant)}
                                className="px-2 py-0.5 hover:bg-gold-50 text-neutral-500 text-xs"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.product.id, item.variant)}
                              className="text-neutral-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>

                        </div>
                      </div>
                    ))}

                    {/* Promo code area */}
                    <div className="pt-4 border-t border-neutral-100 flex space-x-2">
                      <input
                        type="text"
                        placeholder="ENTER PROMO CODE (e.g. KASHMIR10)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-grow text-xs px-3 py-2 border border-gold-200 focus:border-gold-500 outline-none rounded-sm font-light uppercase tracking-wider bg-neutral-50"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="px-4 py-2 bg-neutral-100 hover:bg-gold-100 border border-gold-300 text-[10px] tracking-widest uppercase font-semibold text-neutral-800 transition-colors rounded-sm cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* STEP 2: CHECKOUT FORM */}
            {step === "checkout" && (
              <form onSubmit={handleSubmitCheckout} className="space-y-4">
                
                {/* Shipping Coordinates Section */}
                <div className="space-y-3">
                  <h3 className="text-xs font-luxury-display uppercase tracking-widest font-bold text-neutral-900 border-b border-gold-100 pb-1.5 flex items-center space-x-2">
                    <MapPin className="h-3.5 w-3.5 text-gold-500" />
                    <span>Shipping Coordinates</span>
                  </h3>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-neutral-500 mb-1">Full Name of Consignee</label>
                    <input
                      required
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs p-2.5 border border-gold-200 outline-none rounded-sm bg-[#FCF9F6]"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-neutral-500 mb-1">Street Address</label>
                    <input
                      required
                      type="text"
                      placeholder="14 Kensington Palace Gardens"
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      className="w-full text-xs p-2.5 border border-gold-200 outline-none rounded-sm bg-[#FCF9F6]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-neutral-500 mb-1">City</label>
                      <input
                        required
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full text-xs p-2.5 border border-gold-200 outline-none rounded-sm bg-[#FCF9F6]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-neutral-500 mb-1">State / Region</label>
                      <input
                        required
                        type="text"
                        value={stateRegion}
                        onChange={(e) => setStateRegion(e.target.value)}
                        className="w-full text-xs p-2.5 border border-gold-200 outline-none rounded-sm bg-[#FCF9F6]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-neutral-500 mb-1">Postal / ZIP Code</label>
                      <input
                        required
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full text-xs p-2.5 border border-gold-200 outline-none rounded-sm bg-[#FCF9F6]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-neutral-500 mb-1">Country</label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full text-xs p-2.5 border border-gold-200 outline-none rounded-sm bg-[#FCF9F6]"
                      >
                        {["United States", "United Kingdom", "Canada", "France", "Germany", "Japan", "Switzerland", "India", "Saudi Arabia", "UAE"].map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-neutral-500 mb-1">Contact Phone Number</label>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs p-2.5 border border-gold-200 outline-none rounded-sm bg-[#FCF9F6]"
                    />
                  </div>
                </div>

                {/* Secure Payment System */}
                <div className="space-y-3 pt-4">
                  <h3 className="text-xs font-luxury-display uppercase tracking-widest font-bold text-neutral-900 border-b border-gold-100 pb-1.5 flex items-center space-x-2">
                    <CreditCard className="h-3.5 w-3.5 text-gold-500" />
                    <span>Acquisition Payment System</span>
                  </h3>

                  <div className="grid grid-cols-3 gap-2">
                    {(["Credit Card", "PayPal", "Bank Transfer"] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`p-2.5 text-[10px] uppercase font-semibold tracking-wider border rounded-sm transition-all cursor-pointer ${
                          paymentMethod === method 
                            ? "bg-neutral-950 text-gold-300 border-gold-400" 
                            : "bg-white text-neutral-600 border-neutral-200 hover:border-gold-300"
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>

                  {paymentMethod === "Credit Card" && (
                    <div className="space-y-3 bg-neutral-50 p-3.5 border border-neutral-100 rounded-sm">
                      <div>
                        <input
                          required
                          type="text"
                          placeholder="Card Number (4111 2222 3333 4444)"
                          defaultValue="4111 2222 3333 4444"
                          className="w-full text-xs p-2.5 border border-neutral-200 outline-none bg-white rounded-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          required
                          type="text"
                          placeholder="MM/YY"
                          defaultValue="12/29"
                          className="w-full text-xs p-2.5 border border-neutral-200 outline-none bg-white rounded-sm"
                        />
                        <input
                          required
                          type="text"
                          placeholder="CVC"
                          defaultValue="990"
                          className="w-full text-xs p-2.5 border border-neutral-200 outline-none bg-white rounded-sm"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "Bank Transfer" && (
                    <div className="p-3 bg-gold-50/50 border border-gold-100 rounded-sm text-[10px] text-neutral-700 space-y-1">
                      <p className="font-semibold uppercase tracking-wider text-gold-800">Srinagar Royal Bank Account</p>
                      <p>Beneficiary: Ziryaat Kash Heritage Ltd.</p>
                      <p>IBAN: IN73SRIN9002120098412</p>
                      <p>SWIFT/BIC: SRININ2AXXX</p>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-neutral-950 hover:bg-gold-500 text-gold-300 hover:text-neutral-950 font-luxury-display text-xs tracking-widest uppercase font-semibold border border-gold-400/50 rounded-sm transition-all shadow-xl cursor-pointer"
                  >
                    Authorise Royal Transaction (${orderTotal.toLocaleString()})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("cart")}
                    className="w-full text-center text-xs text-neutral-500 hover:text-neutral-800 mt-3 hover:underline"
                  >
                    Return to Acquisitions list
                  </button>
                </div>

              </form>
            )}

            {/* STEP 3: SUCCESS INVOICE RECEIPT */}
            {step === "success" && createdOrder && (
              <div className="space-y-6 text-center animate-fadeIn">
                <div className="flex flex-col items-center justify-center">
                  <div className="h-14 w-14 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600 mb-3 shadow-md">
                    <CheckCircle className="h-7 w-7 stroke-[2.5]" />
                  </div>
                  <h3 className="font-luxury-display text-lg font-bold text-neutral-950">
                    TRANSACTION SIGNED
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">
                    Receipt No: {createdOrder.orderNumber}
                  </p>
                </div>

                {/* Double Bordered Invoice Card */}
                <div className="border-4 border-double border-gold-300 p-5 bg-[#FCF9F6] rounded-sm text-left relative overflow-hidden text-xs text-neutral-800 shadow-sm">
                  <div className="border-b border-gold-200 pb-3 mb-4 text-center">
                    <span className="font-luxury-display text-[11px] tracking-[0.3em] text-neutral-900 font-bold block">
                      ZIRYAAT KASH
                    </span>
                    <span className="text-[8px] uppercase tracking-widest text-neutral-400">
                      Official Heritage Invoice Certificate
                    </span>
                  </div>

                  <div className="space-y-2.5 font-light">
                    <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                      <span>DATE: {new Date(createdOrder.createdAt).toLocaleString()}</span>
                      <span>STATUS: PAID/SECURED</span>
                    </div>

                    <div className="border-y border-neutral-100 py-3 my-3 space-y-2">
                      {createdOrder.items.map((item) => (
                        <div key={item.productId} className="flex justify-between items-center text-xs">
                          <span className="font-medium text-neutral-900 truncate max-w-[200px]">
                            {item.productName} <span className="text-neutral-400 text-[10px] font-mono">x{item.quantity}</span>
                          </span>
                          <span className="font-semibold font-luxury-display text-neutral-900">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1 text-xs border-b border-neutral-100 pb-3 mb-3">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Subtotal</span>
                        <span className="font-semibold text-neutral-900">${createdOrder.subtotal.toLocaleString()}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-gold-700">
                          <span>Legacy Discount (KASHMIR10)</span>
                          <span>-${discount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Premium Carriage</span>
                        <span className="font-semibold text-neutral-900">
                          {createdOrder.shipping === 0 ? "Complimentary" : `$${createdOrder.shipping}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Est. Heritage Tax</span>
                        <span className="font-semibold text-neutral-900">${createdOrder.tax}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm font-bold text-neutral-950 font-luxury-display bg-gold-100/50 p-2 border-l-2 border-gold-500 rounded-sm">
                      <span>TOTAL SECURED:</span>
                      <span>${createdOrder.total.toLocaleString()} USD</span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gold-200/45 text-[10px] text-neutral-500 font-mono space-y-1">
                      <p className="font-semibold uppercase text-neutral-700 font-sans tracking-wide">Delivery Address:</p>
                      <p>{createdOrder.shippingAddress.fullName}</p>
                      <p>{createdOrder.shippingAddress.addressLine1}, {createdOrder.shippingAddress.city}</p>
                      <p>{createdOrder.shippingAddress.state}, {createdOrder.shippingAddress.postalCode}</p>
                      <p>Phone: {createdOrder.shippingAddress.phone}</p>
                    </div>

                    <p className="text-[9px] text-center italic text-neutral-400 mt-6 pt-4 border-t border-neutral-100">
                      "Thank you for preserving Kashmir's direct heritage weaver lineage."
                    </p>

                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleCloseSuccess}
                    className="w-full py-3 bg-neutral-950 hover:bg-gold-500 text-gold-300 hover:text-neutral-950 text-[10px] tracking-widest uppercase font-semibold transition-all rounded-sm cursor-pointer"
                  >
                    Complete Heritage Entry
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Footer Receipt Summary Panel (Only visible on Cart Step and when items exist) */}
          {step === "cart" && cart.length > 0 && (
            <div className="p-6 border-t border-gold-200 bg-[#FCF9F6]">
              <div className="space-y-1.5 text-xs text-neutral-600 font-light mb-4">
                <div className="flex justify-between">
                  <span>Department Subtotal</span>
                  <span className="font-semibold text-neutral-950">${cartTotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-gold-700">
                    <span>Legacy Discount (KASHMIR10)</span>
                    <span>-${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Premium Carriage</span>
                  <span className="font-semibold text-neutral-950">
                    {finalSubtotal > 500 ? "Complimentary" : `$${shippingCost.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Heritage Tax (8%)</span>
                  <span className="font-semibold text-neutral-950">${estTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-neutral-950 font-luxury-display pt-3 border-t border-neutral-200 mt-2">
                  <span>ESTIMATED TOTAL:</span>
                  <span className="text-base text-gold-600">${orderTotal.toLocaleString()} USD</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 bg-neutral-950 hover:bg-gold-500 text-gold-300 hover:text-neutral-950 font-luxury-display text-xs tracking-widest uppercase font-semibold border border-gold-400/50 rounded-sm transition-all shadow-xl flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Proceed to Acquisition</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                
                <p className="text-[10px] text-center text-neutral-400 flex items-center justify-center space-x-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-gold-500" />
                  <span>Payments secured by 256-bit SSL Heritage Lock.</span>
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
