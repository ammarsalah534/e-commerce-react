
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType, useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  const handleIncreaseQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeItem(product.id);
    }
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-gray-200 animate-fade-in">
      {/* Product Image */}
      <Link to={`/products/${product.id}`} className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded overflow-hidden mr-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-grow mt-2 sm:mt-0">
        <Link to={`/products/${product.id}`} className="font-medium text-gray-900 hover:text-shop-primary transition-colors">
          {product.name}
        </Link>
        <p className="text-sm text-gray-500 mt-1">{product.category}</p>
      </div>

      {/* Price */}
      <div className="text-right mt-2 sm:mt-0 ml-0 sm:ml-4">
        <div className="flex items-center justify-end mb-2">
          <p className="text-sm text-gray-500 mr-2">${product.price.toFixed(2)} × {quantity}</p>
          <p className="font-medium">${totalPrice.toFixed(2)}</p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-end">
          <div className="flex items-center border rounded">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none border-r" 
              onClick={handleDecreaseQuantity}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="px-3">{quantity}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none border-l" 
              onClick={handleIncreaseQuantity}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-2 text-gray-400 hover:text-shop-error" 
            onClick={handleRemove}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
