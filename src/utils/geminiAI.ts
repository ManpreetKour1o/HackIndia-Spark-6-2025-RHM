
interface SkinInput {
  skinType: string;
  concerns: string[];
  additionalInfo?: string;
}

interface SkinAdvice {
  routine: {
    morning: string[];
    evening: string[];
  };
  recommendations: {
    ingredients: string[];
    avoidIngredients: string[];
    products: ProductRecommendation[];
  };
  tips: string[];
}

interface ProductRecommendation {
  category: string;
  suggestions: string[];
}

// Mock Gemini AI response for the demo
// In a real application, this would make an API call to the Gemini API
export const analyzeWithGemini = async (userInput: SkinInput): Promise<SkinAdvice> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log("Analyzing with mock Gemini:", userInput);
  
  // This is a mock implementation - would be replaced with actual Gemini API call
  const mockResponses: Record<string, SkinAdvice> = {
    // Dry skin response
    "Dry": {
      routine: {
        morning: [
          "Cleanse with a gentle hydrating cleanser",
          "Apply a hydrating toner or essence",
          "Use a vitamin C serum for brightness",
          "Apply a rich moisturizer",
          "Finish with SPF 30+ sunscreen"
        ],
        evening: [
          "Remove makeup with cleansing balm or oil",
          "Cleanse with a hydrating cleanser",
          "Apply hydrating toner",
          "Use hyaluronic acid serum",
          "Apply night cream with ceramides",
          "Consider facial oil as the final step"
        ]
      },
      recommendations: {
        ingredients: [
          "Hyaluronic Acid",
          "Ceramides",
          "Glycerin",
          "Squalane",
          "Natural oils (argan, jojoba)",
          "Shea butter",
          "Niacinamide",
        ],
        avoidIngredients: [
          "Alcohol",
          "Fragrances",
          "Sulfates",
          "Astringent ingredients",
          "High concentrations of salicylic acid"
        ],
        products: [
          {
            category: "Cleansers",
            suggestions: ["Dr. Sheth's Ceramide & Vitamin C Cleanser", "Forest Essentials Honey Cream Face Cleanser"]
          },
          {
            category: "Moisturizers",
            suggestions: ["Minimalist Sepicalm & Oat Moisturizer", "Dot & Key Ceramide Supercream"]
          },
          {
            category: "Serums",
            suggestions: ["Earth Rhythm Phyto Ceramide Serum", "Plum Oil-Free Humectant"]
          }
        ]
      },
      tips: [
        "Use lukewarm water instead of hot water when washing your face",
        "Consider using a humidifier in your room, especially in dry weather",
        "Drink plenty of water throughout the day",
        "Apply moisturizer to slightly damp skin for better absorption",
        "Focus on gentle exfoliation 1-2 times per week maximum"
      ]
    },
    
    // Oily skin response
    "Oily": {
      routine: {
        morning: [
          "Cleanse with a gentle foaming cleanser",
          "Apply an alcohol-free toner with niacinamide",
          "Use a lightweight antioxidant serum",
          "Apply an oil-free gel moisturizer",
          "Finish with a mattifying SPF 50+ sunscreen"
        ],
        evening: [
          "Cleanse with a balancing cleanser",
          "Apply a BHA toner (2-3 times weekly)",
          "Use a niacinamide or zinc serum",
          "Apply a lightweight gel moisturizer",
          "Spot treatment with salicylic acid if needed"
        ]
      },
      recommendations: {
        ingredients: [
          "Salicylic Acid",
          "Niacinamide",
          "Zinc",
          "Tea Tree Oil",
          "Green Tea Extract",
          "Hyaluronic Acid",
          "Clay"
        ],
        avoidIngredients: [
          "Heavy oils",
          "Petrolatum",
          "Coconut oil",
          "Shea butter in high concentrations",
          "Alcohol denat (drying alcohol)"
        ],
        products: [
          {
            category: "Cleansers",
            suggestions: ["Minimalist 2% Salicylic Acid Cleanser", "Plum Green Tea Face Wash"]
          },
          {
            category: "Toners",
            suggestions: ["Minimalist PHA Toner", "The Face Shop Jeju Aloe Vera Toner"]
          },
          {
            category: "Moisturizers",
            suggestions: ["Sebamed Clear Face Gel", "Plum Green Tea Oil-Free Moisturizer"]
          }
        ]
      },
      tips: [
        "Don't over-wash your face - twice a day is enough",
        "Use blotting papers throughout the day instead of washing",
        "Choose makeup products labeled 'non-comedogenic' or 'oil-free'",
        "Don't skip moisturizer - dehydrated skin can produce more oil",
        "Consider using clay masks 1-2 times per week"
      ]
    },
    
    // Combination skin response
    "Combination": {
      routine: {
        morning: [
          "Cleanse with a balanced pH cleanser",
          "Apply a balancing toner",
          "Use a lightweight serum with niacinamide",
          "Apply a lightweight lotion (more on dry areas)",
          "Finish with a non-greasy SPF 30+ sunscreen"
        ],
        evening: [
          "Double cleanse if wearing makeup",
          "Use a mild exfoliating toner (2-3 times weekly)",
          "Apply a balancing serum",
          "Use a lightweight moisturizer overall",
          "Add a richer cream only on dry patches"
        ]
      },
      recommendations: {
        ingredients: [
          "Niacinamide",
          "Hyaluronic Acid",
          "Squalane",
          "Centella Asiatica",
          "Green Tea Extract",
          "Mild AHAs",
          "Panthenol"
        ],
        avoidIngredients: [
          "Heavy fragrance",
          "Harsh sulfates",
          "Alcohol denat",
          "Extremely rich butters all over face"
        ],
        products: [
          {
            category: "Cleansers",
            suggestions: ["Simple Kind To Skin Refreshing Face Wash", "Cetaphil Gentle Skin Cleanser"]
          },
          {
            category: "Toners",
            suggestions: ["Klairs Supple Preparation Toner", "Forest Essentials Pure Rosewater"]
          },
          {
            category: "Serums",
            suggestions: ["Earth Rhythm 10% Niacinamide Serum", "Minimalist Multi-Biotic Serum"]
          }
        ]
      },
      tips: [
        "Consider multi-masking - using different masks on different areas of your face",
        "Apply more moisturizer on dry areas and less on oily areas",
        "Use gentler products in winter when skin tends to be drier",
        "Focus oil-absorbing products only on the T-zone",
        "Consider using different cleansers for morning (gentle) and evening (more thorough)"
      ]
    },
    
    // Normal skin response
    "Normal": {
      routine: {
        morning: [
          "Cleanse with a gentle cleanser",
          "Apply an antioxidant serum (vitamin C)",
          "Use a light moisturizer with SPF 30+",
          "Or apply separate moisturizer and sunscreen"
        ],
        evening: [
          "Remove makeup/sunscreen with micellar water or cleansing balm",
          "Cleanse with a gentle cleanser",
          "Apply treatment products (retinol, peptides)",
          "Use a nourishing night cream"
        ]
      },
      recommendations: {
        ingredients: [
          "Vitamin C",
          "Peptides",
          "Ceramides",
          "Antioxidants",
          "Hyaluronic Acid",
          "Niacinamide",
          "Mild retinoids"
        ],
        avoidIngredients: [
          "Harsh sulfates",
          "Artificial fragrances in high amounts",
          "Drying alcohols"
        ],
        products: [
          {
            category: "Cleansers",
            suggestions: ["Cetaphil Gentle Skin Cleanser", "Biotique Morning Nectar Flawless Face Wash"]
          },
          {
            category: "Serums",
            suggestions: ["Plum Vitamin C Serum", "Minimalist 10% Vitamin C Serum"]
          },
          {
            category: "Moisturizers",
            suggestions: ["Neutrogena Hydro Boost Water Gel", "Plum Green Tea Renewed Clarity Night Gel"]
          }
        ]
      },
      tips: [
        "Focus on maintaining skin health with antioxidants and sun protection",
        "Prevention is easier than correction - start anti-aging care early",
        "Don't over-complicate your routine - consistency is key",
        "Consider seasonal adjustments (lighter products in summer, richer in winter)",
        "Introduce active ingredients gradually to maintain your skin balance"
      ]
    },
    
    // Sensitive skin response
    "Sensitive": {
      routine: {
        morning: [
          "Cleanse with a mild, fragrance-free cleanser or just water",
          "Apply a soothing, alcohol-free toner (optional)",
          "Use a gentle moisturizer with minimal ingredients",
          "Finish with a mineral-based SPF 30+ sunscreen"
        ],
        evening: [
          "Gently remove makeup with micellar water",
          "Cleanse with a very gentle cleanser",
          "Apply a calming serum with centella or aloe",
          "Use a barrier-repairing moisturizer"
        ]
      },
      recommendations: {
        ingredients: [
          "Centella Asiatica",
          "Aloe Vera",
          "Oat Extract",
          "Ceramides",
          "Panthenol",
          "Allantoin",
          "Bisabolol",
          "Madecassoside"
        ],
        avoidIngredients: [
          "Fragrances",
          "Essential oils",
          "Alcohol",
          "Chemical sunscreen filters",
          "Strong acids",
          "Harsh preservatives",
          "Sodium Lauryl Sulfate"
        ],
        products: [
          {
            category: "Cleansers",
            suggestions: ["Bioderma Sensibio H2O Micellar Water", "Cetaphil Gentle Skin Cleanser"]
          },
          {
            category: "Moisturizers",
            suggestions: ["Minimalist Sepicalm Moisturizer", "Aveeno Dermexa Moisturizing Cream"]
          },
          {
            category: "Sunscreens",
            suggestions: ["Ipca Acne-UV Gel SPF 30", "La Shield Fisico Sunscreen"]
          }
        ]
      },
      tips: [
        "Always patch test new products on your inner arm for 24-48 hours",
        "Use fragrance-free laundry detergent for pillowcases",
        "Avoid extreme temperatures on your skin (very hot or cold water)",
        "Minimize physical exfoliation - use very gentle chemical exfoliants if needed",
        "Look for products with minimal ingredients lists",
        "Consider products labeled for sensitive or baby skin"
      ]
    }
  };
  
  // Return the appropriate response based on skin type
  // Default to normal skin if no match
  return mockResponses[userInput.skinType] || mockResponses["Normal"];
};
