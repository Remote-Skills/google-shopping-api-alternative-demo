"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Star, ShoppingCart, ExternalLink, Truck, Shield, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import Image from "next/image";

interface ReviewAspect {
  aspect: string;
  mention_count: number;
  sentiment_percentage: number;
  sentiment: "positive" | "negative";
}

interface SampleReview {
  text: string;
  full_text: string;
  rating: number;
  date: string;
  reviewer: string;
  source: string;
}

interface Reviews {
  overall_rating: number;
  total_reviews: string;
  star_distribution: {
    "5_star": string;
    "4_star": string;
    "3_star": string;
    "2_star": string;
    "1_star": string;
  };
  aspects: ReviewAspect[];
  sample_reviews: SampleReview[];
}

interface Seller {
  seller_name: string;
  seller_url: string;
  details: string;
  item_price: string;
  total_price: string;
  condition: string | null;
  shipping: string | null;
}

interface BuyingOptions {
  sellers: Seller[];
}

interface ProductImage {
  url: string;
  type: string;
  image_number?: number;
}

interface Images {
  main_images: ProductImage[];
  thumbnails: ProductImage[];
  product_info: {
    overlay_title: string;
    overlay_price: string;
    overlay_merchant: string;
    overlay_rating: number;
    overlay_review_count: string;
  };
}

interface ProductDetails {
  id: string;
  country: string;
  title: string;
  description: string;
  reviews: Reviews;
  buying_options: BuyingOptions;
  images: Images;
}

const ProductDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSellerIndex, setSelectedSellerIndex] = useState(0);
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});

  const productId = params.id as string;

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const fetchProductDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/product/${productId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProductDetails = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product details:', error);
      setError("Failed to load product details. Please try again.");
      toast.error("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (product?.images.main_images) {
      setCurrentImageIndex((prev) => 
        prev === product.images.main_images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product?.images.main_images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.images.main_images.length - 1 : prev - 1
      );
    }
  };

  const formatPrice = (price: string) => {
    return price.replace(/[^0-9.]/g, '');
  };

  const getStarPercentage = (starCount: string, totalReviews: string) => {
    const count = parseInt(starCount.replace(/,/g, ''));
    const total = parseInt(totalReviews.replace(/,/g, ''));
    return (count / total) * 100;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertDescription>
            {error || "Product not found"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
                  {product.images.main_images.length > 0 && !imageError[currentImageIndex] ? (
                    <Image
                      src={product.images.main_images[currentImageIndex].url}
                      alt={product.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      onError={() => setImageError(prev => ({ ...prev, [currentImageIndex]: true }))}
                      priority={currentImageIndex === 0}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <div className="text-4xl mb-2">📷</div>
                        <p>Image not available</p>
                      </div>
                    </div>
                  )}
                  
                  {product.images.main_images.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={nextImage}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
                
                {/* Thumbnails */}
                {product.images.thumbnails.length > 0 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto">
                    {product.images.thumbnails.slice(0, 8).map((thumb, index) => (
                      <div
                        key={index}
                        className={`relative w-16 h-16 bg-white rounded border-2 cursor-pointer flex-shrink-0 ${
                          index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <Image
                          src={thumb.url}
                          alt={`${product.title} thumbnail ${index + 1}`}
                          fill
                          className="object-contain p-1"
                          sizes="64px"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.reviews.overall_rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold">
                  {product.reviews.overall_rating}
                </span>
                <span className="text-gray-600">
                  ({product.reviews.total_reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {product.images.product_info.overlay_price}
                </div>
                <p className="text-gray-600">
                  Price varies by seller and condition
                </p>
              </div>

              {/* Description */}
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3">
              <Button size="lg" className="flex-1">
                <ShoppingCart className="w-5 h-5 mr-2" />
                View Sellers
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Buying Options */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Available from {product.buying_options.sellers.length} sellers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {product.buying_options.sellers.map((seller, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    index === selectedSellerIndex
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedSellerIndex(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">
                          {seller.seller_name}
                        </h3>
                        {seller.condition && (
                          <Badge variant="secondary">
                            {seller.condition}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Item Price</p>
                          <p className="font-semibold">{seller.item_price}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total Price</p>
                          <p className="font-semibold text-green-600">
                            {seller.total_price}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Shipping</p>
                          <p className="text-sm">
                            {seller.details}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => window.open(seller.seller_url, '_blank')}
                      className="ml-4"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Store
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Review Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(product.reviews.star_distribution)
                  .reverse()
                  .map(([star, count], index) => {
                    const starNumber = 5 - index;
                    const percentage = getStarPercentage(count, product.reviews.total_reviews);
                    
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 w-12">
                          <span className="text-sm">{starNumber}</span>
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        </div>
                        <Progress value={percentage} className="flex-1" />
                        <span className="text-sm text-gray-600 w-12 text-right">
                          {count}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>

          {/* Review Aspects */}
          <Card>
            <CardHeader>
              <CardTitle>What customers say</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {product.reviews.aspects.slice(0, 6).map((aspect, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">
                        {aspect.aspect}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          {aspect.mention_count} mentions
                        </span>
                        <Badge
                          variant={aspect.sentiment === 'positive' ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {aspect.sentiment_percentage}% {aspect.sentiment}
                        </Badge>
                      </div>
                    </div>
                    <Progress
                      value={aspect.sentiment_percentage}
                      className={`h-2 ${
                        aspect.sentiment === 'positive' ? 'bg-green-100' : 'bg-red-100'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sample Reviews */}
        {product.reviews.sample_reviews.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {product.reviews.sample_reviews.map((review, index) => (
                  <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{review.reviewer}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-500 text-sm">{review.date}</span>
                      <Badge variant="outline" className="text-xs">
                        {review.source}
                      </Badge>
                    </div>
                    <p className="text-gray-700">
                      {review.full_text || review.text}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
