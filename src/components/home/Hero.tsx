
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="py-4 bg-yellow-400">
      <div className="container mx-auto px-4">
        <Carousel className="w-full">
          <CarouselContent>
            {/* First Banner */}
            <CarouselItem>
              <div className="relative rounded-md overflow-hidden h-64 md:h-80 bg-gray-600 w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-700/30 z-10"></div>
                <div className="absolute top-0 left-0 right-0 p-6 z-20 flex flex-col h-full justify-center">
                  <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">Up to 65% off</h2>
                  <p className="text-white text-lg mb-4">Building essentials</p>
                  <Button className="bg-white text-gray-800 hover:bg-white/90 w-32">
                    <Link to="/sale">SHOP NOW</Link>
                  </Button>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Building essentials sale" 
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>

            {/* Second Banner */}
            <CarouselItem>
              <div className="relative rounded-md overflow-hidden h-64 md:h-80 bg-blue-600 w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-700/30 z-10"></div>
                <div className="absolute top-0 left-0 right-0 p-6 z-20 flex flex-col h-full justify-center">
                  <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">Get 15% cashback</h2>
                  <p className="text-white text-lg mb-4">Items on your first order</p>
                  <Button className="bg-white text-blue-700 hover:bg-white/90 w-32">
                    <Link to="/offers">FIRST15</Link>
                  </Button>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Cashback offer" 
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>

            {/* Third Banner */}
            <CarouselItem>
              <div className="relative rounded-md overflow-hidden h-64 md:h-80 bg-indigo-600 w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-indigo-700/30 z-10"></div>
                <div className="absolute top-0 left-0 right-0 p-6 z-20 flex flex-col h-full justify-center">
                  <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">The Warehouse Sale</h2>
                  <p className="text-white text-lg mb-4">Clearance up to 70% off</p>
                  <Button className="bg-white text-indigo-700 hover:bg-white/90 w-40">
                    <Link to="/clearance">SHOP & SAVE</Link>
                  </Button>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Warehouse sale" 
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </section>
  );
};

export default Hero;
