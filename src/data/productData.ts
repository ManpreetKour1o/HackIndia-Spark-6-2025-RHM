
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  description: string;
  imageUrl: string;
  purchaseUrl: string;
  skinTypes: string[];
  concerns: string[];
}

// Sample product data for Indian market
export const products: Product[] = [
  {
    id: "1",
    name: "Vitamin C Face Serum",
    brand: "Minimalist",
    category: "Serum",
    price: "₹699",
    description: "10% Vitamin C for brightening and anti-aging benefits.",
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=387&auto=format&fit=crop",
    purchaseUrl: "https://www.nykaa.com/minimalist-10-vitamin-c-face-serum/p/4376063",
    skinTypes: ["All", "Dry", "Combination", "Oily"],
    concerns: ["Dullness", "Hyperpigmentation", "Aging"],
  },
  {
    id: "2",
    name: "Ceramide & Hyaluronic Acid Moisturizer",
    brand: "Dr. Sheth's",
    category: "Moisturizer",
    price: "₹450",
    description: "Intense hydration with ceramides for dry skin.",
    imageUrl: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?q=80&w=1170&auto=format&fit=crop",
    purchaseUrl: "https://www.drsheths.com/products/ceramide-hyaluronic-acid-moisturizer",
    skinTypes: ["Dry", "Normal", "Sensitive"],
    concerns: ["Dryness", "Sensitivity", "Redness"],
  },
  {
    id: "3",
    name: "Niacinamide & BHA Spot Treatment Gel",
    brand: "Plum",
    category: "Treatment",
    price: "₹575",
    description: "Targeted treatment for acne and dark spots.",
    imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1074&auto=format&fit=crop",
    purchaseUrl: "https://plumgoodness.com/products/green-tea-spot-light-gel",
    skinTypes: ["Oily", "Combination", "Acne-prone"],
    concerns: ["Acne", "Oiliness", "Hyperpigmentation"],
  },
  {
    id: "4",
    name: "Natural Ubtan Face Wash",
    brand: "Biotique",
    category: "Cleanser",
    price: "₹199",
    description: "Ayurvedic cleanser with natural ingredients.",
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=387&auto=format&fit=crop",
    purchaseUrl: "https://www.biotique.com/biotique-bio-wheat-germ-exfoliating-face-body-scrub-for-normal-to-dry-skin-75g.html",
    skinTypes: ["Normal", "Dry", "Sensitive"],
    concerns: ["Dullness", "Dryness", "Aging"],
  },
  {
    id: "5",
    name: "Retinol & Ceramide Night Cream",
    brand: "Dot & Key",
    category: "Night Cream",
    price: "₹795",
    description: "Anti-aging night cream with retinol and ceramides.",
    imageUrl: "https://images.unsplash.com/photo-1631730359585-38a4935cbf8e?q=80&w=1074&auto=format&fit=crop",
    purchaseUrl: "https://www.dotandkey.com/products/retinol-ceramide-skin-plumping-night-cream",
    skinTypes: ["Mature", "Normal", "Combination"],
    concerns: ["Aging", "Fine lines", "Dullness"],
  },
  {
    id: "6",
    name: "Green Tea Clay Mask",
    brand: "Mamaearth",
    category: "Mask",
    price: "₹499",
    description: "Purifying clay mask with green tea for oily skin.",
    imageUrl: "https://plus.unsplash.com/premium_photo-1664203068007-52240d0ca48f?q=80&w=1074&auto=format&fit=crop",
    purchaseUrl: "https://mamaearth.in/product/green-tea-face-mask",
    skinTypes: ["Oily", "Combination", "Acne-prone"],
    concerns: ["Oiliness", "Acne", "Pores"],
  },
  {
    id: "7",
    name: "Saffron & Red Raspberry Sunscreen SPF 50",
    brand: "Forest Essentials",
    category: "Sunscreen",
    price: "₹1,895",
    description: "Luxurious sunscreen with natural ingredients.",
    imageUrl: "https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?q=80&w=1074&auto=format&fit=crop",
    purchaseUrl: "https://www.forestessentialsindia.com/sun-fluid-sun-screen-lotion-spf-50.html",
    skinTypes: ["All", "Sensitive"],
    concerns: ["Sun protection", "Aging", "Hyperpigmentation"],
  },
  {
    id: "8",
    name: "Tea Tree Face Toner",
    brand: "Kama Ayurveda",
    category: "Toner",
    price: "₹1,195",
    description: "Balancing toner with tea tree for oily skin.",
    imageUrl: "https://images.unsplash.com/photo-1626273257678-3c574a340753?q=80&w=1170&auto=format&fit=crop",
    purchaseUrl: "https://www.kamaayurveda.com/pure-rose-water-50ml.html",
    skinTypes: ["Oily", "Combination", "Acne-prone"],
    concerns: ["Oiliness", "Acne", "Pores"],
  },
  {
    id: "9",
    name: "Kumkumadi Brightening Ayurvedic Face Scrub",
    brand: "KAMA Ayurveda",
    category: "Exfoliator",
    price: "₹825",
    description: "Gentle scrub with ayurvedic ingredients for glowing skin.",
    imageUrl: "https://images.unsplash.com/photo-1614159102322-8291e7c154c8?q=80&w=1170&auto=format&fit=crop",
    purchaseUrl: "https://www.kamaayurveda.com/kumkumadi-brightening-ayurvedic-face-scrub.html",
    skinTypes: ["Normal", "Dry", "Combination"],
    concerns: ["Dullness", "Hyperpigmentation", "Texture"],
  },
  {
    id: "10",
    name: "Aloe Vera Gel",
    brand: "WOW Skin Science",
    category: "Treatment",
    price: "₹349",
    description: "Pure aloe vera gel for soothing and hydrating skin.",
    imageUrl: "https://images.unsplash.com/photo-1596104341455-9392231940ab?q=80&w=1025&auto=format&fit=crop",
    purchaseUrl: "https://www.wowskinscience.com/products/aloe-vera-gel",
    skinTypes: ["All", "Sensitive", "Irritated"],
    concerns: ["Sensitivity", "Redness", "Dryness", "Sunburn"],
  }
];

export const getProductRecommendations = (
  skinType: string,
  concerns: string[] = []
): Product[] => {
  // Filter products that match the skin type
  let matchingProducts = products.filter(
    (product) => product.skinTypes.includes(skinType) || product.skinTypes.includes("All")
  );

  // If there are concerns, further filter or sort by relevance
  if (concerns.length > 0) {
    // Sort products by how many concerns they address
    matchingProducts.sort((a, b) => {
      const aMatchCount = concerns.filter(concern => a.concerns.includes(concern)).length;
      const bMatchCount = concerns.filter(concern => b.concerns.includes(concern)).length;
      return bMatchCount - aMatchCount; // Higher match count first
    });
  }

  // Return top products (limited to avoid overwhelming the user)
  return matchingProducts.slice(0, 6);
};
