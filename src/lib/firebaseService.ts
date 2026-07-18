import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut as fbSignOut, User as FBUser } from "firebase/auth";
import { getFirestore, doc, collection, getDoc, getDocs, setDoc, updateDoc, addDoc, query, where, getDocFromServer } from "firebase/firestore";
import firebaseConfig from "../firebase-applet-config.json";
import { Product, Order, UserProfile, Review } from "../types";
import { kashmiriProducts } from "../data/products";

// Operation types for handling firestore errors according to guidelines
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

// Global flag to determine if Firebase is in active cloud mode or offline sandbox mode
let isCloudActive = false;
let app;
let auth: any = null;
let db: any = null;

try {
  // Check if it's a dummy or if we can initialize
  const isDummy = firebaseConfig.apiKey.includes("Dummy");
  if (!isDummy) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    isCloudActive = true;
  }
} catch (e) {
  console.warn("Firebase failed to initialize. Falling back to premium local-first sandboxed mode.", e);
  isCloudActive = false;
}

export { auth, db, isCloudActive };

// Firestore error handler conforming to Phase 3/Eight Pillars
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const currentFBUser = auth?.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentFBUser?.uid || null,
      email: currentFBUser?.email || null,
      emailVerified: currentFBUser?.emailVerified || null,
      isAnonymous: currentFBUser?.isAnonymous || null,
    },
    operationType,
    path,
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// ----------------------------------------------------------------------
// LOCAL STORAGE ENGINE (for offline sandboxed mode and demo reliability)
// ----------------------------------------------------------------------

const LOCAL_PRODUCTS_KEY = "ziryaat_kash_products";
const LOCAL_ORDERS_KEY = "ziryaat_kash_orders";
const LOCAL_USERS_KEY = "ziryaat_kash_users";
const CURRENT_USER_KEY = "ziryaat_kash_current_user";

function getLocalData<T>(key: string, defaultValue: T): T {
  const data = localStorage.getItem(key);
  if (!data) return defaultValue;
  try {
    return JSON.parse(data);
  } catch {
    return defaultValue;
  }
}

function setLocalData<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// Initialize Local Storage
if (!localStorage.getItem(LOCAL_PRODUCTS_KEY)) {
  setLocalData(LOCAL_PRODUCTS_KEY, kashmiriProducts);
}
if (!localStorage.getItem(LOCAL_USERS_KEY)) {
  // Create a default admin and a customer
  const defaultUsers: UserProfile[] = [
    {
      uid: "admin-uid-123",
      email: "rajrrn123@gmail.com",
      displayName: "Heritage Director",
      isAdmin: true,
      createdAt: new Date().toISOString(),
    },
    {
      uid: "customer-uid-123",
      email: "buyer@royalheritage.com",
      displayName: "Sir Evelyn Hastings",
      phone: "+44 7700 900077",
      address: {
        fullName: "Sir Evelyn Hastings",
        addressLine1: "14 Kensington Palace Gardens",
        city: "London",
        state: "Greater London",
        postalCode: "W8 4QP",
        country: "United Kingdom",
      },
      isAdmin: false,
      createdAt: new Date().toISOString(),
    }
  ];
  setLocalData(LOCAL_USERS_KEY, defaultUsers);
}
if (!localStorage.getItem(LOCAL_ORDERS_KEY)) {
  // Add some beautiful sample orders
  const sampleOrders: Order[] = [
    {
      id: "ord-90212",
      orderNumber: "ZK-2026-90212",
      userId: "customer-uid-123",
      items: [
        {
          productId: "pashmina-royal-shah-toshe",
          productName: "Royal Shah-Tosh Ring Pashmina Shawl",
          price: 1850,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=800",
          category: "Pashmina Shawls",
        },
        {
          productId: "saffron-pamport-premium",
          productName: "Pure Kashmiri Saffron (Grade A++)",
          price: 75,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800",
          category: "Saffron",
        }
      ],
      subtotal: 2000,
      shipping: 0,
      tax: 160,
      total: 2160,
      status: "Processing",
      shippingAddress: {
        fullName: "Sir Evelyn Hastings",
        addressLine1: "14 Kensington Palace Gardens",
        city: "London",
        state: "Greater London",
        postalCode: "W8 4QP",
        country: "United Kingdom",
        phone: "+44 7700 900077",
      },
      paymentMethod: "Credit Card",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    }
  ];
  setLocalData(LOCAL_ORDERS_KEY, sampleOrders);
}

// ----------------------------------------------------------------------
// DATABASE OPERATIONS (Dual Cloud / Sandboxed Support)
// ----------------------------------------------------------------------

export async function getProducts(): Promise<Product[]> {
  if (isCloudActive && db) {
    try {
      const q = collection(db, "products");
      const snap = await getDocs(q);
      const list: Product[] = [];
      snap.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() } as Product);
      });
      if (list.length > 0) return list;
    } catch (e) {
      console.error("Cloud Products Read Failed, falling back to local database.", e);
    }
  }
  return getLocalData<Product[]>(LOCAL_PRODUCTS_KEY, kashmiriProducts);
}

export async function addReview(productId: string, review: Review): Promise<void> {
  // Update local storage
  const products = getLocalData<Product[]>(LOCAL_PRODUCTS_KEY, kashmiriProducts);
  const pIdx = products.findIndex((p) => p.id === productId);
  if (pIdx !== -1) {
    products[pIdx].reviews = [review, ...products[pIdx].reviews];
    // Recompute average rating
    const totalRating = products[pIdx].reviews.reduce((acc, r) => acc + r.rating, 0);
    products[pIdx].rating = Number((totalRating / products[pIdx].reviews.length).toFixed(1));
    setLocalData(LOCAL_PRODUCTS_KEY, products);
  }

  if (isCloudActive && db) {
    const path = `products/${productId}`;
    try {
      const prodRef = doc(db, "products", productId);
      const docSnap = await getDoc(prodRef);
      if (docSnap.exists()) {
        const prodData = docSnap.data() as Product;
        const updatedReviews = [review, ...(prodData.reviews || [])];
        const totalRating = updatedReviews.reduce((acc, r) => acc + r.rating, 0);
        const newRating = Number((totalRating / updatedReviews.length).toFixed(1));
        await updateDoc(prodRef, {
          reviews: updatedReviews,
          rating: newRating
        });
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, path);
    }
  }
}

export async function updateProductStock(productId: string, quantitySold: number): Promise<void> {
  const products = getLocalData<Product[]>(LOCAL_PRODUCTS_KEY, kashmiriProducts);
  const pIdx = products.findIndex((p) => p.id === productId);
  if (pIdx !== -1) {
    products[pIdx].stock = Math.max(0, products[pIdx].stock - quantitySold);
    setLocalData(LOCAL_PRODUCTS_KEY, products);
  }

  if (isCloudActive && db) {
    const path = `products/${productId}`;
    try {
      const prodRef = doc(db, "products", productId);
      const docSnap = await getDoc(prodRef);
      if (docSnap.exists()) {
        const currentStock = docSnap.data().stock || 0;
        await updateDoc(prodRef, {
          stock: Math.max(0, currentStock - quantitySold)
        });
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, path);
    }
  }
}

export async function getOrders(userId: string): Promise<Order[]> {
  if (isCloudActive && db) {
    const path = "orders";
    try {
      const q = query(collection(db, "orders"), where("userId", "==", userId));
      const snap = await getDocs(q);
      const list: Order[] = [];
      snap.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() } as Order);
      });
      return list;
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, path);
    }
  }
  const allOrders = getLocalData<Order[]>(LOCAL_ORDERS_KEY, []);
  return allOrders.filter((o) => o.userId === userId);
}

export async function getAllOrders(): Promise<Order[]> {
  if (isCloudActive && db) {
    const path = "orders";
    try {
      const q = collection(db, "orders");
      const snap = await getDocs(q);
      const list: Order[] = [];
      snap.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() } as Order);
      });
      return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, path);
    }
  }
  const allOrders = getLocalData<Order[]>(LOCAL_ORDERS_KEY, []);
  return allOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function createOrder(order: Order): Promise<void> {
  // Save local
  const orders = getLocalData<Order[]>(LOCAL_ORDERS_KEY, []);
  orders.push(order);
  setLocalData(LOCAL_ORDERS_KEY, orders);

  // Decrement stocks
  for (const item of order.items) {
    await updateProductStock(item.productId, item.quantity);
  }

  if (isCloudActive && db) {
    const path = `orders/${order.id}`;
    try {
      await setDoc(doc(db, "orders", order.id), order);
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, path);
    }
  }
}

export async function updateOrderStatus(orderId: string, status: Order["status"], trackingNumber?: string): Promise<void> {
  const orders = getLocalData<Order[]>(LOCAL_ORDERS_KEY, []);
  const oIdx = orders.findIndex((o) => o.id === orderId);
  if (oIdx !== -1) {
    orders[oIdx].status = status;
    if (trackingNumber) orders[oIdx].trackingNumber = trackingNumber;
    setLocalData(LOCAL_ORDERS_KEY, orders);
  }

  if (isCloudActive && db) {
    const path = `orders/${orderId}`;
    try {
      const payload: Record<string, any> = { status };
      if (trackingNumber) payload.trackingNumber = trackingNumber;
      await updateDoc(doc(db, "orders", orderId), payload);
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, path);
    }
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (isCloudActive && db) {
    const path = `users/${uid}`;
    try {
      const docSnap = await getDoc(doc(db, "users", uid));
      if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, path);
    }
  }
  const users = getLocalData<UserProfile[]>(LOCAL_USERS_KEY, []);
  return users.find((u) => u.uid === uid) || null;
}

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  const users = getLocalData<UserProfile[]>(LOCAL_USERS_KEY, []);
  const uIdx = users.findIndex((u) => u.uid === profile.uid);
  if (uIdx !== -1) {
    users[uIdx] = { ...users[uIdx], ...profile };
  } else {
    users.push(profile);
  }
  setLocalData(LOCAL_USERS_KEY, users);

  if (isCloudActive && db) {
    const path = `users/${profile.uid}`;
    try {
      await setDoc(doc(db, "users", profile.uid), profile, { merge: true });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, path);
    }
  }
}

export async function getAllUsers(): Promise<UserProfile[]> {
  if (isCloudActive && db) {
    const path = "users";
    try {
      const q = collection(db, "users");
      const snap = await getDocs(q);
      const list: UserProfile[] = [];
      snap.forEach((docSnap) => {
        list.push(docSnap.data() as UserProfile);
      });
      return list;
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, path);
    }
  }
  return getLocalData<UserProfile[]>(LOCAL_USERS_KEY, []);
}

// ----------------------------------------------------------------------
// AUTHENTICATION UTILITIES
// ----------------------------------------------------------------------

export async function loginWithGoogle(): Promise<UserProfile> {
  if (isCloudActive && auth) {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const fbUser = result.user;
    
    // Check if profile exists, otherwise create it
    let profile = await getUserProfile(fbUser.uid);
    if (!profile) {
      const email = fbUser.email || "";
      // Bootstrapped Admin: user email from runtime is admin!
      const isAdmin = email.toLowerCase() === "rajrrn123@gmail.com";
      profile = {
        uid: fbUser.uid,
        email: email,
        displayName: fbUser.displayName || "Royal Guest",
        createdAt: new Date().toISOString(),
        isAdmin: isAdmin,
      };
      await saveUserProfile(profile);
    }
    return profile;
  } else {
    // In Sandboxed mode, simulate a luxurious Google Login for "rajrrn123@gmail.com"
    const profile: UserProfile = {
      uid: "google-sandbox-uid-999",
      email: "rajrrn123@gmail.com",
      displayName: "Raj RRN (Heritage Director)",
      isAdmin: true, // Bootstrapped Admin check
      createdAt: new Date().toISOString(),
    };
    await saveUserProfile(profile);
    return profile;
  }
}

export async function registerWithEmail(email: string, name: string): Promise<UserProfile> {
  // Generate random uid
  const uid = "mem-" + Math.random().toString(36).substring(2, 11);
  const isAdmin = email.toLowerCase() === "rajrrn123@gmail.com";
  const profile: UserProfile = {
    uid,
    email,
    displayName: name,
    isAdmin,
    createdAt: new Date().toISOString(),
  };
  await saveUserProfile(profile);
  return profile;
}

export async function loginWithEmail(email: string): Promise<UserProfile | null> {
  const users = getLocalData<UserProfile[]>(LOCAL_USERS_KEY, []);
  const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  return found || null;
}
