import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, ExternalLink, Share2, Heart, Info } from "lucide-react";
import { toast } from "sonner";

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

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!product) return null;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-5 h-5 fill-yellow-200 text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }

    return stars;
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.title,
        text: `Check out this product: ${product.title}`,
        url: product.link,
      });
    } catch (error) {
      // Fallback to clipboard
      navigator.clipboard.writeText(product.link);
      toast.success("Product link copied to clipboard!");
    }
  };

  const handleSaveToWishlist = () => {
    // This would integrate with your wishlist functionality
    toast.success("Added to wishlist!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold pr-8">
            Product Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden bg-gray-100 rounded-lg">
              <img
                src={product.imageUrl}
                alt={product.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                  setImageLoaded(true);
                }}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}
              <Badge className="absolute top-4 left-4 bg-white/90 text-gray-700 backdrop-blur-sm">
                Rank #{product.position}
              </Badge>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button onClick={handleShare} variant="outline" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button onClick={handleSaveToWishlist} variant="outline" className="flex-1">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{product.source}</Badge>
                {product.rating && product.rating >= 4.5 && (
                  <Badge className="bg-green-500">Top Rated</Badge>
                )}
              </div>
            </div>
            
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {renderStars(product.rating)}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-gray-600">
                  ({product.ratingCount?.toLocaleString() || 0} reviews)
                </span>
              </div>
            )}
            
            {/* Price */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Price</span>
                <span className="text-3xl font-bold text-green-600">{product.price}</span>
              </div>
            </div>
            
            <Separator />
            
            {/* Product Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Info className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Product ID:</span>
                <code className="bg-gray-100 px-2 py-1 rounded text-xs">{product.productId}</code>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Vendor Information</h3>
                <p className="text-sm text-gray-600">
                  This product is sold by <strong>{product.source}</strong>. 
                  Click "View on Vendor Site" to see full product details, 
                  shipping information, and complete the purchase.
                </p>
              </div>
            </div>
            
            <Separator />
            
            {/* Call to Action */}
            <div className="space-y-3">
              <Button 
                onClick={() => window.open(product.link, '_blank')}
                className="w-full py-3 text-lg"
                size="lg"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                View on Vendor Site
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                You'll be redirected to {product.source} to complete your purchase
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
