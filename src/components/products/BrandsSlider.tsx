
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

interface Brand {
  id: string;
  name: string;
  logo: string;
}

interface BrandsSliderProps {
  brands: Brand[];
  selectedBrand: string | null;
  onSelectBrand: (brandId: string) => void;
}

const BrandsSlider: React.FC<BrandsSliderProps> = ({ 
  brands, 
  selectedBrand, 
  onSelectBrand 
}) => {
  const { direction } = useLanguage();
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 200;
      const currentScroll = sliderRef.current.scrollLeft;
      
      sliderRef.current.scrollTo({
        left: direction === 'left' 
          ? currentScroll - scrollAmount 
          : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative mb-8" dir={direction}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Top Brands</h3>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-full"
            onClick={() => scroll('left')}
          >
            {direction === 'rtl' ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-full"
            onClick={() => scroll('right')}
          >
            {direction === 'rtl' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <div 
        ref={sliderRef}
        className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {brands.map(brand => (
          <button
            key={brand.id}
            onClick={() => onSelectBrand(brand.id)}
            className={`flex flex-col items-center justify-center min-w-[100px] h-20 p-2 border rounded-lg transition-colors ${
              selectedBrand === brand.id 
                ? 'border-shop-primary bg-shop-primary/10' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <img 
              src={brand.logo} 
              alt={brand.name} 
              className="h-10 w-auto object-contain mb-1"
            />
            <span className="text-xs text-center truncate w-full">{brand.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrandsSlider;
