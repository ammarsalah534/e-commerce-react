
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ar';

interface TranslationMap {
  [key: string]: {
    en: string;
    ar: string;
  };
}

interface LanguageContextType {
  language: Language;
  direction: 'ltr' | 'rtl';
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  addTranslations: (translations: TranslationMap) => void;
}

const translations: TranslationMap = {
  // Navigation
  'nav.home': { en: 'Home', ar: 'الرئيسية' },
  'nav.products': { en: 'Products', ar: 'المنتجات' },
  'nav.categories': { en: 'Categories', ar: 'الفئات' },
  'nav.about': { en: 'About', ar: 'من نحن' },
  'nav.contact': { en: 'Contact', ar: 'اتصل بنا' },
  
  // Product page
  'product.addToCart': { en: 'Add to Cart', ar: 'أضف إلى السلة' },
  'product.buyNow': { en: 'Buy Now', ar: 'اشتري الآن' },
  'product.description': { en: 'Description', ar: 'الوصف' },
  'product.specifications': { en: 'Specifications', ar: 'المواصفات' },
  'product.reviews': { en: 'Reviews', ar: 'التقييمات' },
  'product.relatedProducts': { en: 'Related Products', ar: 'منتجات ذات صلة' },
  
  // Categories
  'category.electronics': { en: 'Electronics', ar: 'الإلكترونيات' },
  'category.fashion': { en: 'Fashion', ar: 'الأزياء' },
  'category.home': { en: 'Home', ar: 'المنزل' },
  'category.beauty': { en: 'Beauty', ar: 'الجمال' },
  'category.toys': { en: 'Baby & Toys', ar: 'الأطفال والألعاب' },
  'category.grocery': { en: 'Grocery', ar: 'البقالة' },
  'category.sports': { en: 'Sports', ar: 'الرياضة' },
  'category.bestsellers': { en: 'Bestsellers', ar: 'الأكثر مبيعًا' },
  
  // Auth
  'auth.login': { en: 'Login', ar: 'تسجيل الدخول' },
  'auth.register': { en: 'Register', ar: 'إنشاء حساب' },
  'auth.email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'auth.password': { en: 'Password', ar: 'كلمة المرور' },
  'auth.name': { en: 'Name', ar: 'الاسم' },
  'auth.gender': { en: 'Gender', ar: 'الجنس' },
  'auth.dob': { en: 'Date of Birth', ar: 'تاريخ الميلاد' },
  'auth.companyName': { en: 'Company Name', ar: 'اسم الشركة' },
  'auth.companyDescription': { en: 'Company Description', ar: 'وصف الشركة' },
  'auth.phone': { en: 'Phone Number', ar: 'رقم الهاتف' },
  'auth.website': { en: 'Website', ar: 'الموقع الإلكتروني' },
  'auth.address': { en: 'Address', ar: 'العنوان' },
  'auth.individual': { en: 'Individual', ar: 'فرد' },
  'auth.seller': { en: 'Seller', ar: 'بائع' },
  
  // Filters
  'filter.brand': { en: 'Brand', ar: 'العلامة التجارية' },
  'filter.category': { en: 'Category', ar: 'الفئة' },
  'filter.price': { en: 'Price Range', ar: 'نطاق السعر' },
  'filter.color': { en: 'Color', ar: 'اللون' },
  'filter.size': { en: 'Size', ar: 'الحجم' },
  'filter.search': { en: 'Search', ar: 'بحث' },
  'filter.apply': { en: 'Apply Filters', ar: 'تطبيق الفلاتر' },
  'filter.reset': { en: 'Reset', ar: 'إعادة ضبط' },
  
  // Common
  'common.showingResults': { en: 'Showing {} results', ar: 'عرض {} نتيجة' },
  'common.prev': { en: 'Previous', ar: 'السابق' },
  'common.next': { en: 'Next', ar: 'التالي' },
  'common.page': { en: 'Page {} of {}', ar: 'صفحة {} من {}' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [translationsMap, setTranslationsMap] = useState<TranslationMap>(translations);
  
  const direction = language === 'ar' ? 'rtl' : 'ltr';
  
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };
  
  const t = (key: string): string => {
    if (translationsMap[key] && translationsMap[key][language]) {
      return translationsMap[key][language];
    }
    console.warn(`Translation missing for key: ${key}`);
    return key;
  };
  
  const addTranslations = (newTranslations: TranslationMap) => {
    setTranslationsMap(prev => ({ ...prev, ...newTranslations }));
  };
  
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguageState(savedLanguage);
      document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = savedLanguage;
    }
  }, []);
  
  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t, addTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
