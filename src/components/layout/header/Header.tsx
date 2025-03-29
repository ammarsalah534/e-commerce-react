
import React, { useState } from 'react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import HeaderActions from './HeaderActions';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
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

  return (
    <header className="sticky top-0 bg-white shadow-sm z-50">
      {/* Top Bar with Logo, Search, Language, Cart, and Profile/Login */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Logo */}
          <Logo />

          {/* Search Bar */}
          <SearchBar />

          {/* Right-side items */}
          <HeaderActions toggleMenu={toggleMenu} />
        </div>

        {/* Navigation Menu - Desktop */}
        <Navigation />
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMenuOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        toggleMenu={toggleMenu}
        handleSearch={handleSearch}
      />
    </header>
  );
};

export default Header;
