
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const CartPage: React.FC = () => {
  const { items, clearCart, totalItems } = useCart();

  return (
    <Layout>
      <div className="bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
          
          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Cart Items ({totalItems})</h2>
                    <Button 
                      variant="ghost" 
                      className="text-gray-500 hover:text-shop-error"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  </div>
                  
                  {/* Cart Items List */}
                  <div className="divide-y">
                    {items.map((item) => (
                      <CartItem key={item.product.id} item={item} />
                    ))}
                  </div>
                  
                  {/* Continue Shopping */}
                  <div className="mt-8 text-center sm:text-left">
                    <Link to="/products" className="text-shop-primary hover:underline inline-flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 rotate-180" /> Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <CartSummary />
              </div>
            </div>
          ) : (
            // Empty Cart
            <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added any products to your cart yet.
                Browse our products and find something you like!
              </p>
              <Button>
                <Link to="/products" className="flex items-center">
                  Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
