import { Product } from "../types";

export const kashmiriProducts: Product[] = [
  {
    id: "pashmina-royal-shah-toshe",
    name: "Royal Shah-Tosh Ring Pashmina Shawl",
    sku: "ZK-PS-001",
    category: "Pashmina Shawls",
    description: "The crown jewel of Kashmiri handloom. Hand-spun from 12-15 micron Changthangi cashmere, so fine that the entire 2-meter shawl can slide effortlessly through a wedding ring. Woven over 4 months by master weavers in Srinagar, finished with a classic border, symbolizing heritage elegance.",
    price: 1850,
    rating: 4.9,
    stock: 3,
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=800", // Cashmere scarf elegant
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Material": "100% Pure Changthangi Cashmere",
      "Weave Type": "Traditional Kashmiri Handloom",
      "Dimensions": "2.0 m x 1.0 m",
      "Weight": "Under 80 grams",
      "Care Instructions": "Dry Clean Only. Store in breathable muslin bag."
    },
    artisan: {
      name: "Ghulam Nabi Dar",
      village: "Kanihama, Kashmir",
      experience: "42 Years",
      story: "Ghulam belongs to the fifth generation of royal weavers. He began learning the delicate art of weaving at the age of 12 from his grandfather. 'To weave Pashmina is to hold a conversation with our ancestors. Each thread is a breath of the mountains,' he says.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    },
    certificate: {
      certificateNo: "ZK-GI-PS-89241",
      giTagged: true,
      testingLab: "Craft Development Institute (CDI), Srinagar",
      threadCount: "220 Count Handspun Weft/Warp",
      artisanSignature: "G. N. Dar"
    },
    featured: true,
    reviews: [
      {
        id: "rev-ps-1",
        userName: "Victoria Montgomery",
        rating: 5,
        comment: "An absolute masterpiece. It is unbelievably soft, light as a feather, yet incredibly warm. The craftsmanship represents pure luxury.",
        date: "2026-06-12",
        verified: true
      },
      {
        id: "rev-ps-2",
        userName: "Alistair Sterling",
        rating: 5,
        comment: "Beautiful texture and authentic GI tag validation. Exceptional heritage service from Ziryaat Kash.",
        date: "2026-05-30",
        verified: true
      }
    ]
  },
  {
    id: "pashmina-kani-classic",
    name: "Classic Kani Jamawar Pashmina Shawl",
    sku: "ZK-PS-002",
    category: "Pashmina Shawls",
    description: "An intricate symphony of colors, the Kani Shawl is woven using small wooden eyeless sticks called 'Kanis' following a written design code called the 'Talim'. Woven painstakingly centimeter by centimeter, this Jamawar layout is a historical collectible.",
    price: 3200,
    rating: 5.0,
    stock: 2,
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=800", // Luxury textile texture
      "https://images.unsplash.com/photo-1524295988356-02e212457691?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Material": "Changthangi Pashmina base with Silk motif threads",
      "Weave Type": "Kani Weaving (Tali-Maat)",
      "Dimensions": "2.0 m x 1.0 m",
      "Crafting Time": "8 Months of manual labor",
      "Care Instructions": "Dry Clean Only."
    },
    artisan: {
      name: "Bashir Ahmad Bhat",
      village: "Beerwah, Budgam",
      experience: "35 Years",
      story: "Bashir reads the 'Talim' - the traditional cryptographic script of weavers - like music notes. His family has kept the Kani Jamawar craft alive for two centuries.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
    },
    certificate: {
      certificateNo: "ZK-GI-KA-77312",
      giTagged: true,
      testingLab: "Pashmina Testing & Quality Control Laboratory, J&K Govt",
      threadCount: "180 Count Fine Spun",
      artisanSignature: "B. A. Bhat"
    },
    featured: true,
    reviews: [
      {
        id: "rev-ka-1",
        userName: "Elena Rostova",
        rating: 5,
        comment: "This is not clothing, it is fine museum art. I am honored to own such a beautiful legacy piece.",
        date: "2026-07-01",
        verified: true
      }
    ]
  },
  {
    id: "saffron-pamport-premium",
    name: "Pure Kashmiri Lacha Saffron (Grade A++)",
    sku: "ZK-SF-101",
    category: "Saffron",
    description: "Harvested from the legendary pampar (Pampore) highlands, known as the 'Saffron Town of Kashmir'. Kashmiri Saffron is globally renowned for its thick flat stigmas, dark red color, high crocin (color intensity), and intense honey-like aroma. Hand-picked at dawn during the autumn bloom.",
    price: 75, // For 5 Grams
    rating: 4.8,
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800", // Saffron spice
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=800" // Purple flowers
    ],
    specs: {
      "Origin": "Pampore Saffron Fields, Kashmir",
      "Grade": "ISO 3632 Category I (Grade A++)",
      "Quantity": "5 Grams Premium Glass Jar",
      "Harvest Period": "October - November 2025",
      "Crocin Level": "Color Intensity > 240 (World Highest)"
    },
    artisan: {
      name: "Zeba Begum",
      village: "Pampore, Pulwama",
      experience: "28 Years",
      story: "Zeba leads a collective of rural Kashmiri women who harvest the purple crocus flowers in the early morning. 'We must harvest before the first golden rays of the sun hit the fields to preserve the maximum aroma,' she explains.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
    },
    certificate: {
      certificateNo: "ZK-GI-SF-90412",
      giTagged: true,
      testingLab: "India International Kashmir Saffron Trading Centre (IIKSTC)",
      crocinLevel: "258.4 (Ultra High Intensity)",
      moistureLevel: "7.2% (Perfect cure)",
      artisanSignature: "Zeba Collective"
    },
    featured: true,
    reviews: [
      {
        id: "rev-sf-1",
        userName: "Chef Marcus Vance",
        rating: 5,
        comment: "Unmatched potency. Just two threads impart a deep royal golden color and an aroma that fills the entire kitchen. Sublime.",
        date: "2026-06-25",
        verified: true
      },
      {
        id: "rev-sf-2",
        userName: "Meera Nair",
        rating: 4,
        comment: "Excellent saffron. Deep dark crimson threads, and tastes authentic. Very nicely packed in a premium gold-accented glass vial.",
        date: "2026-06-11",
        verified: true
      }
    ]
  },
  {
    id: "dryfruits-kagzi-walnuts",
    name: "Kashmiri Kagzi Walnuts (Snow Halves)",
    sku: "ZK-DF-201",
    category: "Dry Fruits",
    description: "Kagzi Walnuts are famous for their extremely thin shell which can be cracked open easily by hand. These light amber snow halves are rich in premium oils, offering a crisp, buttery texture with none of the bitterness associated with standard store-bought walnuts.",
    price: 35, // 1 Kg
    rating: 4.7,
    stock: 120,
    images: [
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&q=80&w=800", // Walnuts
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&q=80&w=800" // Mixed nuts
    ],
    specs: {
      "Type": "Organic Kagzi Walnuts",
      "Grade": "Premium Light Amber Halves",
      "Weight": "1.0 kg Hermetic Canvas Pouch",
      "Nutrient Profile": "Rich in Omega-3 and natural antioxidants",
      "Preservation": "Zero chemical treatments. Hand shelled."
    },
    artisan: {
      name: "Mushtaq Ahmad Shah",
      village: "Shopian Orchard Belts",
      experience: "25 Years",
      story: "Mushtaq manages walnut orchards that have been passed down in his family for generations. The trees are watered solely by pristine Himalayan snowmelt.",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150"
    },
    certificate: {
      certificateNo: "ZK-ORG-WN-33120",
      giTagged: false,
      testingLab: "Sher-e-Kashmir University of Agricultural Sciences and Technology",
      moistureLevel: "4.8% (Ideal preservation state)",
      artisanSignature: "M. A. Shah"
    },
    featured: false,
    reviews: [
      {
        id: "rev-df-1",
        userName: "David Jenkins",
        rating: 5,
        comment: "Fresh, buttery, and incredibly tasty. Best walnuts I have ever had. The packaging looks extremely premium as well.",
        date: "2026-07-10",
        verified: true
      }
    ]
  },
  {
    id: "handicrafts-paper-mache-jewel",
    name: "Classic Naqash Imperial Paper Mache Jewelry Box",
    sku: "ZK-HC-301",
    category: "Handicrafts",
    description: "A breathtaking example of Sakhtsazi (shaping the paper pulp) and Naqashi (painting). This premium jewelry box is hand-painted with 'Hazara' (thousand flowers) miniature motifs using fine cat-hair brushes and 24-karat gold leaf details. Coated with local resin lacquer for a timeless shine.",
    price: 245,
    rating: 4.9,
    stock: 8,
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800", // Gold patterns, ornamental
      "https://images.unsplash.com/photo-1606722590583-6951b5ea92ce?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Base Material": "Compressed Kashmiri Pine & recycled paper pulp",
      "Artwork Style": "Hazara Naqash with 24K Gold Foil Accent",
      "Dimensions": "10\" x 6\" x 4\"",
      "Artisan Work": "45 Days of meticulous handpainting",
      "Lining": "Premium Red Royal Velvet Interior"
    },
    artisan: {
      name: "Fayaz Ahmad Jan",
      village: "Alamgari Bazar, Srinagar",
      experience: "38 Years",
      story: "Fayaz is a National Award-winning Paper Mache master. His brushwork is so microscopic that it requires magnifying lenses to see the individual petal lines. 'Paper Mache is patience transformed into a physical form,' he believes.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
    },
    certificate: {
      certificateNo: "ZK-NTA-PM-41908",
      giTagged: true,
      testingLab: "Handicrafts Quality Control Department, J&K Government",
      purityGrade: "Certified 24K Gold Leaf Accented",
      artisanSignature: "Fayaz A. Jan"
    },
    featured: true,
    reviews: [
      {
        id: "rev-hc-1",
        userName: "Sophia Lorenzi",
        rating: 5,
        comment: "This box is stunningly beautiful. The gold accents gleam in the light. It feels like an ancient royal relic.",
        date: "2026-07-05",
        verified: true
      }
    ]
  },
  {
    id: "leather-nomad-duffle",
    name: "Imperial Kashmir Walnut-Tanned Leather Duffle",
    sku: "ZK-LB-401",
    category: "Leather Bags",
    description: "Made from premium full-grain buffalo hide, tanned locally using traditional organic vegetable compounds, including walnut bark husks, which gives the leather its signature deep chocolate color and beautiful earthy aroma. Styled with handcrafted solid brass hardware.",
    price: 395,
    rating: 4.8,
    stock: 6,
    images: [
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800", // Luxury bag
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Leather Type": "Full Grain, Organic Walnut-Tanned Buffalo Hide",
      "Stitching": "High-durability hand-waxed linen cord thread",
      "Hardware": "Hand-forged Solid Brass Buckles and YKK Zippers",
      "Dimensions": "22\" L x 11\" W x 10\" H (Perfect Cabin Carry)",
      "Lining": "High-density heavy cotton canvas lining"
    },
    artisan: {
      name: "Hilal Ahmad Khan",
      village: "Khanyar, Srinagar",
      experience: "22 Years",
      story: "Hilal runs a small leather guild in downtown Khanyar. They reject chemical chrome tanning, choosing the tedious 60-day organic pit tanning process to honor the natural grains.",
      avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=150"
    },
    certificate: {
      certificateNo: "ZK-VEG-LT-10245",
      giTagged: false,
      testingLab: "Council of Leather Craftsmen, Srinagar Division",
      materialSource: "Ethical local valley hide, organic walnut husk tanned",
      artisanSignature: "H. A. Khan"
    },
    featured: false,
    reviews: [
      {
        id: "rev-lb-1",
        userName: "Jonathan Reed",
        rating: 5,
        comment: "Rugged yet incredibly sophisticated. The leather feels durable and has developed a spectacular rich patina already in just two weeks of travel.",
        date: "2026-06-20",
        verified: true
      }
    ]
  },
  {
    id: "home-decor-handknotted-silk-carpet",
    name: "Classic Royal Medallion Silk-on-Silk Carpet",
    sku: "ZK-HD-501",
    category: "Home Decor",
    description: "A monumental work of luxury. Hand-knotted using fine premium Kashmir silk threads on a pure silk foundation. Boasts 700 knots per square inch (KPSI), creating micro-fine details of classic Persian floral medallions. The carpet shifts colors under different lighting angles.",
    price: 4500,
    rating: 5.0,
    stock: 1,
    images: [
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=800", // Luxurious carpet details or living room
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Pile Material": "100% Pure Kashmir Mulberry Silk",
      "Base Material": "100% Fine Mulberry Silk Foundation",
      "Knots Density": "720 Knots Per Square Inch (KPSI)",
      "Dimensions": "4 ft x 6 ft",
      "Crafting Time": "14 Months of continuous knotting"
    },
    artisan: {
      name: "Mohammad Yusuf Shah",
      village: "Wazir Bagh, Srinagar",
      experience: "50 Years",
      story: "Yusuf is a master 'Ustadh' who can tie over 8,000 knots in a single day. 'A carpet is a map of the garden of paradise. Every knot is a prayer for peace,' Yusuf says.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150"
    },
    certificate: {
      certificateNo: "ZK-GI-CP-39014",
      giTagged: true,
      testingLab: "Indian Institute of Carpet Technology (IICT), Srinagar",
      threadCount: "720 KPSI Double-Weft Knotted",
      artisanSignature: "Ustadh M. Y. Shah"
    },
    featured: true,
    reviews: [
      {
        id: "rev-hd-1",
        userName: "Marcella Dubois",
        rating: 5,
        comment: "This silk carpet is a magnificent heirloom. The way the light reflects off the silk is absolutely magical. Worth every single penny.",
        date: "2026-07-15",
        verified: true
      }
    ]
  },
  {
    id: "home-decor-walnut-wood-bowl",
    name: "Classic Hand-Carved Walnut Wood Chinar Bowl",
    sku: "ZK-HD-502",
    category: "Home Decor",
    description: "Carved from a single block of seasoned walnut wood (sourced from trees aged over 150 years). Features rich 3D deep carvings of the iconic Kashmiri Chinar leaf. Walnut wood is naturally oil-rich and darkens beautifully over the decades.",
    price: 180,
    rating: 4.8,
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&q=80&w=800", // Wood carving
      "https://images.unsplash.com/photo-1537832821221-155fa337cc35?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Material": "Solid Wild Walnut Wood (Seasoned for 4 years)",
      "Crafting Method": "Traditional hand chisel carving (3D Relief)",
      "Diameter": "12 Inches",
      "Finish": "Natural organic wax polish (No chemical varnishes)",
      "Motif": "Royal Chinar Leaf Design"
    },
    artisan: {
      name: "Abdul Majeed Ganie",
      village: "Bijbehara, Anantnag",
      experience: "30 Years",
      story: "Abdul uses over 40 types of hand-forged chisels. He can read the wood's grain and knots like a storybook, modifying his strokes to highlight the natural dark-light core bands.",
      avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=150"
    },
    certificate: {
      certificateNo: "ZK-HC-WW-59021",
      giTagged: false,
      testingLab: "Woodcraft Heritage Registry of Jammu & Kashmir",
      woodType: "Wild Kashmiri Walnut (Juglans regia) Heartwood",
      artisanSignature: "A. M. Ganie"
    },
    featured: false,
    reviews: [
      {
        id: "rev-ww-1",
        userName: "Robert K.",
        rating: 5,
        comment: "Exquisite leaf details. The wood grain is incredibly premium and wavy. A gorgeous centerpiece for my dining table.",
        date: "2026-05-18",
        verified: true
      }
    ]
  }
];
