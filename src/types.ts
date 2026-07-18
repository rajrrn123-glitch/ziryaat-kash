export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface AuthenticityCertificate {
  certificateNo: string;
  giTagged: boolean;
  testingLab: string;
  threadCount?: string; // For Pashmina
  crocinLevel?: string; // For Saffron
  moistureLevel?: string; // For Dry Fruits
  purityGrade?: string; // For Crafts
  materialSource?: string; // For Leather
  woodType?: string; // For Home Decor
  artisanSignature: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: "Pashmina Shawls" | "Saffron" | "Dry Fruits" | "Handicrafts" | "Leather Bags" | "Home Decor";
  description: string;
  price: number;
  rating: number;
  stock: number;
  images: string[];
  specs: Record<string, string>;
  artisan: {
    name: string;
    village: string;
    experience: string;
    story: string;
    avatar: string;
  };
  certificate: AuthenticityCertificate;
  reviews: Review[];
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    image: string;
    category: string;
  }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: "Razorpay" | "UPI" | "PhonePe" | "Google Pay" | "COD";
  gstInfo?: {
    gstin: string;
    companyName: string;
    cgst: number;
    sgst: number;
    igst: number;
  };
  shiprocketInfo?: {
    carrier: string;
    trackingId: string;
    status: string;
    estDelivery: string;
    cost: number;
  };
  trackingNumber?: string;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase?: number;
  status: "Active" | "Inactive";
  expiryDate: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: string;
  publishedDate: string;
  category: string;
  author: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}


export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
  address?: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  isAdmin?: boolean;
  createdAt: string;
}
