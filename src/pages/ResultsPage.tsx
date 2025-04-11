
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import AnimatedButton from "@/components/AnimatedButton";
import { ArrowRight, Check, Clock, Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProductRecommendations } from "@/data/productData";

const ResultsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [results, setResults] = useState<any>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    
    // Get stored results from localStorage
    const storedResults = localStorage.getItem("skinAnalysisResults");
    if (!storedResults) {
      navigate("/skin-analysis");
      return;
    }
    
    const parsedResults = JSON.parse(storedResults);
    setResults(parsedResults);
    
    // Get product recommendations based on stored skin type
    const skinTypeFromStorage = localStorage.getItem("userSkinType");
    const concernsFromStorage = JSON.parse(localStorage.getItem("userConcerns") || "[]");
    
    if (skinTypeFromStorage) {
      const products = getProductRecommendations(skinTypeFromStorage, concernsFromStorage);
      setRecommendedProducts(products);
    }
  }, [user, navigate]);

  const handleDownloadRoutine = () => {
    if (!results) return;

    // Create content to download
    const content = `
# Your Personalized Skincare Routine

## Morning Routine
${results.routine.morning.map((step: string) => `- ${step}`).join('\n')}

## Evening Routine
${results.routine.evening.map((step: string) => `- ${step}`).join('\n')}

## Recommended Ingredients
${results.recommendations.ingredients.map((ing: string) => `- ${ing}`).join('\n')}

## Ingredients to Avoid
${results.recommendations.avoidIngredients.map((ing: string) => `- ${ing}`).join('\n')}

## Tips
${results.tips.map((tip: string) => `- ${tip}`).join('\n')}
    `;

    // Create download link
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "my_skincare_routine.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading results...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-secondary/20">
      <Navbar />

      <main className="container px-4 pt-24 pb-12 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 animate-slide-up">
            <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your Personalized Routine</h1>
            <p className="text-gray-600">
              Based on your skin profile, we've created a customized skincare regimen to
              address your unique needs and concerns.
            </p>
          </div>

          {/* Daily Routine */}
          <div className="bg-white/80 glassmorphism rounded-xl p-6 md:p-8 shadow-lg mb-8 animate-slide-up delay-100">
            <Tabs defaultValue="morning">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Daily Routine</h2>
                <TabsList>
                  <TabsTrigger value="morning">Morning</TabsTrigger>
                  <TabsTrigger value="evening">Evening</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="morning" className="space-y-4">
                {results.routine.morning.map((step: string, index: number) => (
                  <div key={`morning-${index}`} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <span className="font-medium text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-gray-700">{step}</p>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="evening" className="space-y-4">
                {results.routine.evening.map((step: string, index: number) => (
                  <div key={`evening-${index}`} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                      <span className="font-medium text-accent">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-gray-700">{step}</p>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Ingredient Recommendations */}
          <div className="bg-white/80 glassmorphism rounded-xl p-6 md:p-8 shadow-lg mb-8 animate-slide-up delay-200">
            <h2 className="text-xl font-bold mb-4">Ingredient Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-1" />
                  Beneficial Ingredients
                </h3>
                <ul className="space-y-1.5">
                  {results.recommendations.ingredients.map((ingredient: string, i: number) => (
                    <li key={`good-${i}`} className="text-gray-700 flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Clock className="h-4 w-4 text-amber-500 mr-1" />
                  Ingredients to Avoid
                </h3>
                <ul className="space-y-1.5">
                  {results.recommendations.avoidIngredients.map(
                    (ingredient: string, i: number) => (
                      <li key={`avoid-${i}`} className="text-gray-700 flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        {ingredient}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Product Recommendations */}
          <div className="bg-white/80 glassmorphism rounded-xl p-6 md:p-8 shadow-lg mb-8 animate-slide-up delay-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recommended Products</h2>
              <button
                onClick={() => navigate("/products")}
                className="text-primary font-medium text-sm flex items-center hover:underline"
              >
                View all products
                <ArrowRight className="ml-1 h-3 w-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedProducts.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-white/80 glassmorphism rounded-xl p-6 md:p-8 shadow-lg mb-8 animate-slide-up delay-400">
            <h2 className="text-xl font-bold mb-4">Personalized Tips</h2>
            <ul className="space-y-3">
              {results.tips.map((tip: string, i: number) => (
                <li key={`tip-${i}`} className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <p className="text-gray-700">{tip}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center mt-8 animate-slide-up delay-500">
            <AnimatedButton 
              onClick={handleDownloadRoutine}
              className="bg-gradient-to-r from-primary to-accent"
            >
              <Download className="mr-2 h-4 w-4" />
              Save My Routine
            </AnimatedButton>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultsPage;
