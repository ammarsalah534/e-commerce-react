
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import PromoBanners from '@/components/home/PromoBanners';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import PromoSection from '@/components/home/PromoSection';
import Testimonials from '@/components/home/Testimonials';
import NewsletterSignup from '@/components/home/NewsletterSignup';

const Index = () => {
  return (
    <Layout>
      <div className="bg-yellow-400 py-2">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-medium">Get 15% cashback + FREE DELIVERY on your first order</p>
        </div>
      </div>
      <Hero />
      <FeaturedCategories />
      <PromoBanners />
      <FeaturedProducts />
      <PromoSection />
      <Testimonials />
      <NewsletterSignup />
    </Layout>
  );
};

export default Index;
