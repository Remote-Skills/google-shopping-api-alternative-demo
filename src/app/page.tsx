"use client";

import { useState, useMemo } from "react";
import { Loader2, TrendingUp, Users, ShoppingBag, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { SearchBar } from "@/components/SearchBar";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";

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

interface SearchResponse {
  products: Product[];
}

interface SearchFilters {
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sources?: string[];
  sortBy?: 'price-low' | 'price-high' | 'rating' | 'position';
  country?: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    country: 'us' // Default to US
  });

  const searchProducts = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const searchParams = new URLSearchParams();
      searchParams.append('query', searchQuery);
      
      // Add country parameter if specified
      if (filters.country) {
        searchParams.append('country', filters.country);
      }

      const response = await fetch(`/api/search?${searchParams.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SearchResponse = await response.json();
      setProducts(data.products || []);
      
      if (data.products?.length === 0) {
        toast.info("No products found for your search");
      } else {
        toast.success(`Found ${data.products?.length || 0} products`);
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error("Failed to search products. Please try again.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Get unique sources for filter
  const availableSources = useMemo(() => {
    const sources = products.map(p => p.source);
    return Array.from(new Set(sources));
  }, [products]);

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply rating filter
    if (filters.minRating) {
      filtered = filtered.filter(p => p.rating && p.rating >= filters.minRating!);
    }

    // Apply source filter
    if (filters.sources && filters.sources.length > 0) {
      filtered = filtered.filter(p => filters.sources!.includes(p.source));
    }

    // Apply price filter (parse price string)
    if (filters.minPrice || filters.maxPrice) {
      filtered = filtered.filter(p => {
        const price = parseFloat(p.price.replace(/[^0-9.]/g, ''));
        const min = filters.minPrice || 0;
        const max = filters.maxPrice || Infinity;
        return price >= min && price <= max;
      });
    }

    // Apply sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-low':
            return parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''));
          case 'price-high':
            return parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, ''));
          case 'rating':
            return (b.rating || 0) - (a.rating || 0);
          case 'position':
          default:
            return a.position - b.position;
        }
      });
    }

    return filtered;
  }, [products, filters]);

  // Calculate stats
  const stats = useMemo(() => {
    if (products.length === 0) return null;

    const prices = products
      .map(p => parseFloat(p.price.replace(/[^0-9.]/g, '')))
      .filter(p => !isNaN(p));
    
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgRating = products
      .filter(p => p.rating)
      .reduce((sum, p) => sum + (p.rating || 0), 0) / products.filter(p => p.rating).length;

    return {
      totalProducts: products.length,
      uniqueSources: availableSources.length,
      avgPrice: avgPrice.toFixed(2),
      priceRange: `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`,
      avgRating: avgRating.toFixed(1)
    };
  }, [products, availableSources]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Multi-Vendor Product Search
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Search across multiple vendors and find the best deals
            </p>
            
            {/* Search Bar Component */}
            <div className="max-w-4xl mx-auto">
              <SearchBar
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
                onSearch={searchProducts}
                loading={loading}
                filters={filters}
                onFiltersChange={setFilters}
                availableSources={availableSources}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* API Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Multi-Vendor Search
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">40+</div>
              <p className="text-xs text-muted-foreground">
                Supported vendors
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Real-time Data
              </CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">&lt;2s</div>
              <p className="text-xs text-muted-foreground">
                Average response time
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Price Comparison
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">100%</div>
              <p className="text-xs text-muted-foreground">
                Accurate pricing
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Product Reviews
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">★★★★☆</div>
              <p className="text-xs text-muted-foreground">
                Ratings included
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search Stats */}
        {stats && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Search Results Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Total Products:</span>
                  <div className="font-bold text-lg">{stats.totalProducts}</div>
                </div>
                <div>
                  <span className="text-gray-600">Vendors:</span>
                  <div className="font-bold text-lg">{stats.uniqueSources}</div>
                </div>
                <div>
                  <span className="text-gray-600">Price Range:</span>
                  <div className="font-bold text-lg">{stats.priceRange}</div>
                </div>
                <div>
                  <span className="text-gray-600">Avg Price:</span>
                  <div className="font-bold text-lg">${stats.avgPrice}</div>
                </div>
                <div>
                  <span className="text-gray-600">Avg Rating:</span>
                  <div className="font-bold text-lg">{stats.avgRating}★</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Searching products across multiple vendors...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
          </div>
        )}

        {/* No Results */}
        {hasSearched && !loading && filteredProducts.length === 0 && products.length === 0 && (
          <Alert className="max-w-2xl mx-auto">
            <AlertDescription className="text-center">
              No products found. Try a different search term like "iPhone", "laptop", or "headphones".
            </AlertDescription>
          </Alert>
        )}

        {/* Filtered Results Empty */}
        {hasSearched && !loading && filteredProducts.length === 0 && products.length > 0 && (
          <Alert className="max-w-2xl mx-auto">
            <AlertDescription className="text-center">
              No products match your current filters. Try adjusting your filter criteria.
            </AlertDescription>
          </Alert>
        )}

        {/* Results */}
        {filteredProducts.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">
                {filteredProducts.length !== products.length ? (
                  <>Filtered Results ({filteredProducts.length} of {products.length})</>
                ) : (
                  <>Search Results ({filteredProducts.length} products)</>
                )}
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.productId}
                  product={product}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>
          </>
        )}

        {/* API Documentation */}
        {!hasSearched && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">API Demo Features</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-medium mb-3">Search Capabilities:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Multi-vendor product search across 40+ platforms</li>
                    <li>• Real-time price comparison and availability</li>
                    <li>• Product ratings and customer reviews</li>
                    <li>• Direct links to vendor product pages</li>
                    <li>• Advanced filtering and sorting options</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Response Data:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Product title and detailed descriptions</li>
                    <li>• Vendor source and marketplace information</li>
                    <li>• Current pricing and discount information</li>
                    <li>• High-quality product images</li>
                    <li>• Rating scores and review counts</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Example API Usage:</h4>
                <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
{`POST https://product-search-api.p.rapidapi.com/shopping
Content-Type: application/x-www-form-urlencoded

query=iPhone+15`}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default Index;