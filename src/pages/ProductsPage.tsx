
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import FilterSidebar from '@/components/products/FilterSidebar';
import FilterHeader from '@/components/products/FilterHeader';
import ProductGrid from '@/components/products/ProductGrid';
import { useLanguage } from '@/context/LanguageContext';
import { useProductFilters } from '@/hooks/useProductFilters';
import { 
  brandData, 
  colorOptions, 
  sizeOptions, 
  allProducts, 
  filterConfig 
} from '@/data/productFilterData';

const ProductsPage = () => {
  const { t } = useLanguage();
  const { categoryId } = useParams();

  // Get filter functionality using our custom hook
  const { 
    filters, 
    showFilters, 
    setShowFilters, 
    handleFilterChange, 
    resetFilters, 
    filteredProducts, 
    currentProducts, 
    totalPages,
    hasActiveFilters
  } = useProductFilters({ allProducts, categoryId });

  // Get category name for display
  const getCategoryName = () => {
    if (!filters.selectedCategory) return t('products.allProducts');
    
    const category = filterConfig[0].options?.find(cat => 
      cat.id === filters.selectedCategory || 
      cat.children?.some(sub => sub.id === filters.selectedCategory)
    );
    
    if (category) return category.name;
    
    // If category not found in our structured data, just show formatted version
    return filters.selectedCategory.charAt(0).toUpperCase() + filters.selectedCategory.slice(1);
  };

  // Get brands relevant to the selected category
  const getCategoryBrands = () => {
    // In a real application, you would filter brands based on the selected category
    // For this example, we'll just return all brands
    return brandData;
  };

  // Construct filter configuration with selected values
  const filtersConfig = [
    {
      name: t('filter.category'),
      key: 'category',
      type: 'category' as const,
      options: filterConfig[0].options
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
    category: filters.selectedCategory,
    brand: filters.selectedBrand,
    price: filters.priceRange,
    color: filters.selectedColor,
    size: filters.selectedSize,
    ...filters.specifications
  };

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterChange('page', 1);
  };

  // Handle brand selection
  const handleBrandSelect = (brandId: string) => {
    handleFilterChange('brand', filters.selectedBrand === brandId ? '' : brandId);
  };

  // Set page
  const setCurrentPage = (page: number) => {
    handleFilterChange('page', page);
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-6 md:py-12">
        <div className="container mx-auto px-4">
          {/* Filter Header Section */}
          <FilterHeader 
            categoryName={getCategoryName()}
            searchQuery={filters.searchQuery}
            setSearchQuery={(query) => handleFilterChange('search', query)}
            handleSearchSubmit={handleSearchSubmit}
            sortBy={filters.sortBy}
            setSortBy={(sort) => handleFilterChange('sort', sort)}
            selectedColor={filters.selectedColor}
            selectedSize={filters.selectedSize}
            handleFilterChange={handleFilterChange}
            colorOptions={colorOptions}
            sizeOptions={sizeOptions}
            specifications={filters.specifications}
            resetFilters={resetFilters}
            filteredProductsCount={filteredProducts.length}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            categoryBrands={getCategoryBrands()}
            selectedBrand={filters.selectedBrand}
            handleBrandSelect={handleBrandSelect}
            hasActiveFilters={hasActiveFilters}
          />

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className={`md:w-1/4 lg:w-1/5 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <FilterSidebar 
                filters={filtersConfig}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                onResetFilters={resetFilters}
                categoryId={categoryId}
              />
            </div>
            
            {/* Products Grid */}
            <div className="md:w-3/4 lg:w-4/5">
              <ProductGrid 
                products={currentProducts}
                currentPage={filters.currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                resetFilters={resetFilters}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
