
import React from 'react';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { Product } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

interface ProductGridProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  resetFilters: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  currentPage, 
  totalPages, 
  setCurrentPage, 
  resetFilters 
}) => {
  const { t } = useLanguage();

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

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500 mb-4">{t('products.noProductsFound')}</p>
        <Button variant="outline" onClick={resetFilters}>
          {t('filter.resetFilters')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="my-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationLink 
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                aria-disabled={currentPage === 1}
              >
                <span>Previous</span>
              </PaginationLink>
            </PaginationItem>
            
            {paginationItems()}
            
            <PaginationItem>
              <PaginationLink 
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                aria-disabled={currentPage === totalPages}
              >
                <span>Next</span>
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ProductGrid;
