
import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { useLanguage } from '@/context/LanguageContext';

// Interfaces
interface Filter {
  name: string;
  key: string;
  type: 'category' | 'brand' | 'price' | 'color' | 'size' | 'specification';
  options?: FilterOption[];
  min?: number;
  max?: number;
  value?: any;
}

interface FilterOption {
  id: string;
  name: string;
  count?: number;
  children?: FilterOption[];
}

interface FilterSidebarProps {
  filters: Filter[];
  selectedFilters: Record<string, any>;
  onFilterChange: (key: string, value: any) => void;
  onResetFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  selectedFilters,
  onFilterChange,
  onResetFilters
}) => {
  const { t, direction } = useLanguage();
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

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
      option.name.toLowerCase().includes(query)
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
                className="text-sm cursor-pointer"
              >
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

      {filters.map(filter => (
        <Collapsible key={filter.key} defaultOpen={true} className="border-t pt-4 mt-4">
          <CollapsibleTrigger className="flex justify-between items-center w-full py-2 font-medium">
            <span>{t(`filter.${filter.key}`)}</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-2">
            {/* Search input for categories and brands */}
            {['category', 'brand'].includes(filter.type) && (
              <div className="relative mb-3">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder={`${t('filter.search')}...`}
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
            
            {/* Categories, brands, or specifications with checkboxes */}
            {['category', 'brand', 'specification', 'color', 'size'].includes(filter.type) && (
              <div className="max-h-56 overflow-y-auto pr-2">
                {renderFilterOptions(getFilteredOptions(filter), 0, filter.key)}
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export default FilterSidebar;
