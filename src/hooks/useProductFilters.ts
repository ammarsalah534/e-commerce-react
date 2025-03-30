
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '@/context/CartContext';

interface UseProductFiltersProps {
  allProducts: Product[];
  categoryId?: string;
  initialFilters?: {
    searchQuery?: string;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    color?: string;
    size?: string;
    sort?: string;
    page?: number;
  };
}

interface ProductFilters {
  searchQuery: string;
  selectedCategory: string;
  selectedBrand: string;
  priceRange: [number, number];
  selectedColor: string;
  selectedSize: string;
  specifications: Record<string, string>;
  sortBy: string;
  currentPage: number;
}

export function useProductFilters({ 
  allProducts, 
  categoryId, 
  initialFilters 
}: UseProductFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Filter state
  const [filters, setFilters] = useState<ProductFilters>({
    searchQuery: searchParams.get('search') || '',
    selectedCategory: categoryId || searchParams.get('category') || '',
    selectedBrand: searchParams.get('brand') || '',
    priceRange: [
      parseInt(searchParams.get('minPrice') || '0'), 
      parseInt(searchParams.get('maxPrice') || '1500')
    ],
    selectedColor: searchParams.get('color') || '',
    selectedSize: searchParams.get('size') || '',
    specifications: {},
    sortBy: searchParams.get('sort') || 'featured',
    currentPage: parseInt(searchParams.get('page') || '1')
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const productsPerPage = 50;

  // Set initial specifications from URL params
  useEffect(() => {
    const specs: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (key.startsWith('spec_')) {
        specs[key] = value;
      }
    });
    setFilters(prev => ({ ...prev, specifications: specs }));
  }, []);

  // Update URL params when filters change
  useEffect(() => {
    const newParams = new URLSearchParams();
    
    if (filters.searchQuery) newParams.set('search', filters.searchQuery);
    if (filters.selectedCategory) newParams.set('category', filters.selectedCategory);
    if (filters.selectedBrand) newParams.set('brand', filters.selectedBrand);
    if (filters.priceRange[0] > 0) newParams.set('minPrice', filters.priceRange[0].toString());
    if (filters.priceRange[1] < 1500) newParams.set('maxPrice', filters.priceRange[1].toString());
    if (filters.selectedColor) newParams.set('color', filters.selectedColor);
    if (filters.selectedSize) newParams.set('size', filters.selectedSize);
    if (filters.sortBy !== 'featured') newParams.set('sort', filters.sortBy);
    if (filters.currentPage > 1) newParams.set('page', filters.currentPage.toString());
    
    // Add specifications to URL
    Object.entries(filters.specifications).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
    });
    
    setSearchParams(newParams);
  }, [filters, setSearchParams]);

  // Handle filter changes
  const handleFilterChange = (key: string, value: any) => {
    // Reset to page 1 when changing filters
    setFilters(prev => ({ ...prev, currentPage: 1 }));
    
    switch (key) {
      case 'category':
        setFilters(prev => ({ ...prev, selectedCategory: value }));
        break;
      case 'brand':
        setFilters(prev => ({ ...prev, selectedBrand: value }));
        break;
      case 'price':
        setFilters(prev => ({ ...prev, priceRange: value }));
        break;
      case 'color':
        setFilters(prev => ({ ...prev, selectedColor: value }));
        break;
      case 'size':
        setFilters(prev => ({ ...prev, selectedSize: value }));
        break;
      case 'search':
        setFilters(prev => ({ ...prev, searchQuery: value }));
        break;
      case 'sort':
        setFilters(prev => ({ ...prev, sortBy: value }));
        break;
      case 'page':
        setFilters(prev => ({ ...prev, currentPage: value }));
        break;
      default:
        // Handle specification filters
        if (key.startsWith('spec_')) {
          setFilters(prev => ({
            ...prev,
            specifications: { ...prev.specifications, [key]: value }
          }));
        }
    }
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedCategory: '',
      selectedBrand: '',
      priceRange: [0, 1500],
      selectedColor: '',
      selectedSize: '',
      specifications: {},
      sortBy: 'featured',
      currentPage: 1
    });
  };

  // Filter products based on all filters
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = !filters.searchQuery || 
                          product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
    const matchesCategory = !filters.selectedCategory || 
                            product.category.toLowerCase() === filters.selectedCategory.toLowerCase() ||
                            product.category.toLowerCase().includes(filters.selectedCategory.toLowerCase());
    
    const matchesBrand = !filters.selectedBrand || 
                          product.id.includes(filters.selectedBrand); // Using id as a proxy for brand in this mock
    
    const matchesPriceRange = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    
    // Mock color and size matching for demo
    const matchesColor = !filters.selectedColor || product.id.includes(filters.selectedColor);
    const matchesSize = !filters.selectedSize || product.id.includes(filters.selectedSize);
    
    // Mock specifications matching
    const matchesSpecs = Object.entries(filters.specifications).every(([key, value]) => {
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
    switch (filters.sortBy) {
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
  const indexOfLastProduct = filters.currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  
  // Calculate if there are any active filters
  const hasActiveFilters = (
    filters.searchQuery !== '' || 
    filters.selectedCategory !== categoryId || 
    filters.selectedBrand !== '' || 
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < 1500 ||
    filters.selectedColor !== '' ||
    filters.selectedSize !== '' ||
    Object.values(filters.specifications).some(v => v)
  );

  return {
    filters,
    setFilters,
    showFilters,
    setShowFilters,
    handleFilterChange,
    resetFilters,
    filteredProducts,
    sortedProducts,
    currentProducts,
    totalPages,
    hasActiveFilters
  };
}
