
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/context/LanguageContext';

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
  const { t, language, setLanguage } = useLanguage();

  const categories = [
    { name: t('category.electronics'), path: '/category/electronics' },
    { name: t('category.fashion'), path: '/category/fashion' },
    { name: t('category.home'), path: '/category/home-kitchen' },
    { name: t('category.beauty'), path: '/category/beauty' },
    { name: t('category.toys'), path: '/category/toys' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col md:hidden animate-fade-in">
      <div className="p-4 flex justify-between items-center border-b">
        <span className="text-xl font-semibold">{t('nav.menu')}</span>
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
              placeholder={t('filter.search')}
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
          {t('nav.home')}
        </Link>
        <Link to="/products" className="p-2 hover:bg-gray-100 rounded" onClick={toggleMenu}>
          {t('nav.products')}
        </Link>
        <div className="border-t my-2"></div>
        <p className="font-medium">{t('nav.categories')}</p>
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
          {t('nav.account')}
        </Link>
        <Link to="/wishlist" className="p-2 hover:bg-gray-100 rounded" onClick={toggleMenu}>
          {t('nav.wishlist')}
        </Link>
        <Link to="/cart" className="p-2 hover:bg-gray-100 rounded" onClick={toggleMenu}>
          {t('nav.cart')}
        </Link>
        <Link to="/about" className="p-2 hover:bg-gray-100 rounded" onClick={toggleMenu}>
          {t('nav.about')}
        </Link>
        <Link to="/contact" className="p-2 hover:bg-gray-100 rounded" onClick={toggleMenu}>
          {t('nav.contact')}
        </Link>
        
        {/* Language Options */}
        <div className="border-t my-2"></div>
        <p className="font-medium">{t('nav.language')}</p>
        {languages.map((lang) => (
          <button 
            key={lang.code}
            className={`p-2 w-full text-left hover:bg-gray-100 rounded pl-4 ${
              language === lang.code ? 'bg-gray-100' : ''
            }`}
            onClick={() => setLanguage(lang.code as 'en' | 'ar')}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
