import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { getAllUsers } from "../lib/firebaseService";
import { UserProfile, Order, Product } from "../types";
import { Landmark, ShoppingBag, Users, Coins, Plus, Edit, RefreshCw, Truck, Check, HelpCircle } from "lucide-react";

export const AdminDashboard: React.FC = () => {
  const { 
    currentUser, 
    products, 
    allOrders, 
    changeOrderStatus, 
    reloadProducts,
    showAlert 
  } = useApp();

  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [activeTab, setActiveTab] = useState<"stats" | "orders" | "stocks" | "customers">("stats");
  const [editingStockProdId, setEditingStockProdId] = useState<string | null>(null);
  const [stockInput, setStockInput] = useState<number>(0);
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({});

  // Fetch users list
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const u = await getAllUsers();
        setUsersList(u);
      } catch (e) {
        console.error(e);
      }
    };
    fetchUsers();
  }, [allOrders]);

  if (!currentUser?.isAdmin) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="font-luxury-display text-xl uppercase tracking-widest text-red-700">Access Violation</h2>
        <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto">
          This system terminal is restricted to official Kashmiri Heritage Directors. Your credentials do not possess matching security tokens.
        </p>
      </div>
    );
  }

  // Stats Calculations
  const completedOrders = allOrders.filter((o) => o.status !== "Cancelled");
  const totalRevenue = completedOrders.reduce((acc, o) => acc + o.total, 0);
  const pendingCount = allOrders.filter((o) => o.status === "Pending").length;
  const averageOrderValue = completedOrders.length > 0 ? Math.round(totalRevenue / completedOrders.length) : 0;

  const handleUpdateStockSubmit = async (prodId: string) => {
    if (stockInput < 0) {
      showAlert("Stock count cannot be negative.", "error");
      return;
    }
    try {
      // Direct call to update database
      const { updateProductStock } = await import("../lib/firebaseService");
      
      // Calculate diff to subtract
      const currentProd = products.find((p) => p.id === prodId);
      if (currentProd) {
        const currentStock = currentProd.stock;
        const diff = currentStock - stockInput;
        await updateProductStock(prodId, diff); // updates both local and cloud
        await reloadProducts();
        showAlert("Master stock registry updated successfully.", "success");
        setEditingStockProdId(null);
      }
    } catch (e) {
      console.error(e);
      showAlert("Failed to update stock.", "error");
    }
  };

  const handleStatusChangeSubmit = async (orderId: string, status: Order["status"]) => {
    const trk = trackingInputs[orderId] || "";
    await changeOrderStatus(orderId, status, trk);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
      
      {/* Title */}
      <div className="border-b border-gold-200 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-gold-600 font-luxury-display text-xs tracking-[0.3em] uppercase block mb-1">
            Director Control Centre
          </span>
          <h1 className="text-2xl sm:text-3xl font-luxury-display tracking-widest uppercase font-medium text-neutral-950 flex items-center space-x-3">
            <Landmark className="h-7 w-7 text-gold-500" />
            <span>ZIRYAAT KASH REGISTRY</span>
          </h1>
        </div>

        {/* Sync trigger button */}
        <div>
          <button
            onClick={() => { reloadProducts(); showAlert("Director registry database refreshed.", "success"); }}
            className="px-4 py-2 border border-gold-200 bg-white hover:bg-gold-50 text-neutral-800 text-[10px] tracking-widest uppercase font-semibold transition-colors flex items-center space-x-2 rounded-sm cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Refresh Databases</span>
          </button>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-gold-100 mb-8 overflow-x-auto space-x-6 text-xs uppercase tracking-widest font-semibold pb-1 text-neutral-500">
        {[
          { id: "stats", label: "Financial Metrics", icon: Coins },
          { id: "orders", label: `Order Consignments (${allOrders.length})`, icon: ShoppingBag },
          { id: "stocks", label: "Archive Stock Registry", icon: Truck },
          { id: "customers", label: `Patrons Circle (${usersList.length})`, icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 pb-3 cursor-pointer border-b-2 transition-all ${
                activeTab === tab.id 
                  ? "text-gold-600 border-gold-500 font-bold" 
                  : "border-transparent text-neutral-500 hover:text-neutral-800"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: STATS */}
      {activeTab === "stats" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Card stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white border border-gold-200 p-5 rounded-sm shadow-sm flex items-center space-x-4">
              <div className="h-12 w-12 bg-gold-50 text-gold-600 flex items-center justify-center rounded-sm">
                <Coins className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-medium">Total Heritage Sales</p>
                <p className="text-xl sm:text-2xl font-luxury-display font-bold text-neutral-950">${totalRevenue.toLocaleString()}</p>
                <p className="text-[9px] text-neutral-400 font-mono">USD Duty-Free</p>
              </div>
            </div>

            <div className="bg-white border border-gold-200 p-5 rounded-sm shadow-sm flex items-center space-x-4">
              <div className="h-12 w-12 bg-gold-50 text-gold-600 flex items-center justify-center rounded-sm">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-medium">Consignments Logged</p>
                <p className="text-xl sm:text-2xl font-luxury-display font-bold text-neutral-950">{allOrders.length}</p>
                <p className="text-[9px] text-gold-600 font-mono uppercase font-bold">{pendingCount} Pending Approval</p>
              </div>
            </div>

            <div className="bg-white border border-gold-200 p-5 rounded-sm shadow-sm flex items-center space-x-4">
              <div className="h-12 w-12 bg-gold-50 text-gold-600 flex items-center justify-center rounded-sm">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-medium">Registered Patrons</p>
                <p className="text-xl sm:text-2xl font-luxury-display font-bold text-neutral-950">{usersList.length}</p>
                <p className="text-[9px] text-neutral-400 font-mono">Members Registered</p>
              </div>
            </div>

            <div className="bg-white border border-gold-200 p-5 rounded-sm shadow-sm flex items-center space-x-4">
              <div className="h-12 w-12 bg-gold-50 text-gold-600 flex items-center justify-center rounded-sm">
                <Landmark className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-medium">Average Order Valuation</p>
                <p className="text-xl sm:text-2xl font-luxury-display font-bold text-neutral-950">${averageOrderValue.toLocaleString()}</p>
                <p className="text-[9px] text-neutral-400 font-mono">Luxury items average</p>
              </div>
            </div>

          </div>

          {/* Quick Ledger breakdown list */}
          <div className="bg-white border border-gold-200 p-6 rounded-sm">
            <h3 className="font-luxury-display text-sm uppercase tracking-widest font-bold text-neutral-900 mb-4 pb-2 border-b border-gold-100">
              Live Heritage Consignment Ledger
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-neutral-50 font-mono text-neutral-500 uppercase tracking-wider text-[10px] border-b border-neutral-200">
                    <th className="p-3">Order Number</th>
                    <th className="p-3">Patron Email</th>
                    <th className="p-3">Total Value</th>
                    <th className="p-3">Order Status</th>
                    <th className="p-3">Placed Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {allOrders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-50/50">
                      <td className="p-3 font-semibold font-mono text-neutral-800">{order.orderNumber}</td>
                      <td className="p-3 text-neutral-600 font-light">{order.shippingAddress.fullName}</td>
                      <td className="p-3 font-semibold font-luxury-display text-neutral-900">${order.total.toLocaleString()}</td>
                      <td className="p-3">
                        <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                          order.status === "Delivered" ? "bg-emerald-50 text-emerald-800 border border-emerald-100" :
                          order.status === "Cancelled" ? "bg-red-50 text-red-800 border border-red-100" :
                          "bg-gold-50 text-gold-800 border border-gold-200"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-3 text-neutral-400 font-light">{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: ORDERS */}
      {activeTab === "orders" && (
        <div className="space-y-6 animate-fadeIn">
          {allOrders.length === 0 ? (
            <p className="text-xs text-neutral-400 italic">No orders logged in registry ledger yet.</p>
          ) : (
            <div className="space-y-4">
              {allOrders.map((order) => (
                <div key={order.id} className="border border-gold-200 bg-white p-5 rounded-sm shadow-sm space-y-4">
                  
                  {/* Order metadata line */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gold-100 pb-3 gap-2">
                    <div>
                      <p className="font-mono text-xs text-neutral-800 font-bold">{order.orderNumber}</p>
                      <p className="text-[10px] text-neutral-400 font-light uppercase">
                        Placed by {order.shippingAddress.fullName} ({order.shippingAddress.country}) | {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-neutral-400 uppercase block">Total Value</span>
                      <strong className="font-luxury-display text-sm font-semibold text-neutral-950">${order.total.toLocaleString()} USD</strong>
                    </div>
                  </div>

                  {/* Order contents summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    
                    {/* Left details */}
                    <div className="space-y-2">
                      <h4 className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Included Heirlooms</h4>
                      <div className="space-y-1.5 max-h-[150px] overflow-y-auto pr-2">
                        {order.items.map((item) => (
                          <div key={item.productId} className="flex justify-between items-center bg-neutral-50 p-2 border border-neutral-100 rounded-sm text-xs text-neutral-800">
                            <span className="font-semibold truncate max-w-[200px]">{item.productName} <span className="text-neutral-400 text-[10px] font-mono">x{item.quantity}</span></span>
                            <span className="font-medium font-luxury-display text-neutral-900">${(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right update status panel */}
                    <div className="bg-[#FCF9F6] border border-gold-200 p-4 rounded-sm space-y-3 text-xs">
                      <h4 className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 border-b border-gold-100 pb-1 mb-2">Registry Consignment Controls</h4>
                      
                      {/* Tracking number input */}
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider text-neutral-500 mb-1">Himalaya Cargo Airway Bill (AWB) No.</label>
                        <input
                          type="text"
                          placeholder="AWB90021-X3"
                          value={trackingInputs[order.id] || order.trackingNumber || ""}
                          onChange={(e) => setTrackingInputs({ ...trackingInputs, [order.id]: e.target.value })}
                          className="w-full text-xs p-2 border border-gold-200 outline-none rounded-sm bg-white"
                        />
                      </div>

                      {/* Status quick select buttons */}
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider text-neutral-500 mb-1.5">Set Status</label>
                        <div className="grid grid-cols-5 gap-1 text-[9px] text-center uppercase font-bold">
                          {(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"] as const).map((st) => (
                            <button
                              key={st}
                              type="button"
                              onClick={() => handleStatusChangeSubmit(order.id, st)}
                              className={`py-1.5 border rounded-sm transition-all cursor-pointer ${
                                order.status === st 
                                  ? "bg-neutral-950 text-gold-300 border-gold-400 font-bold" 
                                  : "bg-white text-neutral-600 border-neutral-200 hover:border-gold-300"
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: STOCKS */}
      {activeTab === "stocks" && (
        <div className="bg-white border border-gold-200 p-6 rounded-sm animate-fadeIn">
          <div className="flex items-center justify-between border-b border-gold-100 pb-3 mb-6">
            <h3 className="font-luxury-display text-sm uppercase tracking-widest font-bold text-neutral-900">
              Heritage Archive Stocks
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-50 font-mono text-neutral-500 uppercase tracking-wider text-[10px] border-b border-neutral-200">
                  <th className="p-3">Artisan Collectible</th>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Base Value</th>
                  <th className="p-3">Active Stock count</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {products.map((prod) => {
                  const isEditing = editingStockProdId === prod.id;
                  return (
                    <tr key={prod.id} className="hover:bg-neutral-50/50">
                      
                      {/* Name & Thumb */}
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          <img src={prod.images[0]} alt={prod.name} className="h-10 w-10 object-cover border border-neutral-200" />
                          <div>
                            <p className="font-semibold text-neutral-900 truncate max-w-[200px]">{prod.name}</p>
                            <p className="text-[10px] text-neutral-400">By {prod.artisan.name}</p>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="p-3 font-mono text-neutral-600 font-medium">{prod.sku}</td>
                      
                      {/* Category */}
                      <td className="p-3 uppercase tracking-wider text-[9px] font-bold text-gold-700">{prod.category}</td>
                      
                      {/* Price */}
                      <td className="p-3 font-semibold font-luxury-display text-neutral-900">${prod.price.toLocaleString()}</td>
                      
                      {/* Stock Column */}
                      <td className="p-3">
                        {isEditing ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              value={stockInput}
                              onChange={(e) => setStockInput(Number(e.target.value))}
                              className="w-16 p-1.5 text-xs border border-gold-300 outline-none rounded-sm"
                              min="0"
                            />
                            <button
                              onClick={() => handleUpdateStockSubmit(prod.id)}
                              className="p-1.5 bg-emerald-600 text-white rounded-sm hover:bg-emerald-700 transition-colors cursor-pointer"
                              aria-label="Confirm stock edit"
                            >
                              <Check className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : (
                          <span className={`inline-block font-mono font-semibold px-2.5 py-0.5 rounded-sm ${
                            prod.stock === 0 ? "bg-red-50 text-red-700 border border-red-100 font-bold animate-pulse" :
                            prod.stock <= 3 ? "bg-gold-50 text-gold-700 border border-gold-200" :
                            "bg-neutral-100 text-neutral-800"
                          }`}>
                            {prod.stock} Units
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="p-3 text-right">
                        {isEditing ? (
                          <button
                            onClick={() => setEditingStockProdId(null)}
                            className="text-neutral-400 hover:text-neutral-700 text-[10px] uppercase font-bold"
                          >
                            Cancel
                          </button>
                        ) : (
                          <button
                            onClick={() => { setEditingStockProdId(prod.id); setStockInput(prod.stock); }}
                            className="text-gold-600 hover:text-gold-700 hover:underline flex items-center space-x-1 ml-auto text-[11px] uppercase tracking-wider font-semibold cursor-pointer"
                          >
                            <Edit className="h-3 w-3" />
                            <span>Edit Stock</span>
                          </button>
                        )}
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: CUSTOMERS */}
      {activeTab === "customers" && (
        <div className="bg-white border border-gold-200 p-6 rounded-sm animate-fadeIn">
          <h3 className="font-luxury-display text-sm uppercase tracking-widest font-bold text-neutral-900 border-b border-gold-100 pb-3 mb-6">
            Patrons Circle Registry
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-50 font-mono text-neutral-500 uppercase tracking-wider text-[10px] border-b border-neutral-200">
                  <th className="p-3">Patron Name</th>
                  <th className="p-3">Email Coordinates</th>
                  <th className="p-3">Phone Line</th>
                  <th className="p-3">Registered Country</th>
                  <th className="p-3">Account Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {usersList.map((user) => (
                  <tr key={user.uid} className="hover:bg-neutral-50/50">
                    <td className="p-3 font-semibold text-neutral-900">{user.displayName}</td>
                    <td className="p-3 text-neutral-600 font-mono">{user.email}</td>
                    <td className="p-3 text-neutral-500">{user.phone || "No phone logged"}</td>
                    <td className="p-3 text-neutral-500 font-light">{user.address?.country || "United States (Default)"}</td>
                    <td className="p-3">
                      <span className={`inline-block text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm ${
                        user.isAdmin ? "bg-red-50 text-red-800 border border-red-100" : "bg-neutral-100 text-neutral-700"
                      }`}>
                        {user.isAdmin ? "Director" : "Heritage Member"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
