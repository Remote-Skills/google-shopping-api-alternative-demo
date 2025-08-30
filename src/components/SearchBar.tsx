import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SlidersHorizontal, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

const countries = [
  { value: 'us', label: 'United States', flag: '🇺🇸' },
  { value: 'ca', label: 'Canada', flag: '🇨🇦' },
  { value: 'fr', label: 'France', flag: '🇫🇷' },
  { value: 'de', label: 'Germany', flag: '🇩🇪' },
  { value: 'uk', label: 'United Kingdom', flag: '🇬🇧' },
  { value: 'au', label: 'Australia', flag: '🇦🇺' },
  { value: 'jp', label: 'Japan', flag: '🇯🇵' },
];

interface SearchFilters {
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sources?: string[];
  sortBy?: 'price-low' | 'price-high' | 'rating' | 'position';
  country?: string;
}

interface SearchBarProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: () => void;
  loading: boolean;
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  availableSources?: string[];
}

export const SearchBar = ({
  searchQuery,
  onSearchQueryChange,
  onSearch,
  loading,
  filters,
  onFiltersChange,
  availableSources = []
}: SearchBarProps) => {
  const [localFilters, setLocalFilters] = useState<SearchFilters>({
    ...filters,
    country: filters.country || 'us'
  });
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
  };

  const clearFilters = () => {
    const emptyFilters: SearchFilters = { country: 'us' };
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
    setPriceRange([0, 1000]);
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  const exampleSearches = [
    'iPhone 15', 'MacBook Pro', 'Samsung TV', 'AirPods Pro', 
    'Nintendo Switch', 'iPad Air', 'Sony Headphones', 'Dell Monitor'
  ];

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search for products (e.g., iPhone X, MacBook Pro, Samsung TV...)"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 pr-4 py-3 text-lg"
          />
        </div>
        
        {/* Filters Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="px-4 py-3 relative">
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
              {hasActiveFilters && (
                <Badge className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 rounded-full p-0 flex items-center justify-center">
                  !
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs"
                >
                  Clear All
                </Button>
              </div>
              
              <Separator />
              
              {/* Price Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Price Range</label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}+</span>
                </div>
              </div>
              
              <Separator />
              
              {/* Country Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <Select 
                  value={localFilters.country || 'us'} 
                  onValueChange={(value) => setLocalFilters({
                    ...localFilters,
                    country: value
                  })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        <span className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span>{country.label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              {/* Rating Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum Rating</label>
                <div className="grid grid-cols-5 gap-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant={localFilters.minRating === rating ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLocalFilters({
                        ...localFilters,
                        minRating: localFilters.minRating === rating ? undefined : rating
                      })}
                      className="text-xs"
                    >
                      {rating}★
                    </Button>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              {/* Sources Filter */}
              {availableSources.length > 0 && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vendors</label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {availableSources.slice(0, 8).map((source) => (
                        <div key={source} className="flex items-center space-x-2">
                          <Checkbox
                            id={source}
                            checked={localFilters.sources?.includes(source) || false}
                            onCheckedChange={(checked) => {
                              const currentSources = localFilters.sources || [];
                              setLocalFilters({
                                ...localFilters,
                                sources: checked
                                  ? [...currentSources, source]
                                  : currentSources.filter(s => s !== source)
                              });
                            }}
                          />
                          <label htmlFor={source} className="text-sm">
                            {source}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                </>
              )}
              
              {/* Sort By */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'position', label: 'Relevance' },
                    { value: 'price-low', label: 'Price ↑' },
                    { value: 'price-high', label: 'Price ↓' },
                    { value: 'rating', label: 'Rating' }
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={localFilters.sortBy === option.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLocalFilters({
                        ...localFilters,
                        sortBy: option.value as any
                      })}
                      className="text-xs"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <Button onClick={applyFilters} className="w-full">
                Apply Filters
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button 
          onClick={onSearch} 
          disabled={loading}
          className="px-8 py-3 text-lg"
        >
          {loading ? (
            <div className="w-5 h-5 animate-spin border-2 border-white border-t-transparent rounded-full mr-2" />
          ) : (
            <Search className="w-5 h-5 mr-2" />
          )}
          Search
        </Button>
      </div>
      
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.minRating && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Rating: {filters.minRating}★+
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onFiltersChange({ ...filters, minRating: undefined })}
              />
            </Badge>
          )}
          {filters.country && filters.country !== 'us' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {countries.find(c => c.value === filters.country)?.flag} {countries.find(c => c.value === filters.country)?.label}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onFiltersChange({ ...filters, country: 'us' })}
              />
            </Badge>
          )}
          {filters.sources?.map((source) => (
            <Badge key={source} variant="secondary" className="flex items-center gap-1">
              {source}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onFiltersChange({
                  ...filters,
                  sources: filters.sources?.filter(s => s !== source)
                })}
              />
            </Badge>
          ))}
          {filters.sortBy && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Sort: {filters.sortBy}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onFiltersChange({ ...filters, sortBy: undefined })}
              />
            </Badge>
          )}
        </div>
      )}
      
      {/* Example Searches */}
      {!searchQuery && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-3">Popular searches:</h3>
            <div className="flex flex-wrap gap-2">
              {exampleSearches.map((term) => (
                <Button
                  key={term}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onSearchQueryChange(term);
                    setTimeout(() => onSearch(), 100);
                  }}
                  className="text-xs"
                >
                  {term}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
