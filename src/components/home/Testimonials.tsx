
import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  image: string;
  role: string;
  rating: number;
  content: string;
}

const Testimonials: React.FC = () => {
  // Mock data
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      role: 'Regular Customer',
      rating: 5,
      content: 'I absolutely love shopping at ShopEase! The products are high quality and the customer service is exceptional. My orders always arrive on time and exactly as described.'
    },
    {
      id: '2',
      name: 'Michael Chen',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      role: 'Tech Enthusiast',
      rating: 4,
      content: 'As someone who buys a lot of electronics, I appreciate the detailed product descriptions and competitive prices. The return process is also very straightforward when needed.'
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      role: 'Fashion Blogger',
      rating: 5,
      content: 'ShopEase has become my go-to for trendy fashion items. The website is user-friendly, and their curated collections always keep me coming back for more!'
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>

              {/* Testimonial Content */}
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>

              {/* Customer Info */}
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
