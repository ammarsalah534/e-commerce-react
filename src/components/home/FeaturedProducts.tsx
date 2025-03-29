
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/context/CartContext';

const FeaturedProducts: React.FC = () => {
  // Mock data - would come from your backend in a real application
  const products: Product[] = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: 'Experience crystal-clear sound with our premium wireless headphones. Features noise cancellation and 20-hour battery life.',
      category: 'Electronics'
    },
    {
      id: '2',
      name: 'Smart Watch with Fitness Tracking',
      price: 149.95,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1399&q=80',
      description: 'Monitor your fitness goals with our advanced smartwatch. Tracks heart rate, steps, and more.',
      category: 'Electronics'
    },
    {
      id: '3',
      name: 'Designer Leather Handbag',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80',
      description: 'Elegant and spacious genuine leather handbag perfect for everyday use.',
      category: 'Fashion'
    },
    {
      id: '4',
      name: 'Ultra HD 4K Smart TV - 55"',
      price: 699.00,
      image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: 'Immerse yourself in stunning 4K resolution with this smart TV featuring built-in streaming apps.',
      category: 'Electronics'
    },
    {
      id: '5',
      name: 'Stainless Steel Kitchen Knife Set',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80',
      description: 'Professional-grade knife set with ergonomic handles for precision cutting.',
      category: 'Home & Kitchen'
    },
    {
      id: '6',
      name: 'Organic Skincare Collection',
      price: 59.50,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
      description: 'All-natural skincare set made with organic ingredients. Gentle on sensitive skin.',
      category: 'Beauty'
    },
    {
      id: '7',
      name: 'Wireless Gaming Mouse',
      price: 79.95,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1428&q=80',
      description: 'High-precision gaming mouse with customizable RGB lighting and programmable buttons.',
      category: 'Electronics'
    },
    {
      id: '8',
      name: 'Portable Bluetooth Speaker',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: 'Waterproof Bluetooth speaker with 360° sound and 12-hour playtime.',
      category: 'Electronics'
    }
  ];

  // Display only a subset of products
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Products</h2>
            <p className="mt-3 text-gray-600 max-w-2xl">
              Discover our most popular items loved by customers
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0">
            <Link to="/products" className="flex items-center">
              View All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} featured={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
