
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Shirt, 
  User, 
  Home as HomeIcon, 
  Sparkles, 
  Baby, 
  ShoppingCart, 
  Dumbbell,
  Star,
  Tags
} from 'lucide-react';

interface CategoryItem {
  name: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

const CategoryBar: React.FC = () => {
  const categories: CategoryItem[] = [
    { 
      name: 'All Categories', 
      icon: <Tags size={20} />, 
      path: '/categories', 
      color: 'bg-gray-100'
    },
    { 
      name: 'Electronics', 
      icon: <Smartphone size={20} />, 
      path: '/category/electronics', 
      color: 'bg-blue-100'
    },
    { 
      name: 'Men', 
      icon: <Shirt size={20} />, 
      path: '/category/men', 
      color: 'bg-indigo-100'
    },
    { 
      name: 'Women', 
      icon: <User size={20} />, 
      path: '/category/women', 
      color: 'bg-pink-100'
    },
    { 
      name: 'Home', 
      icon: <HomeIcon size={20} />, 
      path: '/category/home-kitchen', 
      color: 'bg-amber-100'
    },
    { 
      name: 'Beauty', 
      icon: <Sparkles size={20} />, 
      path: '/category/beauty', 
      color: 'bg-purple-100'
    },
    { 
      name: 'Baby & Toys', 
      icon: <Baby size={20} />, 
      path: '/category/toys', 
      color: 'bg-green-100'
    },
    { 
      name: 'Grocery', 
      icon: <ShoppingCart size={20} />, 
      path: '/category/grocery', 
      color: 'bg-yellow-100'
    },
    { 
      name: 'Sports', 
      icon: <Dumbbell size={20} />, 
      path: '/category/sports', 
      color: 'bg-red-100'
    },
    { 
      name: 'Bestsellers', 
      icon: <Star size={20} />, 
      path: '/bestsellers', 
      color: 'bg-emerald-100'
    },
  ];

  return (
    <div className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="overflow-x-auto">
          <div className="flex py-3 space-x-4 min-w-max">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                to={category.path} 
                className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium whitespace-nowrap hover:text-shop-primary transition-colors"
              >
                {category.icon}
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
