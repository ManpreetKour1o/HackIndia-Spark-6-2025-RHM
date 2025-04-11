
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Heart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  description: string;
  imageUrl: string;
  purchaseUrl: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card
      className="overflow-hidden border border-secondary/20 transition-all duration-300 hover:shadow-lg group animate-scale-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={product.imageUrl}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-2 right-2 bg-white/70 p-1.5 rounded-full hover:bg-white transition-colors"
        >
          <Heart
            size={18}
            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}
          />
        </button>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-gray-500">{product.brand}</p>
              <h3 className="font-semibold line-clamp-1">{product.name}</h3>
            </div>
            <span className="font-semibold text-sm whitespace-nowrap">
              {product.price}
            </span>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

          <a
            href={product.purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-primary mt-2 hover:underline"
          >
            Shop Now
            <ExternalLink size={14} className="ml-1" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
