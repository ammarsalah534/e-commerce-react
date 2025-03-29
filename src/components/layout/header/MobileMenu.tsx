
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MobileMenuProps {
  isOpen: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toggleMenu: () => void;
  handleSearch: (e: React.FormEvent) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  searchQuery,
  setSearchQuery,
  toggleMenu,
  handleSearch,
}) => {
  const categories = [
    { name: 'Electronics', path: '/category/electronics' },
    { name: 'Clothing', path: '/category/clothing' },
    { name: 'Home & Kitchen', path: '/category/home-kitchen' },
    { name: 'Beauty', path: '/category/beauty' },
    { name: 'Toys', path: '/category/toys' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'Arabic' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
  ];

  if (!isOpen) return null;

  return (
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
  );
};

export default MobileMenu;
