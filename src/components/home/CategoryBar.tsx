
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Shirt, 
  User, 
  Home as HomeIcon, 
  Sparkles, 
  Baby, 
  ShoppingCart, 
  Dumbbell,
  Star,
  Tags,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

interface CategoryItem {
  name: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  subcategories?: SubcategoryItem[];
}

interface SubcategoryItem {
  name: string;
  path: string;
  subItems?: SubSubcategoryItem[];
}

interface SubSubcategoryItem {
  name: string;
  path: string;
}

const CategoryBar: React.FC = () => {
  const { t, direction } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<CategoryItem | null>(null);
  const [hoveredCategoryTimeout, setHoveredCategoryTimeout] = useState<NodeJS.Timeout | null>(null);

  const categories: CategoryItem[] = [
    { 
      name: t('category.all'),
      icon: <Tags size={20} />, 
      path: '/categories', 
      color: 'bg-gray-100',
      subcategories: []
    },
    { 
      name: t('category.electronics'),
      icon: <Smartphone size={20} />, 
      path: '/category/electronics', 
      color: 'bg-blue-100',
      subcategories: [
        {
          name: t('subcategory.phones'),
          path: '/category/electronics/phones',
          subItems: [
            { name: t('subsubcategory.smartphones'), path: '/category/electronics/phones/smartphones' },
            { name: t('subsubcategory.featurephones'), path: '/category/electronics/phones/feature-phones' },
          ]
        },
        {
          name: t('subcategory.laptops'),
          path: '/category/electronics/laptops',
          subItems: [
            { name: t('subsubcategory.gaming'), path: '/category/electronics/laptops/gaming' },
            { name: t('subsubcategory.business'), path: '/category/electronics/laptops/business' },
            { name: t('subsubcategory.ultrabooks'), path: '/category/electronics/laptops/ultrabooks' },
          ]
        },
        {
          name: t('subcategory.tablets'),
          path: '/category/electronics/tablets',
          subItems: [
            { name: t('subsubcategory.android'), path: '/category/electronics/tablets/android' },
            { name: t('subsubcategory.ios'), path: '/category/electronics/tablets/ios' },
          ]
        },
        {
          name: t('subcategory.cameras'),
          path: '/category/electronics/cameras',
          subItems: [
            { name: t('subsubcategory.dslr'), path: '/category/electronics/cameras/dslr' },
            { name: t('subsubcategory.mirrorless'), path: '/category/electronics/cameras/mirrorless' },
            { name: t('subsubcategory.pointshoot'), path: '/category/electronics/cameras/point-shoot' },
          ]
        },
      ]
    },
    { 
      name: t('category.men'),
      icon: <Shirt size={20} />, 
      path: '/category/men', 
      color: 'bg-indigo-100',
      subcategories: [
        {
          name: t('subcategory.clothing'),
          path: '/category/men/clothing',
          subItems: [
            { name: t('subsubcategory.shirts'), path: '/category/men/clothing/shirts' },
            { name: t('subsubcategory.pants'), path: '/category/men/clothing/pants' },
            { name: t('subsubcategory.suits'), path: '/category/men/clothing/suits' },
          ]
        },
        {
          name: t('subcategory.footwear'),
          path: '/category/men/footwear',
          subItems: [
            { name: t('subsubcategory.casual'), path: '/category/men/footwear/casual' },
            { name: t('subsubcategory.formal'), path: '/category/men/footwear/formal' },
            { name: t('subsubcategory.sports'), path: '/category/men/footwear/sports' },
          ]
        },
        {
          name: t('subcategory.accessories'),
          path: '/category/men/accessories',
          subItems: [
            { name: t('subsubcategory.watches'), path: '/category/men/accessories/watches' },
            { name: t('subsubcategory.belts'), path: '/category/men/accessories/belts' },
            { name: t('subsubcategory.wallets'), path: '/category/men/accessories/wallets' },
          ]
        },
      ]
    },
    { 
      name: t('category.women'),
      icon: <User size={20} />, 
      path: '/category/women', 
      color: 'bg-pink-100',
      subcategories: [
        {
          name: t('subcategory.clothing'),
          path: '/category/women/clothing',
          subItems: [
            { name: t('subsubcategory.dresses'), path: '/category/women/clothing/dresses' },
            { name: t('subsubcategory.tops'), path: '/category/women/clothing/tops' },
            { name: t('subsubcategory.pants'), path: '/category/women/clothing/pants' },
          ]
        },
        {
          name: t('subcategory.footwear'),
          path: '/category/women/footwear',
          subItems: [
            { name: t('subsubcategory.heels'), path: '/category/women/footwear/heels' },
            { name: t('subsubcategory.flats'), path: '/category/women/footwear/flats' },
            { name: t('subsubcategory.boots'), path: '/category/women/footwear/boots' },
          ]
        },
        {
          name: t('subcategory.accessories'),
          path: '/category/women/accessories',
          subItems: [
            { name: t('subsubcategory.jewelry'), path: '/category/women/accessories/jewelry' },
            { name: t('subsubcategory.bags'), path: '/category/women/accessories/bags' },
            { name: t('subsubcategory.scarves'), path: '/category/women/accessories/scarves' },
          ]
        },
      ]
    },
    { 
      name: t('category.home'),
      icon: <HomeIcon size={20} />, 
      path: '/category/home-kitchen', 
      color: 'bg-amber-100',
      subcategories: [
        {
          name: t('subcategory.furniture'),
          path: '/category/home/furniture',
          subItems: [
            { name: t('subsubcategory.living'), path: '/category/home/furniture/living' },
            { name: t('subsubcategory.bedroom'), path: '/category/home/furniture/bedroom' },
            { name: t('subsubcategory.dining'), path: '/category/home/furniture/dining' },
          ]
        },
        {
          name: t('subcategory.kitchen'),
          path: '/category/home/kitchen',
          subItems: [
            { name: t('subsubcategory.appliances'), path: '/category/home/kitchen/appliances' },
            { name: t('subsubcategory.cookware'), path: '/category/home/kitchen/cookware' },
            { name: t('subsubcategory.utensils'), path: '/category/home/kitchen/utensils' },
          ]
        },
      ]
    },
    { 
      name: t('category.beauty'),
      icon: <Sparkles size={20} />, 
      path: '/category/beauty', 
      color: 'bg-purple-100',
      subcategories: [
        {
          name: t('subcategory.skincare'),
          path: '/category/beauty/skincare',
          subItems: [
            { name: t('subsubcategory.cleansers'), path: '/category/beauty/skincare/cleansers' },
            { name: t('subsubcategory.moisturizers'), path: '/category/beauty/skincare/moisturizers' },
          ]
        },
        {
          name: t('subcategory.makeup'),
          path: '/category/beauty/makeup',
          subItems: [
            { name: t('subsubcategory.face'), path: '/category/beauty/makeup/face' },
            { name: t('subsubcategory.eye'), path: '/category/beauty/makeup/eye' },
            { name: t('subsubcategory.lip'), path: '/category/beauty/makeup/lip' },
          ]
        },
      ]
    },
    { 
      name: t('category.toys'),
      icon: <Baby size={20} />, 
      path: '/category/toys', 
      color: 'bg-green-100',
      subcategories: []
    },
    { 
      name: t('category.grocery'),
      icon: <ShoppingCart size={20} />, 
      path: '/category/grocery', 
      color: 'bg-yellow-100',
      subcategories: []
    },
    { 
      name: t('category.sports'),
      icon: <Dumbbell size={20} />, 
      path: '/category/sports', 
      color: 'bg-red-100',
      subcategories: []
    },
    { 
      name: t('category.bestsellers'),
      icon: <Star size={20} />, 
      path: '/bestsellers', 
      color: 'bg-emerald-100',
      subcategories: []
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 200;
      const currentScroll = containerRef.current.scrollLeft;
      
      containerRef.current.scrollTo({
        left: direction === 'left' 
          ? currentScroll - scrollAmount 
          : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleCategoryMouseEnter = (category: CategoryItem) => {
    if (hoveredCategoryTimeout) {
      clearTimeout(hoveredCategoryTimeout);
      setHoveredCategoryTimeout(null);
    }
    setHoveredCategory(category);
  };

  const handleCategoryMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredCategory(null);
    }, 300);
    setHoveredCategoryTimeout(timeout);
  };

  const handleSubcategoriesMouseEnter = () => {
    if (hoveredCategoryTimeout) {
      clearTimeout(hoveredCategoryTimeout);
      setHoveredCategoryTimeout(null);
    }
  };

  const handleSubcategoriesMouseLeave = () => {
    handleCategoryMouseLeave();
  };

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const isOverflowing = containerRef.current.scrollWidth > containerRef.current.clientWidth;
        setShowControls(isOverflowing);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    
    return () => {
      window.removeEventListener('resize', checkOverflow);
      if (hoveredCategoryTimeout) {
        clearTimeout(hoveredCategoryTimeout);
      }
    };
  }, [hoveredCategoryTimeout]);

  return (
    <div className="border-b bg-white relative" dir={direction}>
      <div className="container mx-auto px-4 relative">
        {showControls && (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 shadow-md rounded-full"
              onClick={() => scroll('left')}
            >
              {direction === 'rtl' ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 shadow-md rounded-full"
              onClick={() => scroll('right')}
            >
              {direction === 'rtl' ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </Button>
          </>
        )}

        <div 
          ref={containerRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex py-3 space-x-4 min-w-max">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                to={category.path} 
                className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium whitespace-nowrap hover:text-shop-primary transition-colors"
                onMouseEnter={() => handleCategoryMouseEnter(category)}
                onMouseLeave={handleCategoryMouseLeave}
              >
                {category.icon}
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Subcategories dropdown */}
        {hoveredCategory && hoveredCategory.subcategories && hoveredCategory.subcategories.length > 0 && (
          <div 
            className="absolute left-0 right-0 bg-white shadow-lg z-50 p-6 border-t"
            onMouseEnter={handleSubcategoriesMouseEnter}
            onMouseLeave={handleSubcategoriesMouseLeave}
          >
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {hoveredCategory.subcategories.map(subcategory => (
                <div key={subcategory.name} className="space-y-3">
                  <Link to={subcategory.path} className="font-semibold text-gray-800 hover:text-shop-primary block border-b pb-2">
                    {subcategory.name}
                  </Link>
                  {subcategory.subItems && subcategory.subItems.length > 0 && (
                    <ul className="space-y-1">
                      {subcategory.subItems.map(item => (
                        <li key={item.name}>
                          <Link to={item.path} className="text-gray-600 hover:text-shop-primary text-sm">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryBar;
