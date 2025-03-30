
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Product } from '@/context/CartContext';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

const TrendingProducts: React.FC = () => {
  // Mock data - would come from your backend in a real application
  const products: Product[] = [
    {
      id: '9',
      name: 'Ergonomic Office Chair',
      price: 249.99,
      image: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
      description: 'Adjustable ergonomic chair with lumbar support for extended comfort during long work hours.',
      category: 'Home & Office'
    },
    {
      id: '10',
      name: 'Mechanical Keyboard',
      price: 129.95,
      image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      description: 'RGB mechanical keyboard with customizable switches for gaming and typing enthusiasts.',
      category: 'Electronics'
    },
    {
      id: '11',
      name: 'Smart Home Hub',
      price: 179.99,
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      description: 'Control all your smart devices from one central hub with voice commands and app integration.',
      category: 'Smart Home'
    },
    {
      id: '12',
      name: 'Fitness Tracker',
      price: 89.00,
      image: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1362&q=80',
      description: 'Track steps, heart rate, sleep, and more with this waterproof fitness band.',
      category: 'Health & Fitness'
    },
    {
      id: '13',
      name: 'Reusable Water Bottle',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      description: 'Insulated stainless steel water bottle keeps drinks cold for 24 hours or hot for 12 hours.',
      category: 'Sports & Outdoors'
    },
    {
      id: '14',
      name: 'Wireless Earbuds',
      price: 129.50,
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1378&q=80',
      description: 'True wireless earbuds with active noise cancellation and ambient sound mode.',
      category: 'Electronics'
    },
    {
      id: '15',
      name: 'Robot Vacuum Cleaner',
      price: 299.95,
      image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1380&q=80',
      description: 'Smart robot vacuum with mapping technology and app control for automated cleaning.',
      category: 'Home & Kitchen'
    },
    {
      id: '16',
      name: 'Air Purifier',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1585143042060-77fd3b1a0a04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
      description: 'HEPA air purifier removes 99.97% of allergens, dust, and pollutants for cleaner home air.',
      category: 'Home & Kitchen'
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-shop-primary mr-3 hidden md:block" />
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Trending Now</h2>
              <p className="mt-3 text-gray-600 max-w-2xl">
                Our hottest items flying off the shelves this week
              </p>
            </div>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0">
            <Link to="/trending" className="flex items-center">
              View All Trending <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map(product => (
              <CarouselItem key={product.id} className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <ProductCard product={product} featured={true} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 sm:-left-4" />
          <CarouselNext className="right-0 sm:-right-4" />
        </Carousel>
      </div>
    </section>
  );
};

export default TrendingProducts;
