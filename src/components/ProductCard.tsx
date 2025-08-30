"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, ExternalLink, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

interface Product {
  title: string;
  source: string;
  link: string;
  price: string;
  imageUrl: string;
  rating?: number;
  ratingCount?: number;
  productId: string;
  position: number;
}

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/product/${product.productId}`);
  };
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-200 text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 group">
      <div className="aspect-square relative overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
        <Badge className="absolute top-2 left-2 bg-white/90 text-gray-700 backdrop-blur-sm">
          #{product.position}
        </Badge>
        {product.rating && product.rating >= 4.5 && (
          <Badge className="absolute top-2 right-2 bg-green-500 text-white">
            Top Rated
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-medium text-sm mb-2 line-clamp-2 leading-tight min-h-[2.5rem]">
          {product.title}
        </h3>
        
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex gap-0.5">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-600 ml-1">
              {product.rating} ({product.ratingCount?.toLocaleString() || 0})
            </span>
          </div>
        )}
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-green-600">
            {product.price}
          </span>
          <Badge variant="secondary" className="text-xs">
            {product.source}
          </Badge>
        </div>
        
        <Separator className="mb-3" />
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => window.open(product.link, '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={handleViewDetails}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
