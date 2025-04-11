
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AnimatedButton from "@/components/AnimatedButton";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { products } from "@/data/productData";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [trendingProducts, setTrendingProducts] = useState(products.slice(0, 5));

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would search products
    console.log("Searching for:", searchQuery);
  };

  const startSkinAnalysis = () => {
    navigate("/skin-analysis");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-secondary/20">
      <Navbar />

      <main className="container px-4 pt-24 pb-12 mx-auto">
        {/* Hero Section */}
        <section className="py-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8 animate-slide-up">
              <h1 className="text-4xl font-bold mb-4">
                Welcome back{user ? `, ${user.username}` : ""}!
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Let's find the perfect skincare routine for your unique needs. Get
                AI-powered recommendations tailored just for you.
              </p>
              <AnimatedButton
                onClick={startSkinAnalysis}
                className="bg-gradient-pink hover:shadow-lg"
                size="lg"
              >
                Start Skin Analysis <ArrowRight className="ml-2 h-4 w-4" />
              </AnimatedButton>
            </div>
            <div className="w-full md:w-1/2 animate-float">
              <img
                src="https://images.unsplash.com/photo-1614859638411-13659555ce1d?q=80&w=1740&auto=format&fit=crop"
                alt="Skincare products"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="my-8 animate-slide-up delay-200">
          <form
            onSubmit={handleSearch}
            className="relative max-w-2xl mx-auto"
          >
            <Input
              type="text"
              placeholder="Search for products, ingredients, or concerns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full border-2 border-primary/30 focus:border-primary focus:ring-primary/30 transition-all"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <AnimatedButton
              type="submit"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full py-1"
              size="sm"
            >
              Search
            </AnimatedButton>
          </form>
        </section>

        {/* Trending Products Carousel */}
        <section className="my-12 animate-slide-up delay-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Trending Products</h2>
            <button
              onClick={() => navigate("/products")}
              className="text-primary font-medium flex items-center hover:underline"
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          <Carousel className="w-full">
            <CarouselContent>
              {trendingProducts.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/3 lg:basis-1/4">
                  <div className="p-1">
                    <Card className="overflow-hidden border border-secondary/20 transition-all duration-300 hover:shadow-lg">
                      <div className="relative h-48 w-full overflow-hidden">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <CardContent className="p-4">
                        <p className="text-xs font-medium text-gray-500">{product.brand}</p>
                        <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-semibold text-sm">{product.price}</span>
                          <a
                            href={product.purchaseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary font-medium hover:underline"
                          >
                            View
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* Quick Tips Section */}
        <section className="my-12 bg-white/80 glassmorphism rounded-2xl p-6 animate-slide-up delay-400">
          <div className="flex items-center mb-4">
            <Sparkles className="text-primary mr-2" />
            <h2 className="text-2xl font-bold">Quick Skincare Tips</h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-start">
              <span className="text-primary font-bold mr-2">•</span>
              <p>Always apply products from thinnest to thickest consistency</p>
            </li>
            <li className="flex items-start">
              <span className="text-primary font-bold mr-2">•</span>
              <p>Wait 1-2 minutes between skincare layers for better absorption</p>
            </li>
            <li className="flex items-start">
              <span className="text-primary font-bold mr-2">•</span>
              <p>Reapply sunscreen every 2-3 hours when outdoors</p>
            </li>
            <li className="flex items-start">
              <span className="text-primary font-bold mr-2">•</span>
              <p>Store vitamin C products in a cool, dark place to maintain efficacy</p>
            </li>
            <li className="flex items-start">
              <span className="text-primary font-bold mr-2">•</span>
              <p>Double cleansing at night helps remove sunscreen and makeup thoroughly</p>
            </li>
            <li className="flex items-start">
              <span className="text-primary font-bold mr-2">•</span>
              <p>Patch test new products for 24-48 hours before full application</p>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
