
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { products, Product } from "@/data/productData";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [skinTypeFilter, setSkinTypeFilter] = useState("all");

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    // Apply filters
    let result = [...products];

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      result = result.filter((product) => product.category === categoryFilter);
    }

    // Skin type filter
    if (skinTypeFilter !== "all") {
      result = result.filter((product) =>
        product.skinTypes.includes(skinTypeFilter)
      );
    }

    // Price range filter
    if (priceRange !== "all") {
      switch (priceRange) {
        case "under500":
          result = result.filter((product) => parseInt(product.price.replace(/\D/g, "")) < 500);
          break;
        case "500to1000":
          result = result.filter(
            (product) => {
              const price = parseInt(product.price.replace(/\D/g, ""));
              return price >= 500 && price <= 1000;
            }
          );
          break;
        case "above1000":
          result = result.filter((product) => parseInt(product.price.replace(/\D/g, "")) > 1000);
          break;
        default:
          break;
      }
    }

    setFilteredProducts(result);
  }, [searchQuery, categoryFilter, priceRange, skinTypeFilter]);

  // Get unique categories
  const categories = ["all", ...new Set(products.map((product) => product.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-secondary/20">
      <Navbar />

      <main className="container px-4 pt-24 pb-12 mx-auto">
        <div className="text-center mb-10 animate-slide-up">
          <h1 className="text-3xl font-bold mb-4">Skincare Products</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover a curated selection of skincare products available in India,
            perfect for every skin type and concern.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/80 glassmorphism rounded-xl p-6 mb-8 animate-slide-up delay-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search" className="mb-2 block">Search</Label>
              <Input
                id="search"
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="category" className="mb-2 block">Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.slice(1).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="skinType" className="mb-2 block">Skin Type</Label>
              <Select value={skinTypeFilter} onValueChange={setSkinTypeFilter}>
                <SelectTrigger id="skinType">
                  <SelectValue placeholder="All Skin Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skin Types</SelectItem>
                  <SelectItem value="Dry">Dry</SelectItem>
                  <SelectItem value="Oily">Oily</SelectItem>
                  <SelectItem value="Combination">Combination</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Sensitive">Sensitive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priceRange" className="mb-2 block">Price Range</Label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger id="priceRange">
                  <SelectValue placeholder="All Prices" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under500">Under ₹500</SelectItem>
                  <SelectItem value="500to1000">₹500 - ₹1000</SelectItem>
                  <SelectItem value="above1000">Above ₹1000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 animate-slide-up">
            <p className="text-lg text-gray-600">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-slide-up delay-200">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center text-sm text-gray-500 animate-slide-up delay-300">
          <p>
            Product information is for demonstration purposes only.
            Prices and availability may vary.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
