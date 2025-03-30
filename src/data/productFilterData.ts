
// Mock data for brands
export const brandData = [
  { id: 'brand1', name: 'Apple', logo: 'https://cdn-icons-png.flaticon.com/512/0/747.png' },
  { id: 'brand2', name: 'Samsung', logo: 'https://cdn-icons-png.flaticon.com/512/882/882747.png' },
  { id: 'brand3', name: 'Sony', logo: 'https://cdn-icons-png.flaticon.com/512/731/731935.png' },
  { id: 'brand4', name: 'LG', logo: 'https://cdn-icons-png.flaticon.com/512/5969/5969246.png' },
  { id: 'brand5', name: 'Microsoft', logo: 'https://cdn-icons-png.flaticon.com/512/732/732221.png' },
  { id: 'brand6', name: 'Dell', logo: 'https://cdn-icons-png.flaticon.com/512/6124/6124997.png' },
  { id: 'brand7', name: 'HP', logo: 'https://cdn-icons-png.flaticon.com/512/882/882777.png' },
  { id: 'brand8', name: 'Lenovo', logo: 'https://cdn-icons-png.flaticon.com/512/882/882711.png' },
  { id: 'brand9', name: 'Asus', logo: 'https://cdn-icons-png.flaticon.com/512/882/882750.png' },
  { id: 'brand10', name: 'Acer', logo: 'https://cdn-icons-png.flaticon.com/512/882/882696.png' },
];

// Mock data for colors
export const colorOptions = [
  { id: 'red', name: 'Red', color: '#ea384c' },
  { id: 'blue', name: 'Blue', color: '#0EA5E9' },
  { id: 'green', name: 'Green', color: '#10B981' },
  { id: 'purple', name: 'Purple', color: '#8B5CF6' },
  { id: 'pink', name: 'Pink', color: '#D946EF' },
  { id: 'orange', name: 'Orange', color: '#F97316' },
  { id: 'black', name: 'Black', color: '#000000' },
  { id: 'white', name: 'White', color: '#FFFFFF', border: true },
];

// Mock data for sizes
export const sizeOptions = [
  { id: 'xs', name: 'XS' },
  { id: 'sm', name: 'S' },
  { id: 'md', name: 'M' },
  { id: 'lg', name: 'L' },
  { id: 'xl', name: 'XL' },
  { id: '2xl', name: '2XL' },
];

// Mock data for products
export const allProducts = [
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

// Filter configuration
export const filterConfig = [
  {
    name: 'filter.category',
    key: 'category',
    type: 'category' as const,
    options: [
      { 
        id: 'electronics', 
        name: 'Electronics', 
        count: 42,
        children: [
          { id: 'phones', name: 'Phones', count: 12 },
          { id: 'laptops', name: 'Laptops', count: 15 },
          { id: 'tablets', name: 'Tablets', count: 8 },
          { id: 'accessories', name: 'Accessories', count: 7 }
        ]
      },
      { 
        id: 'fashion', 
        name: 'Fashion', 
        count: 36,
        children: [
          { id: 'men', name: "Men's Clothing", count: 14 },
          { id: 'women', name: "Women's Clothing", count: 18 },
          { id: 'jewelry', name: 'Jewelry', count: 4 }
        ]
      },
      { 
        id: 'home', 
        name: 'Home & Kitchen', 
        count: 24,
        children: [
          { id: 'appliances', name: 'Appliances', count: 9 },
          { id: 'furniture', name: 'Furniture', count: 15 }
        ]
      },
      { id: 'beauty', name: 'Beauty', count: 18 },
      { id: 'sports', name: 'Sports & Outdoors', count: 15 }
    ]
  }
];
