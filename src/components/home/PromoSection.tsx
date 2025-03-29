
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Clock } from 'lucide-react';

const PromoSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-shop-light">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Special Offer Banner */}
          <div className="relative overflow-hidden rounded-xl shadow-md bg-gradient-to-r from-blue-500 to-shop-primary text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full transform -translate-x-16 translate-y-16"></div>
            
            <div className="relative z-10 p-8 md:p-10">
              <Badge className="bg-white text-shop-primary mb-4">Limited Time Offer</Badge>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Summer Sale</h3>
              <p className="text-lg md:text-xl font-light mb-3">Up to 50% off on selected items</p>
              <p className="text-blue-100 mb-6">Hurry while stocks last! Shop our summer collection at unbeatable prices.</p>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>Ends in 3 days</span>
                </div>
              </div>
              
              <Button className="bg-white text-shop-primary hover:bg-blue-100 transition-colors">
                <Link to="/sales/summer" className="flex items-center">
                  Shop Now <ShoppingBag className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* New Arrivals Banner */}
          <div className="relative overflow-hidden rounded-xl shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
              alt="New Collection" 
              className="w-full h-full object-cover"
              style={{ minHeight: "250px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <Badge className="bg-white text-shop-primary mb-4">Just Arrived</Badge>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">New Collection</h3>
              <p className="text-gray-200 mb-6">Explore our latest arrivals for the upcoming season</p>
              
              <Button className="bg-white text-shop-primary hover:bg-gray-100 transition-colors">
                <Link to="/new-arrivals" className="flex items-center">
                  Discover Now <ShoppingBag className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
