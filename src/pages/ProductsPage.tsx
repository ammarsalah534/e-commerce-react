
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import FilterSidebar from '@/components/products/FilterSidebar';
import BrandsSlider from '@/components/products/BrandsSlider';
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { 
  Search, 
  SlidersHorizontal, 
  ChevronDown,
  Filter, 
  X,
  Circle
} from 'lucide-react';
import { Product } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

// Mock data for brands
const brandData = [
  { id: 'brand1', name: 'Apple', logo: 'https://cdn-icons-png.flaticon.com/512/0/747.png' },
  { id: 'brand2', name: 'Samsung', logo: 'https://cdn-icons-png.flaticon.com/512/882/882747.png' },
  { id: 'brand3', name: 'Sony', logo: 'https://cdn-icons-png.flaticon.com/512/731/731935.png' },
  { id: 'brand4', name: 'LG', logo: 'https://cdn-icons-png.flaticon.com/512/5969/5969246.png' },
  { id: 'brand5', name: 'Microsoft', logo: 'https://cdn-icons-png.flaticon.com/512/732/732221.png' },
  { id: 'brand6', name: 'Dell', logo: 'https://cdn-icons-png.flaticon.com/512/6124/6124997.png' },
  { id: 'brand7', name: 'HP', logo: 'https://cdn-icons-png.flaticon.com/512/882/882777.png' },
  { id: 'brand8', name: 'Lenovo', logo: 'https://cdn-icons-png.flaticon.com/512/882/882711.png' },
  { id: 'brand9', name: 'Asus', logo: 'https://cdn-icons-png.flaticon.com/512/882/882750.png' },
  { id: 'brand10', name: 'Acer', logo: 'https://cdn-icons-png.flaticon.com/512/882/882696.png' },
];

// Mock data for colors
const colorOptions = [
  { id: 'red', name: 'Red', color: '#ea384c' },
  { id: 'blue', name: 'Blue', color: '#0EA5E9' },
  { id: 'green', name: 'Green', color: '#10B981' },
  { id: 'purple', name: 'Purple', color: '#8B5CF6' },
  { id: 'pink', name: 'Pink', color: '#D946EF' },
  { id: 'orange', name: 'Orange', color: '#F97316' },
  { id: 'black', name: 'Black', color: '#000000' },
  { id: 'white', name: 'White', color: '#FFFFFF', border: true },
];

// Mock data for sizes
const sizeOptions = [
  { id: 'xs', name: 'XS' },
  { id: 'sm', name: 'S' },
  { id: 'md', name: 'M' },
  { id: 'lg', name: 'L' },
  { id: 'xl', name: 'XL' },
  { id: '2xl', name: '2XL' },
];

const ProductsPage = () => {
  const { t } = useLanguage();
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryId || searchParams.get('category') || '');
  const [selectedBrand, setSelectedBrand] = useState<string>(searchParams.get('brand') || '');
  const [priceRange, setPriceRange] = useState([
    parseInt(searchParams.get('minPrice') || '0'), 
    parseInt(searchParams.get('maxPrice') || '1500')
  ]);
  const [selectedColor, setSelectedColor] = useState<string>(searchParams.get('color') || '');
  const [selectedSize, setSelectedSize] = useState<string>(searchParams.get('size') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'featured');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
  const productsPerPage = 50;

  // Dynamic specifications based on category
  const [specifications, setSpecifications] = useState<Record<string, string>>({});

  // Update specifications when category changes
  useEffect(() => {
    // Reset specifications when category changes
    setSpecifications({});
    
    // If any spec parameters exist in the URL, load them
    searchParams.forEach((value, key) => {
      if (key.startsWith('spec_')) {
        setSpecifications(prev => ({ ...prev, [key]: value }));
      }
    });
  }, [selectedCategory, searchParams]);

  // Update URL params when filters change
  useEffect(() => {
    const newParams = new URLSearchParams();
    
    if (searchQuery) newParams.set('search', searchQuery);
    if (selectedCategory) newParams.set('category', selectedCategory);
    if (selectedBrand) newParams.set('brand', selectedBrand);
    if (priceRange[0] > 0) newParams.set('minPrice', priceRange[0].toString());
    if (priceRange[1] < 1500) newParams.set('maxPrice', priceRange[1].toString());
    if (selectedColor) newParams.set('color', selectedColor);
    if (selectedSize) newParams.set('size', selectedSize);
    if (sortBy !== 'featured') newParams.set('sort', sortBy);
    if (currentPage > 1) newParams.set('page', currentPage.toString());
    
    // Add specifications to URL
    Object.entries(specifications).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
    });
    
    setSearchParams(newParams);
  }, [
    searchQuery, 
    selectedCategory, 
    selectedBrand, 
    priceRange, 
    selectedColor, 
    selectedSize, 
    sortBy, 
    currentPage, 
    specifications, 
    setSearchParams
  ]);

  // Get brands relevant to the selected category
  const getCategoryBrands = () => {
    // In a real application, you would filter brands based on the selected category
    // For this example, we'll just return all brands
    return brandData;
  };

  // Construct filter configuration
  const filters = [
    {
      name: t('filter.category'),
      key: 'category',
      type: 'category' as const,
      options: [
        { 
          id: 'electronics', 
          name: 'Electronics', 
          count: 42,
          children: [
            { id: 'phones', name: 'Phones', count: 12 },
            { id: 'laptops', name: 'Laptops', count: 15 },
            { id: 'tablets', name: 'Tablets', count: 8 },
            { id: 'accessories', name: 'Accessories', count: 7 }
          ]
        },
        { 
          id: 'fashion', 
          name: 'Fashion', 
          count: 36,
          children: [
            { id: 'men', name: "Men's Clothing", count: 14 },
            { id: 'women', name: "Women's Clothing", count: 18 },
            { id: 'jewelry', name: 'Jewelry', count: 4 }
          ]
        },
        { 
          id: 'home', 
          name: 'Home & Kitchen', 
          count: 24,
          children: [
            { id: 'appliances', name: 'Appliances', count: 9 },
            { id: 'furniture', name: 'Furniture', count: 15 }
          ]
        },
        { id: 'beauty', name: 'Beauty', count: 18 },
        { id: 'sports', name: 'Sports & Outdoors', count: 15 }
      ]
    },
    {
      name: t('filter.brand'),
      key: 'brand',
      type: 'brand' as const,
      options: brandData.map(brand => ({ id: brand.id, name: brand.name, count: Math.floor(Math.random() * 10) + 1 }))
    },
    {
      name: t('filter.price'),
      key: 'price',
      type: 'price' as const,
      min: 0,
      max: 1500
    },
    {
      name: t('filter.color'),
      key: 'color',
      type: 'color' as const,
      options: colorOptions
    },
    {
      name: t('filter.size'),
      key: 'size',
      type: 'size' as const,
      options: sizeOptions
    },
    {
      name: t('filter.specifications'),
      key: 'specifications',
      type: 'specification' as const,
      specifications: []
    }
  ];

  // Combined filter state for FilterSidebar
  const selectedFilters = {
    category: selectedCategory,
    brand: selectedBrand,
    price: priceRange,
    color: selectedColor,
    size: selectedSize,
    ...specifications
  };

  // Handle filter changes
  const handleFilterChange = (key: string, value: any) => {
    // Reset to page 1 when changing filters
    setCurrentPage(1);
    
    switch (key) {
      case 'category':
        setSelectedCategory(value);
        break;
      case 'brand':
        setSelectedBrand(value);
        break;
      case 'price':
        setPriceRange(value);
        break;
      case 'color':
        setSelectedColor(value);
        break;
      case 'size':
        setSelectedSize(value);
        break;
      default:
        // Handle specification filters
        if (key.startsWith('spec_')) {
          setSpecifications(prev => ({ ...prev, [key]: value }));
        }
    }
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedBrand('');
    setPriceRange([0, 1500]);
    setSelectedColor('');
    setSelectedSize('');
    setSpecifications({});
    setSortBy('featured');
    setCurrentPage(1);
  };

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    // Additional search handling if needed
  };

  // Handle brand selection
  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(selectedBrand === brandId ? '' : brandId);
    setCurrentPage(1);
  };

  // Filter products based on all filters
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = !searchQuery || 
                          product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || 
                            product.category.toLowerCase() === selectedCategory.toLowerCase() ||
                            product.category.toLowerCase().includes(selectedCategory.toLowerCase());
    
    const matchesBrand = !selectedBrand || 
                          product.id.includes(selectedBrand); // Using id as a proxy for brand in this mock
    
    const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    // Mock color and size matching for demo
    const matchesColor = !selectedColor || product.id.includes(selectedColor);
    const matchesSize = !selectedSize || product.id.includes(selectedSize);
    
    // Mock specifications matching
    const matchesSpecs = Object.entries(specifications).every(([key, value]) => {
      if (!value) return true;
      // In a real app, you would check against actual product specifications
      return product.description.toLowerCase().includes(value.toLowerCase());
    });
    
    return matchesSearch && 
           matchesCategory && 
           matchesBrand && 
           matchesPriceRange && 
           matchesColor &&
           matchesSize &&
           matchesSpecs;
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

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Generate pagination items
  const paginationItems = () => {
    const items = [];
    
    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink 
          isActive={currentPage === 1} 
          onClick={() => setCurrentPage(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Show ellipsis if not showing second page
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis1">
          <span className="flex h-9 w-9 items-center justify-center">...</span>
        </PaginationItem>
      );
    }
    
    // Show current page and adjacent pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue; // Skip first and last page as they're always shown
      
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            isActive={currentPage === i} 
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Show ellipsis if not showing second-to-last page
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis2">
          <span className="flex h-9 w-9 items-center justify-center">...</span>
        </PaginationItem>
      );
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink 
            isActive={currentPage === totalPages} 
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-6 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {selectedCategory ? 
                filters[0].options?.find(cat => 
                  cat.id === selectedCategory || 
                  cat.children?.some(sub => sub.id === selectedCategory)
                )?.name || 
                selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
                : 
                t('products.allProducts')
              }
            </h1>
            
            {/* Mobile Filter Toggle */}
            <div className="flex justify-between items-center md:hidden mb-4">
              <span className="text-sm text-gray-500">
                {t('products.showing')} {filteredProducts.length} {t('products.products')}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" /> {t('filter.filters')}
              </Button>
            </div>
            
            {/* Brands Slider */}
            {getCategoryBrands().length > 0 && (
              <BrandsSlider 
                brands={getCategoryBrands()} 
                selectedBrand={selectedBrand}
                onSelectBrand={handleBrandSelect}
              />
            )}
            
            {/* Search Bar and Sort */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch md:items-center mb-6">
              <form onSubmit={handleSearchSubmit} className="flex-grow">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="search"
                    placeholder={t('products.searchPlaceholder')}
                    className="pl-10 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
              
              <div className="flex items-center justify-between md:justify-end gap-4">
                <span className="text-sm text-gray-500 whitespace-nowrap">{t('products.sortBy')}:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 md:w-[180px]">
                    <SelectValue placeholder={t('products.featured')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">{t('products.featured')}</SelectItem>
                    <SelectItem value="price-low-high">{t('products.priceLowHigh')}</SelectItem>
                    <SelectItem value="price-high-low">{t('products.priceHighLow')}</SelectItem>
                    <SelectItem value="newest">{t('products.newest')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Variation Type Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              {/* Color Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={`flex items-center gap-2 ${selectedColor ? 'border-shop-primary' : ''}`}
                  >
                    {selectedColor ? (
                      <>
                        <span 
                          className="w-4 h-4 rounded-full inline-block" 
                          style={{ 
                            backgroundColor: colorOptions.find(c => c.id === selectedColor)?.color || '#000',
                            border: colorOptions.find(c => c.id === selectedColor)?.border ? '1px solid #ddd' : 'none'
                          }} 
                        />
                        {colorOptions.find(c => c.id === selectedColor)?.name || selectedColor}
                      </>
                    ) : (
                      <>
                        {t('filter.color')}
                        <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2">
                  <div className="grid grid-cols-4 gap-1">
                    {colorOptions.map(color => (
                      <button
                        key={color.id}
                        className={`flex flex-col items-center justify-center p-2 rounded hover:bg-gray-100 ${
                          selectedColor === color.id ? 'bg-gray-100 ring-2 ring-shop-primary ring-inset' : ''
                        }`}
                        onClick={() => handleFilterChange('color', selectedColor === color.id ? '' : color.id)}
                      >
                        <span 
                          className="w-6 h-6 rounded-full mb-1" 
                          style={{ 
                            backgroundColor: color.color,
                            border: color.border ? '1px solid #ddd' : 'none'
                          }} 
                        />
                        <span className="text-xs">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              
              {/* Size Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={`flex items-center gap-2 ${selectedSize ? 'border-shop-primary' : ''}`}
                  >
                    {selectedSize ? 
                      sizeOptions.find(s => s.id === selectedSize)?.name || selectedSize
                      : 
                      <>
                        {t('filter.size')}
                        <ChevronDown className="h-4 w-4" />
                      </>
                    }
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  {sizeOptions.map(size => (
                    <DropdownMenuItem 
                      key={size.id}
                      className={selectedSize === size.id ? 'bg-gray-100 font-medium' : ''}
                      onClick={() => handleFilterChange('size', selectedSize === size.id ? '' : size.id)}
                    >
                      {size.name}
                      {selectedSize === size.id && <Circle className="h-2 w-2 ml-auto fill-shop-primary" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Any applied filters will show here as pills */}
              {Object.entries(specifications).map(([key, value]) => {
                if (!value) return null;
                const specName = key.replace('spec_', '').replace(/_/g, ' ');
                return (
                  <div 
                    key={key} 
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {specName}: {value}
                    <button onClick={() => handleFilterChange(key, null)}>
                      <X className="ml-2 h-3 w-3" />
                    </button>
                  </div>
                );
              })}
              
              {/* Reset button will appear when filters are applied */}
              {(searchQuery || 
                selectedCategory || 
                selectedBrand || 
                priceRange[0] > 0 || 
                priceRange[1] < 1500 ||
                selectedColor ||
                selectedSize ||
                Object.values(specifications).some(v => v)) && (
                <button 
                  className="text-shop-primary text-sm underline"
                  onClick={resetFilters}
                >
                  {t('filter.resetAll')}
                </button>
              )}
            </div>
            
            {/* Results count */}
            <div className="hidden md:block text-gray-500 mb-6">
              {t('products.showing')} {filteredProducts.length} {t('products.results')}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters (Desktop: always visible, Mobile: collapsible) */}
            <div className={`md:w-1/4 lg:w-1/5 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <FilterSidebar 
                filters={filters}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                onResetFilters={resetFilters}
                categoryId={categoryId}
              />
            </div>
            
            {/* Products Grid */}
            <div className="md:w-3/4 lg:w-4/5">
              {sortedProducts.length > 0 ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {currentProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination className="my-8">
                      <PaginationContent>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          aria-disabled={currentPage === 1}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                        
                        {paginationItems()}
                        
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          aria-disabled={currentPage === totalPages}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationContent>
                    </Pagination>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-500 mb-4">{t('products.noProductsFound')}</p>
                  <Button variant="outline" onClick={resetFilters}>
                    {t('filter.resetFilters')}
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
