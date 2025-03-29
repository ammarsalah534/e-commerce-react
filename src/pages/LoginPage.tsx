
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // Login form
  const loginForm = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  
  // Register form
  const registerForm = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  
  // Login handler
  const onLogin = (data: any) => {
    console.log('Login data:', data);
    
    // Simulate authentication
    toast.loading('Logging in...', { duration: 1500 });
    
    setTimeout(() => {
      toast.success('Successfully logged in!');
      // Redirect to dashboard or home page
      window.location.href = '/';
    }, 1500);
  };
  
  // Register handler
  const onRegister = (data: any) => {
    console.log('Register data:', data);
    
    // Validate passwords match
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    
    // Simulate registration
    toast.loading('Creating your account...', { duration: 1500 });
    
    setTimeout(() => {
      toast.success('Account created successfully!');
      // Redirect to login
      setAuthMode('login');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-shop-primary">
            ShopEase
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {authMode === 'login' 
              ? "Sign in to your account to continue" 
              : "Create a new account to get started"
            }
          </p>
        </div>
        
        <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'login' | 'register')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          {/* Login Form */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login to your Account</CardTitle>
                <CardDescription>
                  Enter your email and password to sign in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="john.doe@example.com" 
                              type="email"
                              required
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="••••••••" 
                                type={isPasswordVisible ? "text" : "password"}
                                required
                                {...field} 
                              />
                              <Button 
                                type="button"
                                variant="ghost" 
                                size="icon"
                                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                                onClick={togglePasswordVisibility}
                              >
                                {isPasswordVisible ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 text-shop-primary focus:ring-shop-primary border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                          Remember me
                        </label>
                      </div>
                      
                      <div className="text-sm">
                        <Link
                          to="/forgot-password"
                          className="font-medium text-shop-primary hover:text-blue-800"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full mt-6">
                      Sign in
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button 
                    className="text-shop-primary hover:underline"
                    onClick={() => setAuthMode('register')}
                  >
                    Sign up
                  </button>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Register Form */}
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>
                  Fill in your details to create a new account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              required
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="john.doe@example.com" 
                              type="email"
                              required
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="••••••••" 
                                type={isPasswordVisible ? "text" : "password"}
                                required
                                {...field} 
                              />
                              <Button 
                                type="button"
                                variant="ghost" 
                                size="icon"
                                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                                onClick={togglePasswordVisibility}
                              >
                                {isPasswordVisible ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="••••••••" 
                                type={isPasswordVisible ? "text" : "password"}
                                required
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex items-center mt-2">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        required
                        className="h-4 w-4 text-shop-primary focus:ring-shop-primary border-gray-300 rounded"
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-shop-primary hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-shop-primary hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                    
                    <Button type="submit" className="w-full mt-6">
                      Create Account
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button 
                    className="text-shop-primary hover:underline"
                    onClick={() => setAuthMode('login')}
                  >
                    Sign in
                  </button>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
