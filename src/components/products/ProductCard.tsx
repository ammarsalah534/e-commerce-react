
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart, Product } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <div 
      className={`group bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${
        featured ? 'transform hover:scale-[1.02]' : 'hover:scale-[1.01]'
      }`}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative">
          {/* Product Image */}
          <div className="h-48 sm:h-64 overflow-hidden relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Discount Badge - if needed */}
            {/* <Badge className="absolute top-2 left-2 bg-shop-error font-medium">
              20% OFF
            </Badge> */}

            {/* Quick Actions Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-white text-shop-dark hover:bg-shop-primary hover:text-white transition-colors"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-white text-shop-dark hover:bg-shop-primary hover:text-white transition-colors"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            {/* Category */}
            <p className="text-sm text-gray-500 mb-1">{product.category}</p>
            
            {/* Product Name */}
            <h3 className="font-medium text-gray-900 group-hover:text-shop-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
            
            {/* Price */}
            <div className="mt-2 flex items-center justify-between">
              <p className="text-lg font-semibold text-shop-primary">
                ${product.price.toFixed(2)}
              </p>
              
              {/* Add to Cart - visible on mobile */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden text-gray-600 hover:text-shop-primary transition-colors"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
