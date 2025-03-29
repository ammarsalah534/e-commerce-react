
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const CartSummary: React.FC = () => {
  const { subtotal, totalItems } = useCart();
  
  // Calculate additional costs
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08; // Assuming 8% tax rate
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      {/* Summary Items */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({totalItems} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          {shipping === 0 ? (
            <span className="text-shop-success">Free</span>
          ) : (
            <span>${shipping.toFixed(2)}</span>
          )}
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Estimated Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      {/* Total */}
      <div className="flex justify-between mb-6">
        <span className="font-semibold">Total</span>
        <span className="font-semibold text-lg">${total.toFixed(2)}</span>
      </div>
      
      {/* Checkout Button */}
      <Button 
        className="w-full mb-4"
        disabled={totalItems === 0}
      >
        <Link to="/checkout" className="flex items-center justify-center w-full">
          Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      
      {/* Continue Shopping */}
      <Button variant="outline" className="w-full">
        <Link to="/products" className="w-full">
          Continue Shopping
        </Link>
      </Button>
      
      {/* Promotion Code - could be expanded in the future */}
      <div className="mt-6 text-sm text-gray-500">
        <p>Free shipping on orders over $100</p>
      </div>
    </div>
  );
};

export default CartSummary;
