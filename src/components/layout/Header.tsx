
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  User, 
  Search, 
  Menu, 
  X, 
  Heart,
  Globe
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'Arabic' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
  ];

  const categories = [
    { name: 'Electronics', path: '/category/electronics' },
    { name: 'Clothing', path: '/category/clothing' },
    { name: 'Home & Kitchen', path: '/category/home-kitchen' },
    { name: 'Beauty', path: '/category/beauty' },
    { name: 'Toys', path: '/category/toys' },
  ];

  return (
    <header className="sticky top-0 bg-white shadow-sm z-50">
      {/* Top Bar with Logo, Search, Language, Cart, and Profile/Login */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-shop-primary">
            ShopEase
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 w-full">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10"
              />
              <Button 
                type="submit" 
                size="icon" 
                variant="ghost" 
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>

          {/* Right-side items */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code}>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist */}
            <Link to="/wishlist" className="text-gray-700 hidden md:block">
              <Heart className="h-5 w-5" />
            </Link>

            {/* Profile/Login */}
            <Link to="/login" className="text-gray-700">
              <User className="h-5 w-5" />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="text-gray-700 relative">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-shop-primary h-5 w-5 flex items-center justify-center rounded-full p-0">
                  {totalItems}
                </Badge>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation Menu - Desktop */}
        <nav className="hidden md:flex space-x-8 mt-4">
          <Link to="/" className="text-gray-700 hover:text-shop-primary font-medium">
            Home
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-shop-primary font-medium">
            Products
          </Link>
          <Link to="/categories" className="text-gray-700 hover:text-shop-primary font-medium">
            Categories
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-shop-primary font-medium">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-shop-primary font-medium">
            Contact
          </Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col md:hidden animate-fade-in">
          <div className="p-4 flex justify-between items-center border-b">
            <span className="text-xl font-semibold">Menu</span>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="p-4 flex flex-col space-y-4 overflow-auto flex-grow">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  variant="ghost" 
                  className="absolute right-0 top-0 h-full"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </form>
            
            <Link to="/" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/products" className="p-2 hover:bg-gray-100 rounded" onClick={toggleMenu}>
              Products
            </Link>
            <div className="border-t my-2"></div>
            <p className="font-medium">Categories</p>
            {categories.map((category) => (
              <Link 
                key={category.path} 
                to={category.path} 
                className="p-2 hover:bg-gray-100 rounded pl-4" 
                onClick={toggleMenu}
              >
                {category.name}
              </Link>
            ))}
            <div className="border-t my-2"></div>
            <Link to="/account" className="p-2 hover:bg-gray-100 rounded" onClick={toggleMenu}>
              My Account
            </Link>
            <Link to="/wishlist" className="p-2 hover:bg-gray-100 rounded" onClick={toggleMenu}>
              Wishlist
            </Link>
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded" onClick={toggleMenu}>
              Cart
            </Link>
            <Link to="/about" className="p-2 hover:bg-gray-100 rounded" onClick={toggleMenu}>
              About Us
            </Link>
            <Link to="/contact" className="p-2 hover:bg-gray-100 rounded" onClick={toggleMenu}>
              Contact
            </Link>
            
            {/* Language Options */}
            <div className="border-t my-2"></div>
            <p className="font-medium">Language</p>
            {languages.map((lang) => (
              <button 
                key={lang.code}
                className="p-2 w-full text-left hover:bg-gray-100 rounded pl-4"
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
