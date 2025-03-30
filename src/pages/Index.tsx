
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import CategoryBar from '@/components/home/CategoryBar';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import PromoBanners from '@/components/home/PromoBanners';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import PromoSection from '@/components/home/PromoSection';
import Testimonials from '@/components/home/Testimonials';
import NewsletterSignup from '@/components/home/NewsletterSignup';

const Index = () => {
  return (
    <Layout>
      <CategoryBar />
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
