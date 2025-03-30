
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Lock, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const LoginPage: React.FC = () => {
  const { t, direction } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, rememberMe: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.email || !formData.password) {
      toast.error(t('auth.fieldRequired'));
      return;
    }

    // Simulate login
    toast.success(t('auth.loginSuccess'), {
      description: t('auth.redirectingToDashboard'),
    });

    // Simulate a redirect after login
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-12" dir={direction}>
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">{t('auth.login')}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t('auth.email')}
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
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {t('auth.password')}
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 w-full"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <Label htmlFor="rememberMe" className="font-medium text-gray-700">
                    {t('auth.rememberMe')}
                  </Label>
                </div>
                <Link to="/reset-password" className="text-sm text-shop-primary hover:underline">
                  {t('auth.forgotPassword')}
                </Link>
              </div>
              <div>
                <Button type="submit" className="w-full">
                  {t('auth.login')}
                </Button>
              </div>
            </form>
            <div className="mt-6 text-center">
              {t('auth.dontHaveAccount')}
              <Link to="/register" className="text-shop-primary hover:underline ml-1">
                {t('auth.register')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
