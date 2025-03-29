
import React from 'react';
import { Link } from 'react-router-dom';

interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  backgroundColor: string;
  textColor: string;
  link: string;
}

const PromoBanners: React.FC = () => {
  const banners: PromoBanner[] = [
    {
      id: 'eid-mubarak',
      title: 'Eid Mubarak',
      subtitle: 'Special offers on electronics',
      image: 'https://images.unsplash.com/photo-1550029402-226115b7c579?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1040&q=80',
      backgroundColor: 'bg-yellow-100',
      textColor: 'text-gray-800',
      link: '/offers/eid-mubarak'
    },
    {
      id: 'beauty-sale',
      title: 'Up to 50% off',
      subtitle: 'On beauty essentials',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
      backgroundColor: 'bg-yellow-100',
      textColor: 'text-gray-800',
      link: '/offers/beauty-sale'
    },
    {
      id: 'kitchen-deals',
      title: 'For tastier meals',
      subtitle: 'Deals on kitchen essentials',
      image: 'https://images.unsplash.com/photo-1609167830220-7164aa360728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
      backgroundColor: 'bg-yellow-100',
      textColor: 'text-gray-800',
      link: '/offers/kitchen-deals'
    },
    {
      id: 'gaming-accessories',
      title: 'Up to 50% off',
      subtitle: 'Gaming accessories',
      image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      backgroundColor: 'bg-yellow-100',
      textColor: 'text-gray-800',
      link: '/offers/gaming-accessories'
    }
  ];

  return (
    <section className="py-6 bg-yellow-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {banners.map(banner => (
            <Link 
              key={banner.id} 
              to={banner.link} 
              className={`rounded-lg overflow-hidden ${banner.backgroundColor} p-4 flex items-center h-32 hover:shadow-md transition-shadow`}
            >
              <div className="flex-1">
                <h3 className={`text-lg font-bold ${banner.textColor}`}>{banner.title}</h3>
                <p className={`text-sm ${banner.textColor}`}>{banner.subtitle}</p>
              </div>
              <div className="w-24 h-24">
                <img 
                  src={banner.image} 
                  alt={banner.title} 
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
