
import React from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  ChevronDown,
  Circle,
  X
} from 'lucide-react';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/context/LanguageContext';
import BrandsSlider from './BrandsSlider';

interface Brand {
  id: string;
  name: string;
  logo: string;
}

interface ColorOption {
  id: string;
  name: string;
  color: string;
  border?: boolean;
}

interface SizeOption {
  id: string;
  name: string;
}

interface FilterHeaderProps {
  categoryName: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchSubmit: (e: React.FormEvent) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  selectedColor: string;
  selectedSize: string;
  handleFilterChange: (key: string, value: any) => void;
  colorOptions: ColorOption[];
  sizeOptions: SizeOption[];
  specifications: Record<string, string>;
  resetFilters: () => void;
  filteredProductsCount: number;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  categoryBrands: Brand[];
  selectedBrand: string;
  handleBrandSelect: (brandId: string) => void;
  hasActiveFilters: boolean;
}

const FilterHeader: React.FC<FilterHeaderProps> = ({
  categoryName,
  searchQuery,
  setSearchQuery,
  handleSearchSubmit,
  sortBy,
  setSortBy,
  selectedColor,
  selectedSize,
  handleFilterChange,
  colorOptions,
  sizeOptions,
  specifications,
  resetFilters,
  filteredProductsCount,
  showFilters,
  setShowFilters,
  categoryBrands,
  selectedBrand,
  handleBrandSelect,
  hasActiveFilters
}) => {
  const { t } = useLanguage();

  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {categoryName}
      </h1>
      
      {/* Mobile Filter Toggle */}
      <div className="flex justify-between items-center md:hidden mb-4">
        <span className="text-sm text-gray-500">
          {t('products.showing')} {filteredProductsCount} {t('products.products')}
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
      {categoryBrands.length > 0 && (
        <BrandsSlider 
          brands={categoryBrands} 
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
        
        {/* Applied specification filters shown as pills */}
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
        {hasActiveFilters && (
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
        {t('products.showing')} {filteredProductsCount} {t('products.results')}
      </div>
    </div>
  );
};

export default FilterHeader;
