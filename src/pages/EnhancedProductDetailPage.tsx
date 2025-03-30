import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  ShoppingBag, 
  Heart, 
  Share2, 
  Truck, 
  RotateCcw, 
  Shield, 
  ChevronRight, 
  Minus, 
  Plus 
} from 'lucide-react';
import { useCart, Product } from '@/context/CartContext';
import ProductCard from '@/components/products/ProductCard';
import ProductImageGallery from '@/components/products/ProductImageGallery';
import ProductReviews from '@/components/products/ProductReviews';
import { useLanguage } from '@/context/LanguageContext';

interface ProductColor {
  name: string;
  code: string;
  images: {
    id: string;
    src: string;
    alt: string;
  }[];
}

const EnhancedProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { t, direction } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  
  // Mock product data
  const allProducts: Product[] = [
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
    },
    {
      id: '9',
      name: 'Professional DSLR Camera',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80',
      description: 'Capture stunning photos and videos with this professional-grade DSLR camera with multiple lens options.',
      category: 'Electronics'
    },
    {
      id: '10',
      name: 'Ergonomic Office Chair',
      price: 249.95,
      image: 'https://images.unsplash.com/photo-1596162954151-cdcb4c0f70fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
      description: 'Comfortable office chair with lumbar support, adjustable height, and breathable mesh material.',
      category: 'Furniture'
    },
    {
      id: '11',
      name: 'Smart Home Security System',
      price: 349.99,
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: 'Comprehensive security system with cameras, motion sensors, and smartphone integration.',
      category: 'Electronics'
    },
    {
      id: '12',
      name: 'Luxury Scented Candle Set',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: 'Set of 3 luxury scented candles with long-lasting fragrance. Perfect for creating a cozy atmosphere.',
      category: 'Home & Kitchen'
    }
  ];
  
  const product = allProducts.find(p => p.id === id) || {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Experience crystal-clear sound with our premium wireless headphones. Features noise cancellation and 20-hour battery life.',
    category: 'Electronics'
  };

  // Product colors with images
  const productColors: ProductColor[] = [
    {
      name: 'Black',
      code: '#000000',
      images: [
        { id: '1-1', src: product.image, alt: 'Black Headphones - Front View' },
        { id: '1-2', src: 'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80', alt: 'Black Headphones - Side View' },
        { id: '1-3', src: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&q=80', alt: 'Black Headphones - Detail View' }
      ]
    },
    {
      name: 'White',
      code: '#FFFFFF',
      images: [
        { id: '2-1', src: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80', alt: 'White Headphones - Front View' },
        { id: '2-2', src: 'https://images.unsplash.com/photo-1578319439584-104c94d37305?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', alt: 'White Headphones - Side View' }
      ]
    },
    {
      name: 'Blue',
      code: '#0066CC',
      images: [
        { id: '3-1', src: 'https://images.unsplash.com/photo-1585123334904-845d60e97b29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80', alt: 'Blue Headphones - Front View' },
      ]
    }
  ];
  
  // Set default color on load
  useEffect(() => {
    if (productColors.length > 0 && !selectedColor) {
      setSelectedColor(productColors[0].name);
    }
  }, [productColors, selectedColor]);
  
  // Product details
  const productDetails = {
    rating: 4.5,
    reviews: 128,
    inStock: true,
    materials: 'Premium Plastic and Leather',
    dimensions: '7.5 x 6.1 x 3.2 inches',
    weight: '0.55 pounds',
    warranty: '2 years limited warranty',
    shipping: 'Free shipping on orders over $50',
    returns: '30-day money-back guarantee',
    features: [
      'Hi-Fi Sound Quality',
      'Active Noise Cancellation',
      '20-hour Battery Life',
      'Bluetooth 5.0 Connectivity',
      'Comfortable Over-Ear Design',
      'Built-in Microphone for Calls',
      'Touch Controls',
      'Voice Assistant Compatible'
    ]
  };
  
  // Mock review data
  const reviewSummary = {
    average: 4.5,
    total: 128,
    distribution: [92, 26, 8, 1, 1] // 5, 4, 3, 2, 1 stars
  };
  
  const reviews = [
    {
      id: '1',
      author: {
        name: 'John D.',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      rating: 5,
      date: '2023-11-15',
      title: 'Best headphones I\'ve ever owned',
      content: 'The sound quality is incredible, and the noise cancellation is top-notch. Battery life exceeds the advertised 20 hours. Very comfortable for long listening sessions.',
      helpful: 24,
      verified: true
    },
    {
      id: '2',
      author: {
        name: 'Sarah M.',
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      rating: 4,
      date: '2023-10-28',
      title: 'Great sound, slightly tight fit',
      content: 'Sound quality is excellent and the battery lasts forever. My only complaint is that they\'re a bit tight on my head after a few hours of use. Otherwise, perfect!',
      helpful: 12,
      verified: true
    },
    {
      id: '3',
      author: {
        name: 'Michael T.',
      },
      rating: 5,
      date: '2023-10-15',
      title: 'Worth every penny',
      content: 'These headphones deliver crystal clear audio with deep, rich bass. The noise cancellation is perfect for my commute, and they\'re comfortable enough to wear all day.',
      helpful: 8,
      verified: false
    }
  ];
  
  // Related products (in a real app, you'd fetch these based on the current product)
  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  
  // Get current color's images
  const currentColorImages = productColors.find(c => c.name === selectedColor)?.images || productColors[0].images;
  
  // Handle quantity changes
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  
  // Add to cart handler
  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <Layout>
      <div className="bg-white" dir={direction}>
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <nav className="flex text-sm mb-8">
            <Link to="/" className="text-gray-500 hover:text-shop-primary transition-colors">
              {t('nav.home')}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <Link to="/products" className="text-gray-500 hover:text-shop-primary transition-colors">
              {t('nav.products')}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <Link to={`/category/${product.category.toLowerCase()}`} className="text-gray-500 hover:text-shop-primary transition-colors">
              {t(`category.${product.category.toLowerCase()}`)}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-700 font-medium">{product.name}</span>
          </nav>
          
          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <ProductImageGallery images={currentColorImages} />
            
            {/* Product Info */}
            <div>
              <span className="text-shop-primary font-medium">
                {t(`category.${product.category.toLowerCase()}`)}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">{product.name}</h1>
              
              {/* Price */}
              <div className="text-2xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</div>
              
              {/* Description */}
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              {/* Availability */}
              <div className="mb-6">
                <span className="font-medium text-gray-700">{t('product.availability')}: </span>
                {productDetails.inStock ? (
                  <span className="text-shop-success">{t('product.inStock')}</span>
                ) : (
                  <span className="text-shop-error">{t('product.outOfStock')}</span>
                )}
              </div>
              
              {/* Color Selection */}
              <div className="mb-6">
                <span className="font-medium text-gray-700 block mb-2">{t('product.color')}:</span>
                <div className="flex space-x-3">
                  {productColors.map(color => (
                    <button 
                      key={color.name}
                      className={`border-2 rounded-full w-10 h-10 flex items-center justify-center p-0.5 ${
                        selectedColor === color.name ? 'border-shop-primary' : 'border-gray-300'
                      }`}
                      onClick={() => setSelectedColor(color.name)}
                      style={{ backgroundColor: color.code }}
                      title={color.name}
                    >
                      {selectedColor === color.name && color.code === '#FFFFFF' && (
                        <div className="bg-shop-primary rounded-full w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity and Actions */}
              <div className="flex items-center mb-6">
                <div className="flex items-center border rounded mr-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-none border-r" 
                    onClick={decreaseQuantity}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-none border-l" 
                    onClick={increaseQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button className="mr-3" onClick={handleAddToCart}>
                  <ShoppingBag className="h-5 w-5 mr-2" /> {t('product.addToCart')}
                </Button>
                
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Additional Info */}
              <div className="border-t pt-6 space-y-4">
                <div className="flex items-start">
                  <Truck className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <span className="font-medium block">{t('product.freeShipping')}</span>
                    <span className="text-sm text-gray-500">{productDetails.shipping}</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <RotateCcw className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <span className="font-medium block">{t('product.easyReturns')}</span>
                    <span className="text-sm text-gray-500">{productDetails.returns}</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <span className="font-medium block">{t('product.warranty')}</span>
                    <span className="text-sm text-gray-500">{productDetails.warranty}</span>
                  </div>
                </div>
              </div>
              
              {/* Share */}
              <div className="border-t mt-6 pt-6 flex items-center">
                <span className="text-gray-700 mr-4">{t('product.share')}:</span>
                <div className="flex space-x-3">
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-pink-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="mb-16">
            <Tabs defaultValue="description">
              <TabsList className="w-full border-b justify-start">
                <TabsTrigger value="description">{t('product.description')}</TabsTrigger>
                <TabsTrigger value="specs">{t('product.specifications')}</TabsTrigger>
                <TabsTrigger value="reviews">{t('product.reviews')}</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-6">
                <h3 className="text-xl font-semibold mb-4">{t('product.productDescription')}</h3>
                <p className="text-gray-600 mb-6">{product.description}</p>
                
                <h4 className="text-lg font-semibold mb-3">{t('product.features')}</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {productDetails.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="specs" className="pt-6">
                <h3 className="text-xl font-semibold mb-4">{t('product.specifications')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-b pb-3">
                    <span className="font-medium text-gray-500">{t('product.material')}</span>
                    <div className="mt-1">{productDetails.materials}</div>
                  </div>
                  <div className="border-b pb-3">
                    <span className="font-medium text-gray-500">{t('product.dimensions')}</span>
                    <div className="mt-1">{productDetails.dimensions}</div>
                  </div>
                  <div className="border-b pb-3">
                    <span className="font-medium text-gray-500">{t('product.weight')}</span>
                    <div className="mt-1">{productDetails.weight}</div>
                  </div>
                  <div className="border-b pb-3">
                    <span className="font-medium text-gray-500">{t('product.colors')}</span>
                    <div className="mt-1">{productColors.map(c => c.name).join(', ')}</div>
                  </div>
                  <div className="border-b pb-3">
                    <span className="font-medium text-gray-500">{t('product.warranty')}</span>
                    <div className="mt-1">{productDetails.warranty}</div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="pt-6">
                <ProductReviews 
                  summary={reviewSummary} 
                  reviews={reviews} 
                />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{t('product.relatedProducts')}</h2>
                <Link to="/products" className="text-shop-primary hover:underline">
                  {t('product.viewMore')}
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EnhancedProductDetailPage;
