
import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/context/LanguageContext';

// Interfaces
interface FilterOption {
  id: string;
  name: string;
  count?: number;
  children?: FilterOption[];
  icon?: string;
  color?: string;
}

interface Filter {
  name: string;
  key: string;
  type: 'category' | 'brand' | 'price' | 'color' | 'size' | 'specification';
  options?: FilterOption[];
  min?: number;
  max?: number;
  value?: any;
  specifications?: string[];
}

interface FilterSidebarProps {
  filters: Filter[];
  selectedFilters: Record<string, any>;
  onFilterChange: (key: string, value: any) => void;
  onResetFilters: () => void;
  categoryId?: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  selectedFilters,
  onFilterChange,
  onResetFilters,
  categoryId
}) => {
  const { t, direction } = useLanguage();
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Dynamically set specifications based on category
  useEffect(() => {
    if (categoryId) {
      // Here we would typically fetch specifications from a server
      // For this example, we'll just simulate it with some static data
      const categorySpecifications: Record<string, string[]> = {
        'electronics': ['Memory Size', 'Screen Size', 'Battery Capacity', 'Processor'],
        'phones': ['Memory Size', 'Camera MP', 'Battery Capacity', 'Storage'],
        'laptops': ['Screen Size', 'RAM', 'Storage', 'Processor'],
        'clothing': ['Material', 'Season', 'Style', 'Pattern'],
        'furniture': ['Material', 'Style', 'Assembly Required', 'Dimensions']
      };
      
      // Find if we have specifications for this category
      const specs = Object.keys(categorySpecifications).find(key => 
        categoryId.toLowerCase().includes(key)
      );
      
      if (specs) {
        // Add specifications filter if we have it for this category
        const specFilter = filters.find(f => f.key === 'specifications');
        if (specFilter) {
          specFilter.specifications = categorySpecifications[specs];
        }
      }
    }
  }, [categoryId, filters]);

  const handleSearchChange = (filterKey: string, value: string) => {
    setSearchQueries(prev => ({ ...prev, [filterKey]: value }));
  };

  const toggleCategoryExpand = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const getFilteredOptions = (filter: Filter) => {
    if (!filter.options) return [];
    
    const query = searchQueries[filter.key]?.toLowerCase() || '';
    if (!query) return filter.options;
    
    return filter.options.filter(option => 
      option.name.toLowerCase().includes(query) ||
      option.children?.some(child => child.name.toLowerCase().includes(query))
    );
  };
  
  const renderFilterOptions = (options: FilterOption[], depth = 0, parentKey = '') => {
    return options.map(option => {
      const optionKey = `${parentKey}${option.id}`;
      const isSelected = selectedFilters[parentKey] === option.id || 
                          (Array.isArray(selectedFilters[parentKey]) && 
                           selectedFilters[parentKey].includes(option.id));
      const hasChildren = option.children && option.children.length > 0;
      const isExpanded = expandedCategories[optionKey] || false;
      
      return (
        <div key={optionKey} className={`${depth > 0 ? 'ml-4' : ''}`}>
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={optionKey}
                checked={isSelected}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onFilterChange(parentKey, 
                      Array.isArray(selectedFilters[parentKey]) 
                        ? [...selectedFilters[parentKey], option.id] 
                        : option.id
                    );
                  } else {
                    if (Array.isArray(selectedFilters[parentKey])) {
                      onFilterChange(
                        parentKey, 
                        selectedFilters[parentKey].filter((id: string) => id !== option.id)
                      );
                    } else {
                      onFilterChange(parentKey, null);
                    }
                  }
                }}
              />
              <label 
                htmlFor={optionKey}
                className="text-sm cursor-pointer flex items-center"
              >
                {option.color && (
                  <span 
                    className="inline-block w-4 h-4 rounded-full mr-2" 
                    style={{ backgroundColor: option.color }}
                  />
                )}
                {option.name}
                {option.count !== undefined && (
                  <span className="text-gray-500 text-xs ml-1">({option.count})</span>
                )}
              </label>
            </div>
            
            {hasChildren && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0" 
                onClick={() => toggleCategoryExpand(optionKey)}
              >
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            )}
          </div>
          
          {hasChildren && isExpanded && (
            <div className="mt-1">
              {renderFilterOptions(option.children!, depth + 1, parentKey)}
            </div>
          )}
        </div>
      );
    });
  };

  const renderSpecificationFilters = (filter: Filter) => {
    if (!filter.specifications || filter.specifications.length === 0) {
      return <div className="text-sm text-gray-500">{t('filter.noSpecifications')}</div>;
    }

    return (
      <div className="space-y-4">
        {filter.specifications.map(spec => {
          const specKey = `spec_${spec.toLowerCase().replace(/\s+/g, '_')}`;
          return (
            <div key={specKey} className="space-y-2">
              <h4 className="text-sm font-medium">{spec}</h4>
              <Checkbox
                id={`${specKey}_all`}
                checked={selectedFilters[specKey] === 'all'}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onFilterChange(specKey, 'all');
                  } else {
                    onFilterChange(specKey, null);
                  }
                }}
              />
              <label htmlFor={`${specKey}_all`} className="text-sm ml-2">
                {t('filter.all')}
              </label>
              
              {/* This would typically be populated with actual options from the backend */}
              {spec === 'Memory Size' && (
                <div className="space-y-1 ml-6">
                  {['4GB', '8GB', '16GB', '32GB'].map(val => (
                    <div key={val} className="flex items-center">
                      <Checkbox
                        id={`${specKey}_${val}`}
                        checked={selectedFilters[specKey] === val}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            onFilterChange(specKey, val);
                          } else if (selectedFilters[specKey] === val) {
                            onFilterChange(specKey, null);
                          }
                        }}
                      />
                      <label htmlFor={`${specKey}_${val}`} className="text-sm ml-2">
                        {val}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              
              {spec === 'Screen Size' && (
                <div className="space-y-1 ml-6">
                  {['13"', '14"', '15.6"', '17"'].map(val => (
                    <div key={val} className="flex items-center">
                      <Checkbox
                        id={`${specKey}_${val}`}
                        checked={selectedFilters[specKey] === val}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            onFilterChange(specKey, val);
                          } else if (selectedFilters[specKey] === val) {
                            onFilterChange(specKey, null);
                          }
                        }}
                      />
                      <label htmlFor={`${specKey}_${val}`} className="text-sm ml-2">
                        {val}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              
              {spec === 'Battery Capacity' && (
                <div className="space-y-1 ml-6">
                  {['3000mAh', '4000mAh', '5000mAh', '6000mAh'].map(val => (
                    <div key={val} className="flex items-center">
                      <Checkbox
                        id={`${specKey}_${val}`}
                        checked={selectedFilters[specKey] === val}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            onFilterChange(specKey, val);
                          } else if (selectedFilters[specKey] === val) {
                            onFilterChange(specKey, null);
                          }
                        }}
                      />
                      <label htmlFor={`${specKey}_${val}`} className="text-sm ml-2">
                        {val}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              
              {spec === 'Material' && (
                <div className="space-y-1 ml-6">
                  {['Cotton', 'Polyester', 'Wool', 'Leather', 'Wood', 'Metal'].map(val => (
                    <div key={val} className="flex items-center">
                      <Checkbox
                        id={`${specKey}_${val}`}
                        checked={selectedFilters[specKey] === val}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            onFilterChange(specKey, val);
                          } else if (selectedFilters[specKey] === val) {
                            onFilterChange(specKey, null);
                          }
                        }}
                      />
                      <label htmlFor={`${specKey}_${val}`} className="text-sm ml-2">
                        {val}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6" dir={direction}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-lg">{t('filter.filters')}</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onResetFilters}
          className="text-sm"
        >
          {t('filter.reset')}
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={['category', 'brand', 'price']} className="space-y-2">
        {filters.map(filter => (
          <AccordionItem key={filter.key} value={filter.key} className="border-b pb-2">
            <AccordionTrigger className="py-2 font-medium">
              {t(`filter.${filter.key}`)}
            </AccordionTrigger>
            <AccordionContent className="pt-2 space-y-2">
              {/* Search input for categories and brands */}
              {['category', 'brand'].includes(filter.type) && (
                <div className="relative mb-3">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="search"
                    placeholder={`${t('filter.search')} ${t(`filter.${filter.key}`)}...`}
                    value={searchQueries[filter.key] || ''}
                    onChange={(e) => handleSearchChange(filter.key, e.target.value)}
                    className="pl-8 w-full text-sm"
                  />
                  {searchQueries[filter.key] && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-0 top-0 h-full"
                      onClick={() => handleSearchChange(filter.key, '')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
              
              {/* Price range slider */}
              {filter.type === 'price' && (
                <div className="px-2 mt-6">
                  <Slider
                    defaultValue={[filter.min || 0, filter.max || 1000]}
                    value={selectedFilters[filter.key] || [filter.min || 0, filter.max || 1000]}
                    onValueChange={(value) => onFilterChange(filter.key, value)}
                    max={filter.max || 1000}
                    step={10}
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-sm">${selectedFilters[filter.key]?.[0] || filter.min || 0}</span>
                    <span className="text-sm">${selectedFilters[filter.key]?.[1] || filter.max || 1000}</span>
                  </div>
                </div>
              )}
              
              {/* Categories, brands with checkboxes */}
              {['category', 'brand'].includes(filter.type) && (
                <div className="max-h-56 overflow-y-auto pr-2">
                  {renderFilterOptions(getFilteredOptions(filter), 0, filter.key)}
                </div>
              )}
              
              {/* Color filters */}
              {filter.type === 'color' && (
                <div className="max-h-56 overflow-y-auto pr-2">
                  {renderFilterOptions(filter.options || [], 0, filter.key)}
                </div>
              )}
              
              {/* Size filters */}
              {filter.type === 'size' && (
                <div className="max-h-56 overflow-y-auto pr-2">
                  {renderFilterOptions(filter.options || [], 0, filter.key)}
                </div>
              )}
              
              {/* Specification filters */}
              {filter.type === 'specification' && renderSpecificationFilters(filter)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FilterSidebar;
