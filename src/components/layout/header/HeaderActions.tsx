
import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Heart, User, ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderActionsProps {
  toggleMenu: () => void;
}

const HeaderActions = ({ toggleMenu }: HeaderActionsProps) => {
  const { totalItems } = useCart();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'Arabic' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
  ];

  return (
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
  );
};

export default HeaderActions;
