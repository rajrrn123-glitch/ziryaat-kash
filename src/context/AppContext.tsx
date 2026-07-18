import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem, Order, UserProfile, Review, Coupon, BlogArticle } from "../types";
import { translations } from "../lib/translations";
import { 
  getProducts as fetchDbProducts,
  getOrders as fetchDbUserOrders,
  getAllOrders as fetchDbAllOrders,
  createOrder as saveDbOrder,
  updateOrderStatus as updateDbOrderStatus,
  getUserProfile,
  saveUserProfile,
  loginWithGoogle as googleAuth,
  registerWithEmail as emailRegister,
  loginWithEmail as emailLogin,
  isCloudActive,
  auth
} from "../lib/firebaseService";

interface AppContextType {
  // Navigation
  activeView: "home" | "products" | "profile" | "admin" | "contact" | "blog";
  setActiveView: (view: "home" | "products" | "profile" | "admin" | "contact" | "blog") => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;

  // Language Translation
  language: "en" | "hi";
  setLanguage: (lang: "en" | "hi") => void;
  t: (key: string) => string;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCouponCode: (code: string) => boolean;
  removeCouponCode: () => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (id: string) => void;

  // Products
  products: Product[];
  isLoadingProducts: boolean;
  reloadProducts: () => Promise<void>;
  submitReview: (productId: string, rating: number, comment: string) => Promise<void>;

  // Filters
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  sortBy: "featured" | "price-asc" | "price-desc" | "rating";
  setSortBy: (sort: "featured" | "price-asc" | "price-desc" | "rating") => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: string) => void;
  removeFromCart: (productId: string, variant?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // User Auth & Session
  currentUser: UserProfile | null;
  isUserLoading: boolean;
  loginGoogle: () => Promise<void>;
  loginEmail: (email: string) => Promise<boolean>;
  registerEmail: (email: string, name: string) => Promise<void>;
  logoutUser: () => void;
  updateUserAddress: (address: UserProfile["address"], phone: string) => Promise<void>;

  // Orders
  userOrders: Order[];
  allOrders: Order[];
  isLoadingOrders: boolean;
  checkoutCart: (
    shippingAddress: Order["shippingAddress"], 
    paymentMethod: Order["paymentMethod"],
    gstInfo?: Order["gstInfo"],
    shiprocketInfo?: Order["shiprocketInfo"]
  ) => Promise<Order>;
  changeOrderStatus: (orderId: string, status: Order["status"], trackingNumber?: string) => Promise<void>;

  // Status message
  alert: { message: string; type: "success" | "error" | "info" } | null;
  showAlert: (message: string, type?: "success" | "error" | "info") => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activeView, setActiveView] = useState<"home" | "products" | "profile" | "admin" | "contact" | "blog">("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Language Support
  const [language, setLanguageState] = useState<"en" | "hi">(() => {
    const saved = localStorage.getItem("ziryaat_kash_language");
    return (saved === "en" || saved === "hi") ? saved : "en";
  });
  const setLanguage = (lang: "en" | "hi") => {
    setLanguageState(lang);
    localStorage.setItem("ziryaat_kash_language", lang);
  };
  const t = (key: string): string => {
    const dict = translations[language] || translations["en"];
    return (dict as any)[key] || key;
  };

  // Wishlist Support
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem("ziryaat_kash_wishlist");
    return saved ? JSON.parse(saved) : [];
  });
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const updated = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem("ziryaat_kash_wishlist", JSON.stringify(updated));
      return updated;
    });
    showAlert("Your saved items list has been updated.", "info");
  };
  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Coupon Operations
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem("ziryaat_kash_coupons");
    if (saved) return JSON.parse(saved);
    const initial: Coupon[] = [
      { id: "c-1", code: "KASHMIR10", discountType: "percentage", discountValue: 10, minPurchase: 200, status: "Active", expiryDate: "2026-12-31" },
      { id: "c-2", code: "RAUSHAN23", discountType: "percentage", discountValue: 23, minPurchase: 300, status: "Active", expiryDate: "2026-12-31" },
      { id: "c-3", code: "HERITAGE100", discountType: "fixed", discountValue: 100, minPurchase: 1000, status: "Active", expiryDate: "2026-12-31" },
    ];
    localStorage.setItem("ziryaat_kash_coupons", JSON.stringify(initial));
    return initial;
  });
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const applyCouponCode = (code: string): boolean => {
    const coupon = coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.status === "Active");
    if (!coupon) {
      showAlert("Invalid or inactive coupon code.", "error");
      return false;
    }
    if (coupon.minPurchase && cartTotal < coupon.minPurchase) {
      showAlert(`Minimum purchase of ${coupon.minPurchase} required for this coupon.`, "error");
      return false;
    }
    setAppliedCoupon(coupon);
    showAlert(`Coupon '${coupon.code}' applied successfully!`, "success");
    return true;
  };

  const removeCouponCode = () => {
    setAppliedCoupon(null);
    showAlert("Coupon removed.", "info");
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => {
      const updated = [...prev, coupon];
      localStorage.setItem("ziryaat_kash_coupons", JSON.stringify(updated));
      return updated;
    });
    showAlert("New premium coupon registered.", "success");
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      localStorage.setItem("ziryaat_kash_coupons", JSON.stringify(updated));
      return updated;
    });
    showAlert("Coupon removed from directory.", "info");
  };


  // Products & Filters
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);

  // User Auth
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  // Orders
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  // Alert State
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const showAlert = (message: string, type: "success" | "error" | "info" = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  // Load products on start
  const reloadProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const prods = await fetchDbProducts();
      setProducts(prods);
    } catch (e) {
      console.error(e);
      showAlert("Failed to load products. Running in backup mode.", "error");
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    reloadProducts();
  }, []);

  // Sync Auth State
  useEffect(() => {
    // Check local storage for persistent user sessions (to make the mock login robust)
    const storedUser = localStorage.getItem("ziryaat_kash_current_user");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch {
        // Ignore parsing errors
      }
    }
    setIsUserLoading(false);

    // If real Firebase Auth was initialized, we can attach listener
    if (isCloudActive && auth) {
      const unsub = auth.onAuthStateChanged(async (fbUser: any) => {
        if (fbUser) {
          try {
            const profile = await getUserProfile(fbUser.uid);
            if (profile) {
              setCurrentUser(profile);
              localStorage.setItem("ziryaat_kash_current_user", JSON.stringify(profile));
            }
          } catch (e) {
            console.error("Auth state profile fetch failed", e);
          }
        }
      });
      return () => unsub();
    }
  }, []);

  // Load orders when user changes or admin page is visited
  const loadUserOrders = async (userId: string) => {
    setIsLoadingOrders(true);
    try {
      const orders = await fetchDbUserOrders(userId);
      setUserOrders(orders);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const loadAllAdminOrders = async () => {
    if (!currentUser?.isAdmin) return;
    setIsLoadingOrders(true);
    try {
      const orders = await fetchDbAllOrders();
      setAllOrders(orders);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadUserOrders(currentUser.uid);
      if (currentUser.isAdmin) {
        loadAllAdminOrders();
      }
    } else {
      setUserOrders([]);
      setAllOrders([]);
    }
  }, [currentUser]);

  // Auth Operations
  const loginGoogle = async () => {
    setIsUserLoading(true);
    try {
      const profile = await googleAuth();
      setCurrentUser(profile);
      localStorage.setItem("ziryaat_kash_current_user", JSON.stringify(profile));
      showAlert(`Welcome back, ${profile.displayName}.`, "success");
    } catch (e: any) {
      console.error(e);
      showAlert("Google Sign In failed.", "error");
    } finally {
      setIsUserLoading(false);
    }
  };

  const loginEmail = async (email: string): Promise<boolean> => {
    setIsUserLoading(true);
    try {
      const profile = await emailLogin(email);
      if (profile) {
        setCurrentUser(profile);
        localStorage.setItem("ziryaat_kash_current_user", JSON.stringify(profile));
        showAlert(`Welcome to Ziryaat Kash, ${profile.displayName}.`, "success");
        return true;
      } else {
        showAlert("No heritage profile associated with this email. Please register.", "info");
        return false;
      }
    } catch (e) {
      console.error(e);
      showAlert("Login failed.", "error");
      return false;
    } finally {
      setIsUserLoading(false);
    }
  };

  const registerEmail = async (email: string, name: string) => {
    setIsUserLoading(true);
    try {
      const profile = await emailRegister(email, name);
      setCurrentUser(profile);
      localStorage.setItem("ziryaat_kash_current_user", JSON.stringify(profile));
      showAlert(`Heritage account created. Welcome ${name}!`, "success");
    } catch (e) {
      console.error(e);
      showAlert("Registration failed.", "error");
    } finally {
      setIsUserLoading(false);
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("ziryaat_kash_current_user");
    showAlert("You have logged out of your session.", "info");
    setActiveView("home");
  };

  const updateUserAddress = async (address: UserProfile["address"], phone: string) => {
    if (!currentUser) return;
    try {
      const updatedProfile = { ...currentUser, address, phone };
      await saveUserProfile(updatedProfile);
      setCurrentUser(updatedProfile);
      localStorage.setItem("ziryaat_kash_current_user", JSON.stringify(updatedProfile));
      showAlert("Your royal shipping coordinates have been updated.", "success");
    } catch (e) {
      console.error(e);
      showAlert("Failed to update profile details.", "error");
    }
  };

  // Cart Operations
  const addToCart = (product: Product, quantity = 1, variant?: string) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.variant === variant
      );
      if (existingIdx !== -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        showAlert(`Added extra ${product.name} to your collection.`, "success");
        return updated;
      }
      showAlert(`Added ${product.name} to your cart.`, "success");
      return [...prev, { product, quantity, variant }];
    });
  };

  const removeFromCart = (productId: string, variant?: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.variant === variant)));
    showAlert("Item removed from cart.", "info");
  };

  const updateCartQuantity = (productId: string, quantity: number, variant?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variant);
      return;
    }
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === productId && item.variant === variant
      );
      if (existingIdx !== -1) {
        const updated = [...prev];
        updated[existingIdx].quantity = quantity;
        return updated;
      }
      return prev;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Reviews
  const submitReview = async (productId: string, rating: number, comment: string) => {
    if (!currentUser) {
      showAlert("Please log in to submit an artisan review.", "error");
      return;
    }
    const newReview: Review = {
      id: "rev-" + Math.random().toString(36).substring(2, 9),
      userName: currentUser.displayName,
      rating,
      comment,
      date: new Date().toISOString().split("T")[0],
      verified: true
    };
    try {
      await fetchDbProducts(); // trigger standard connect
      await import("../lib/firebaseService").then((service) => service.addReview(productId, newReview));
      reloadProducts();
      showAlert("Thank you for your authentic review. It helps our artisans.", "success");
    } catch (e) {
      console.error(e);
      showAlert("Failed to post review.", "error");
    }
  };

  // Checkout
  const checkoutCart = async (shippingAddress: Order["shippingAddress"], paymentMethod: Order["paymentMethod"]): Promise<Order> => {
    if (!currentUser) {
      throw new Error("Login is required to complete purchase");
    }

    const orderNumber = `ZK-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const items = cart.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.images[0],
      category: item.product.category,
    }));

    const subtotal = cartTotal;
    const shipping = subtotal > 500 ? 0 : 50; // Free luxury delivery for premium purchases
    const tax = Math.round(subtotal * 0.08);
    const total = subtotal + shipping + tax;

    const newOrder: Order = {
      id: "ord-" + Math.random().toString(36).substring(2, 9),
      orderNumber,
      userId: currentUser.uid,
      items,
      subtotal,
      shipping,
      tax,
      total,
      status: "Pending",
      shippingAddress,
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    try {
      await saveDbOrder(newOrder);
      // Clean cart
      setCart([]);
      // Reload states
      reloadProducts();
      loadUserOrders(currentUser.uid);
      showAlert("Your order has been registered. Welcome to Ziryaat Kash lineage.", "success");
      return newOrder;
    } catch (e) {
      console.error(e);
      showAlert("Checkout failure.", "error");
      throw e;
    }
  };

  const changeOrderStatus = async (orderId: string, status: Order["status"], trackingNumber?: string) => {
    try {
      await updateDbOrderStatus(orderId, status, trackingNumber);
      showAlert(`Order ${orderId} status set to ${status}`, "success");
      if (currentUser) {
        loadUserOrders(currentUser.uid);
        if (currentUser.isAdmin) {
          loadAllAdminOrders();
        }
      }
    } catch (e) {
      console.error(e);
      showAlert("Failed to update order status.", "error");
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedCategory,
        setSelectedCategory,
        selectedProduct,
        setSelectedProduct,
        products,
        isLoadingProducts,
        reloadProducts,
        submitReview,
        searchKeyword,
        setSearchKeyword,
        maxPrice,
        setMaxPrice,
        sortBy,
        setSortBy,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        currentUser,
        isUserLoading,
        loginGoogle,
        loginEmail,
        registerEmail,
        logoutUser,
        updateUserAddress,
        userOrders,
        allOrders,
        isLoadingOrders,
        checkoutCart,
        changeOrderStatus,
        alert,
        showAlert,
        language,
        setLanguage,
        t,
        wishlist,
        toggleWishlist,
        isInWishlist,
        coupons,
        appliedCoupon,
        applyCouponCode,
        removeCouponCode,
        addCoupon,
        deleteCoupon,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used inside an AppProvider");
  }
  return context;
};
