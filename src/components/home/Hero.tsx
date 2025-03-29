
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-shop-primary to-blue-900 text-white py-16 md:py-24 overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white opacity-10"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full bg-white opacity-5"></div>
        <div className="absolute bottom-0 right-1/3 w-32 h-32 rounded-full bg-white opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="animate-slide-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Discover Amazing Products For Your Lifestyle
            </h1>
            <p className="mt-4 md:mt-6 text-lg md:text-xl text-blue-100 max-w-lg">
              Shop the latest trends with exclusive deals on our carefully curated collection.
            </p>
            <div className="mt-8 md:mt-10 flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-shop-primary hover:bg-blue-100 transition-colors">
                <Link to="/products" className="flex items-center">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-shop-primary transition-colors">
                <Link to="/categories">Explore Categories</Link>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hidden md:block animate-slide-up">
            <img 
              src="https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyMzMzMDEyNA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080" 
              alt="Shopping product display" 
              className="w-full h-auto rounded-lg shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
