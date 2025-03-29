
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
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
  );
};

export default Navigation;
