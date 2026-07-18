import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { MapPin, Calendar, CreditCard, ChevronDown, ChevronUp, Clock, Package, Truck, CheckCircle2, ShoppingBag } from "lucide-react";
import { Order } from "../types";

export const UserProfile: React.FC = () => {
  const { currentUser, userOrders, updateUserAddress, isUserLoading, isLoadingOrders, setActiveView } = useApp();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Address inputs state
  const [fullName, setFullName] = useState(currentUser?.address?.fullName || currentUser?.displayName || "");
  const [addressLine1, setAddressLine1] = useState(currentUser?.address?.addressLine1 || "");
  const [addressLine2, setAddressLine2] = useState(currentUser?.address?.addressLine2 || "");
  const [city, setCity] = useState(currentUser?.address?.city || "");
  const [stateRegion, setStateRegion] = useState(currentUser?.address?.state || "");
  const [postalCode, setPostalCode] = useState(currentUser?.address?.postalCode || "");
  const [country, setCountry] = useState(currentUser?.address?.country || "United States");
  const [phone, setPhone] = useState(currentUser?.phone || "");

  const [isSaving, setIsSaving] = useState(false);

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="font-luxury-display text-xl uppercase tracking-widest text-neutral-900">Patron Lounge Restricted</h2>
        <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto">
          Please authenticate using the "Sign In" button in the upper right header to access your heritage order tracking logs.
        </p>
      </div>
    );
  }

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const updatedAddress = {
      fullName,
      addressLine1,
      addressLine2,
      city,
      state: stateRegion,
      postalCode,
      country,
    };
    await updateUserAddress(updatedAddress, phone);
    setIsSaving(false);
  };

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getStatusStep = (status: Order["status"]) => {
    switch (status) {
      case "Pending": return 1;
      case "Processing": return 2;
      case "Shipped": return 3;
      case "Delivered": return 4;
      default: return 0;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
      
      {/* Intro Header */}
      <div className="border-b border-gold-200 pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-gold-600 font-luxury-display text-xs tracking-[0.3em] uppercase block mb-1">
            Official Patron Circle
          </span>
          <h1 className="text-2xl sm:text-4xl font-luxury-display tracking-widest uppercase font-medium text-neutral-950">
            {currentUser.displayName}
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            MEMBER SINCE: {new Date(currentUser.createdAt).toLocaleDateString()} | STATUS: {currentUser.isAdmin ? "Heritage Director" : "Venerated Patron"}
          </p>
        </div>
        
        {currentUser.isAdmin && (
          <button
            onClick={() => setActiveView("admin")}
            className="px-5 py-2.5 bg-neutral-950 hover:bg-gold-500 text-gold-300 hover:text-neutral-950 text-[10px] tracking-widest uppercase font-semibold transition-all rounded-sm border border-gold-400 cursor-pointer"
          >
            Access Director Panel
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Orders and Tracking history (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between border-b border-gold-100 pb-3">
            <h2 className="font-luxury-display text-sm uppercase tracking-widest font-bold text-neutral-950">
              Heritage Acquisitions History
            </h2>
            <span className="text-[10px] bg-gold-50 text-gold-700 px-2.5 py-1 rounded-full font-mono uppercase">
              {userOrders.length} Orders Logged
            </span>
          </div>

          {isLoadingOrders ? (
            <p className="text-xs text-neutral-400 italic">Accessing Srinagar records vault...</p>
          ) : userOrders.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-gold-200 bg-white p-6 rounded-sm">
              <p className="text-xs text-neutral-500 font-light italic mb-4">You have not initiated any Kashmiri acquisitions yet.</p>
              <button
                onClick={() => setActiveView("products")}
                className="px-6 py-2 bg-neutral-950 hover:bg-gold-500 text-gold-300 hover:text-neutral-950 text-[10px] tracking-widest uppercase font-semibold transition-colors"
              >
                Acquire First Masterpiece
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {userOrders.map((order) => {
                const isExpanded = expandedOrderId === order.id;
                const activeStep = getStatusStep(order.status);

                return (
                  <div key={order.id} className="border border-gold-200 bg-white rounded-sm overflow-hidden shadow-sm">
                    
                    {/* Order summary row */}
                    <div 
                      onClick={() => toggleOrderExpand(order.id)}
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-gold-50/20 transition-colors"
                    >
                      <div className="space-y-1">
                        <p className="font-mono text-xs text-neutral-800 font-semibold">
                          {order.orderNumber}
                        </p>
                        <p className="text-[10px] text-neutral-400 flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                        </p>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Total Value</p>
                          <p className="font-luxury-display text-sm font-semibold text-neutral-950">${order.total.toLocaleString()} USD</p>
                        </div>

                        {/* Status Label */}
                        <div className="text-right">
                          <span className={`inline-block text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-sm ${
                            order.status === "Delivered" ? "bg-emerald-50 border border-emerald-200 text-emerald-800" :
                            order.status === "Cancelled" ? "bg-red-50 border border-red-200 text-red-800" :
                            "bg-gold-50 border border-gold-300 text-gold-800 animate-pulse"
                          }`}>
                            {order.status}
                          </span>
                        </div>

                        {isExpanded ? <ChevronUp className="h-4 w-4 text-neutral-400" /> : <ChevronDown className="h-4 w-4 text-neutral-400" />}
                      </div>
                    </div>

                    {/* Expandable Tracking & Line Items Detail */}
                    {isExpanded && (
                      <div className="border-t border-gold-100 bg-[#FCF9F6] p-4 sm:p-6 space-y-6">
                        
                        {/* Live visual milestone tracker (Step visualizer) */}
                        {order.status !== "Cancelled" && (
                          <div className="py-2.5">
                            <h4 className="text-[10px] uppercase tracking-widest text-neutral-400 mb-6 font-semibold">
                              Consignment Delivery Milestone Tracker
                            </h4>
                            
                            <div className="relative flex items-center justify-between">
                              {/* Horizontal track line */}
                              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-neutral-200 -translate-y-1/2 z-0" />
                              <div 
                                className="absolute left-0 top-1/2 h-0.5 bg-gold-400 -translate-y-1/2 z-0 transition-all duration-500" 
                                style={{ width: `${((activeStep - 1) / 3) * 100}%` }}
                              />

                              {/* Milestones */}
                              {[
                                { label: "Logged", icon: Clock },
                                { label: "Under Artisan Selection", icon: Package },
                                { label: "Dispatched (Himalaya Air)", icon: Truck },
                                { label: "Delivered & Signed", icon: CheckCircle2 }
                              ].map((step, idx) => {
                                const stepNum = idx + 1;
                                const isDone = activeStep >= stepNum;
                                const isCurrent = activeStep === stepNum;
                                const Icon = step.icon;

                                return (
                                  <div key={step.label} className="relative z-10 flex flex-col items-center">
                                    <div className={`h-8 w-8 rounded-full border flex items-center justify-center transition-all ${
                                      isDone ? "bg-neutral-950 border-gold-400 text-gold-300 shadow-md" : "bg-white border-neutral-200 text-neutral-400"
                                    } ${isCurrent ? "ring-2 ring-gold-400 ring-offset-2 animate-pulse" : ""}`}>
                                      <Icon className="h-4 w-4" />
                                    </div>
                                    <span className={`text-[9px] uppercase tracking-wider mt-2 text-center font-medium max-w-[80px] sm:max-w-none ${
                                      isDone ? "text-neutral-900 font-semibold" : "text-neutral-400"
                                    }`}>
                                      {step.label}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>

                            {order.trackingNumber && (
                              <div className="mt-6 p-2 bg-white border border-gold-200 rounded-sm inline-block text-[10px] font-mono">
                                Airway Bill (AWB) Consignment Tracking No: <span className="font-bold text-neutral-900">{order.trackingNumber}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Items in the order */}
                        <div className="border-t border-neutral-100 pt-4">
                          <h4 className="text-[10px] uppercase tracking-widest text-neutral-400 mb-3 font-semibold">
                            Included Heirlooms
                          </h4>
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div key={item.productId} className="flex items-center justify-between bg-white p-2.5 border border-gold-100 rounded-sm">
                                <div className="flex items-center space-x-3">
                                  <img src={item.image} alt={item.productName} className="h-10 w-10 object-cover" />
                                  <div>
                                    <p className="text-xs font-semibold text-neutral-900">{item.productName}</p>
                                    <p className="text-[9px] text-neutral-400 font-mono">{item.category}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-xs font-semibold text-neutral-900">${item.price.toLocaleString()} <span className="text-[10px] text-neutral-400 font-mono">x{item.quantity}</span></p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Billing and Shipping summary */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-100 text-[11px] text-neutral-600 font-light">
                          <div>
                            <p className="font-semibold text-neutral-800 uppercase tracking-wide mb-1">Shipping Coordinates</p>
                            <p>{order.shippingAddress.fullName}</p>
                            <p>{order.shippingAddress.addressLine1}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                            <p>{order.shippingAddress.country} | Ph: {order.shippingAddress.phone}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-neutral-800 uppercase tracking-wide mb-1">Financial Coordinates</p>
                            <p className="flex items-center space-x-1">
                              <CreditCard className="h-3.5 w-3.5 text-gold-600" />
                              <span>{order.paymentMethod}</span>
                            </p>
                            <p>Premium Cargo: {order.shipping === 0 ? "Complimentary Royal Freight" : `$${order.shipping}`}</p>
                            <p>Direct Heritage Valuation total: <strong className="text-neutral-900 font-bold">${order.total.toLocaleString()} USD</strong></p>
                          </div>
                        </div>

                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Default Shipping Address Config (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-white border border-gold-200 p-6 rounded-sm shadow-sm">
          <div className="border-b border-gold-100 pb-3 mb-4 flex items-center space-x-2">
            <MapPin className="h-4.5 w-4.5 text-gold-500" />
            <h2 className="font-luxury-display text-sm uppercase tracking-widest font-bold text-neutral-950">
              Default Delivery Coordinates
            </h2>
          </div>

          <form onSubmit={handleSaveAddress} className="space-y-4">
            <div>
              <label className="block text-[9px] uppercase tracking-wider text-neutral-500 mb-1">Default Consignee Full Name</label>
              <input
                required
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full text-xs p-2.5 border border-gold-200 outline-none rounded-sm bg-[#FCF9F6] focus:border-gold-500 font-light"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-wider text-neutral-500 mb-1">Street Address Line 1</label>
              <input
                required
                type="text"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                className="w-full text-xs p-2.5 border border-gold-200 outline-none rounded-sm bg-[#FCF9F6] focus:border-gold-500 font-light"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-wider text-neutral-500 mb-1">Street Address Line 2 (Optional)</label>
              <input
                type="text"
                placeholder="Apartment, Suite, Unit"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                className="w-full text-xs p-2.5 border border-gold-200 outline-none rounded-sm bg-[#FCF9F6] focus:border-gold-500 font-light"
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
                  className="w-full text-xs p-2.5 border border-gold-200 outline-none rounded-sm bg-[#FCF9F6] focus:border-gold-500 font-light"
                />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-wider text-neutral-500 mb-1">State / Region</label>
                <input
                  required
                  type="text"
                  value={stateRegion}
                  onChange={(e) => setStateRegion(e.target.value)}
                  className="w-full text-xs p-2.5 border border-gold-200 outline-none rounded-sm bg-[#FCF9F6] focus:border-gold-500 font-light"
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
                  className="w-full text-xs p-2.5 border border-gold-200 outline-none rounded-sm bg-[#FCF9F6] focus:border-gold-500 font-light"
                />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-wider text-neutral-500 mb-1">Country</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full text-xs p-2.5 border border-gold-200 outline-none rounded-sm bg-[#FCF9F6] focus:border-gold-500 font-medium"
                >
                  {["United States", "United Kingdom", "Canada", "France", "Germany", "Japan", "Switzerland", "India", "Saudi Arabia", "UAE"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-wider text-neutral-500 mb-1">Contact Telephone</label>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs p-2.5 border border-gold-200 outline-none rounded-sm bg-[#FCF9F6] focus:border-gold-500 font-light"
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-3 bg-neutral-950 hover:bg-gold-500 text-gold-300 hover:text-neutral-950 text-xs tracking-widest uppercase font-semibold transition-all rounded-sm cursor-pointer border border-gold-400"
            >
              {isSaving ? "Synchronising..." : "Seal Delivery Coordinates"}
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
