
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Slider 
} from '@/components/ui/slider';
import { 
  Checkbox 
} from '@/components/ui/checkbox';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  ChevronUp, 
  X 
} from 'lucide-react';
import { Product } from '@/context/CartContext';

const ProductsPage = () => {
  // Mock data - would come from your backend in a real application
  const allProducts: Product[] = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: 'Experience crystal-clear sound with our premium wireless headphones. Features noise cancellation and 20-hour battery life.',
      category: 'Electronics'
    },
    {
      id: '2',
      name: 'Smart Watch with Fitness Tracking',
      price: 149.95,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1399&q=80',
      description: 'Monitor your fitness goals with our advanced smartwatch. Tracks heart rate, steps, and more.',
      category: 'Electronics'
    },
    {
      id: '3',
      name: 'Designer Leather Handbag',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80',
      description: 'Elegant and spacious genuine leather handbag perfect for everyday use.',
      category: 'Fashion'
    },
    {
      id: '4',
      name: 'Ultra HD 4K Smart TV - 55"',
      price: 699.00,
      image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: 'Immerse yourself in stunning 4K resolution with this smart TV featuring built-in streaming apps.',
      category: 'Electronics'
    },
    {
      id: '5',
      name: 'Stainless Steel Kitchen Knife Set',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80',
      description: 'Professional-grade knife set with ergonomic handles for precision cutting.',
      category: 'Home & Kitchen'
    },
    {
      id: '6',
      name: 'Organic Skincare Collection',
      price: 59.50,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
      description: 'All-natural skincare set made with organic ingredients. Gentle on sensitive skin.',
      category: 'Beauty'
    },
    {
      id: '7',
      name: 'Wireless Gaming Mouse',
      price: 79.95,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1428&q=80',
      description: 'High-precision gaming mouse with customizable RGB lighting and programmable buttons.',
      category: 'Electronics'
    },
    {
      id: '8',
      name: 'Portable Bluetooth Speaker',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: 'Waterproof Bluetooth speaker with 360° sound and 12-hour playtime.',
      category: 'Electronics'
    },
    {
      id: '9',
      name: 'Professional DSLR Camera',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80',
      description: 'Capture stunning photos and videos with this professional-grade DSLR camera with multiple lens options.',
      category: 'Electronics'
    },
    {
      id: '10',
      name: 'Ergonomic Office Chair',
      price: 249.95,
      image: 'https://images.unsplash.com/photo-1596162954151-cdcb4c0f70fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
      description: 'Comfortable office chair with lumbar support, adjustable height, and breathable mesh material.',
      category: 'Furniture'
    },
    {
      id: '11',
      name: 'Smart Home Security System',
      price: 349.99,
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: 'Comprehensive security system with cameras, motion sensors, and smartphone integration.',
      category: 'Electronics'
    },
    {
      id: '12',
      name: 'Luxury Scented Candle Set',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: 'Set of 3 luxury scented candles with long-lasting fragrance. Perfect for creating a cozy atmosphere.',
      category: 'Home & Kitchen'
    }
  ];

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Filter products based on search query and other filters
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPriceRange;
  });

  // Sort products based on sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'newest':
        return parseInt(b.id) - parseInt(a.id); // Using ID as a proxy for date in this mock
      default: // 'featured'
        return 0;
    }
  });

  // Categories for filter
  const categories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 'Furniture'];

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Additional search handling if needed
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange([0, 1500]);
    setSortBy('featured');
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-6 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Products</h1>
            
            {/* Mobile Filter Toggle */}
            <div className="flex justify-between items-center md:hidden mb-4">
              <span className="text-sm text-gray-500">{sortedProducts.length} Products</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
              </Button>
            </div>
            
            {/* Search Bar and Sort */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch md:items-center mb-6">
              <form onSubmit={handleSearchSubmit} className="flex-grow">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-10 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
              
              <div className="flex items-center justify-between md:justify-end gap-4">
                <span className="text-sm text-gray-500 whitespace-nowrap">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 md:w-[180px]">
                    <SelectValue placeholder="Featured" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Applied Filters */}
            {(searchQuery || selectedCategory || priceRange[0] > 0 || priceRange[1] < 1500) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {searchQuery && (
                  <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery('')}>
                      <X className="ml-2 h-3 w-3" />
                    </button>
                  </div>
                )}
                {selectedCategory && (
                  <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center">
                    Category: {selectedCategory}
                    <button onClick={() => setSelectedCategory('')}>
                      <X className="ml-2 h-3 w-3" />
                    </button>
                  </div>
                )}
                {(priceRange[0] > 0 || priceRange[1] < 1500) && (
                  <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center">
                    Price: ${priceRange[0]} - ${priceRange[1]}
                    <button onClick={() => setPriceRange([0, 1500])}>
                      <X className="ml-2 h-3 w-3" />
                    </button>
                  </div>
                )}
                <button 
                  className="text-shop-primary text-sm underline"
                  onClick={resetFilters}
                >
                  Reset all
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters (Desktop: always visible, Mobile: collapsible) */}
            <div className={`md:w-1/4 lg:w-1/5 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-semibold text-lg">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetFilters}
                    className="text-sm"
                  >
                    Reset
                  </Button>
                </div>

                {/* Categories Filter */}
                <Collapsible defaultOpen={true}>
                  <CollapsibleTrigger className="flex justify-between items-center w-full py-2 font-medium">
                    <span>Categories</span>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 space-y-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategory === category}
                          onCheckedChange={() => 
                            setSelectedCategory(
                              selectedCategory === category ? '' : category
                            )
                          }
                        />
                        <label 
                          htmlFor={`category-${category}`}
                          className="text-sm cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
                
                {/* Price Range Filter */}
                <Collapsible defaultOpen={true} className="border-t pt-4 mt-4">
                  <CollapsibleTrigger className="flex justify-between items-center w-full py-2 font-medium">
                    <span>Price Range</span>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-6 px-2">
                    <Slider
                      defaultValue={[0, 1500]}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={1500}
                      step={10}
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-sm">${priceRange[0]}</span>
                      <span className="text-sm">${priceRange[1]}</span>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                
                {/* Mobile only: close filters button */}
                <div className="md:hidden mt-6">
                  <Button 
                    className="w-full"
                    onClick={() => setShowFilters(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="md:w-3/4 lg:w-4/5">
              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sortedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-500 mb-4">No products found matching your filters.</p>
                  <Button variant="outline" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
