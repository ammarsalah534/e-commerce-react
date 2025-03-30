
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Building, 
  Globe, 
  Calendar,
  MapPin
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RegisterPage: React.FC = () => {
  const { t, direction } = useLanguage();
  const [userType, setUserType] = useState<'individual' | 'seller'>('individual');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    gender: '',
    dob: '',
    // Seller specific fields
    companyName: '',
    companyDescription: '',
    contactPhone: '',
    website: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (formData.password !== formData.confirmPassword) {
      toast.error(t('auth.passwordsDoNotMatch'));
      return;
    }

    // Simulate registration
    toast.success(t('auth.registrationSuccess'), {
      description: t('auth.redirectingToLogin'),
    });

    // Here you would typically make an API call to register the user
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-12" dir={direction}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">{t('auth.register')}</h2>
            
            {/* User Type Selection */}
            <div className="mb-6">
              <Label className="block mb-2">{t('auth.registerAs')}</Label>
              <RadioGroup 
                defaultValue={userType} 
                onValueChange={(value) => setUserType(value as 'individual' | 'seller')}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="individual" id="individual" />
                  <Label htmlFor="individual">{t('auth.individual')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="seller" id="seller" />
                  <Label htmlFor="seller">{t('auth.seller')}</Label>
                </div>
              </RadioGroup>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Common Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t('auth.email')} *
                  </Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 w-full"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    {t('auth.name')} *
                  </Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder={t('auth.fullName')}
                      className="pl-10 w-full"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    {t('auth.password')} *
                  </Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder={t('auth.password')}
                      className="pl-10 w-full"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    {t('auth.confirmPassword')} *
                  </Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder={t('auth.confirmPassword')}
                      className="pl-10 w-full"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              
              {/* Individual Fields */}
              {userType === 'individual' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                      {t('auth.gender')}
                    </Label>
                    <div className="mt-1">
                      <Select 
                        onValueChange={(value) => handleSelectChange('gender', value)}
                        value={formData.gender}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('auth.selectGender')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">{t('auth.male')}</SelectItem>
                          <SelectItem value="female">{t('auth.female')}</SelectItem>
                          <SelectItem value="other">{t('auth.other')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                      {t('auth.dob')}
                    </Label>
                    <div className="relative mt-1">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="dob"
                        name="dob"
                        type="date"
                        className="pl-10 w-full"
                        value={formData.dob}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Seller Fields */}
              {userType === 'seller' && (
                <>
                  <div>
                    <Label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                      {t('auth.companyName')} *
                    </Label>
                    <div className="relative mt-1">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="companyName"
                        name="companyName"
                        type="text"
                        className="pl-10 w-full"
                        required={userType === 'seller'}
                        value={formData.companyName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700">
                      {t('auth.companyDescription')} *
                    </Label>
                    <div className="mt-1">
                      <Textarea
                        id="companyDescription"
                        name="companyDescription"
                        className="w-full"
                        rows={3}
                        required={userType === 'seller'}
                        value={formData.companyDescription}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                        {t('auth.phone')} *
                      </Label>
                      <div className="relative mt-1">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="contactPhone"
                          name="contactPhone"
                          type="tel"
                          className="pl-10 w-full"
                          required={userType === 'seller'}
                          value={formData.contactPhone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="website" className="block text-sm font-medium text-gray-700">
                        {t('auth.website')}
                      </Label>
                      <div className="relative mt-1">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="website"
                          name="website"
                          type="url"
                          className="pl-10 w-full"
                          value={formData.website}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      {t('auth.address')} *
                    </Label>
                    <div className="relative mt-1">
                      <MapPin className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                      <Textarea
                        id="address"
                        name="address"
                        className="pl-10 w-full"
                        rows={2}
                        required={userType === 'seller'}
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              )}
              
              <div>
                <Button type="submit" className="w-full">
                  {t('auth.register')}
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              {t('auth.alreadyHaveAccount')}
              <Link to="/login" className="text-shop-primary hover:underline ml-1">
                {t('auth.login')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
