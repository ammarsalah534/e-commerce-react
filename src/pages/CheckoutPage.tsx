
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { toast } from '@/components/ui/sonner';
import { 
  CreditCard, 
  CheckCircle2, 
  Truck, 
  MapPin, 
  CreditCard as CreditCardIcon,
  ArrowRight,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useForm } from 'react-hook-form';

const CheckoutPage: React.FC = () => {
  const { items, subtotal, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState("address");
  
  // If cart is empty, redirect to cart page
  if (items.length === 0) {
    return (
      <Layout>
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
              <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">
                You need to add items to your cart before proceeding to checkout.
              </p>
              <Button>
                <Link to="/products" className="flex items-center">
                  Browse Products <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Calculate additional costs
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08; // Assuming 8% tax rate
  const total = subtotal + shipping + tax;
  
  // Form for shipping address
  const addressForm = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US',
    }
  });
  
  // Form for payment details
  const paymentForm = useForm({
    defaultValues: {
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    }
  });
  
  // Handle address form submission
  const onAddressSubmit = (data: any) => {
    console.log('Address data:', data);
    setActiveStep("payment");
  };
  
  // Handle payment form submission
  const onPaymentSubmit = (data: any) => {
    console.log('Payment data:', data);
    setActiveStep("confirmation");
  };
  
  // Handle order confirmation
  const handleConfirmOrder = () => {
    // Simulate order processing
    toast.loading('Processing your order...', { duration: 2000 });
    
    setTimeout(() => {
      // Clear cart and show success
      clearCart();
      toast.success('Order placed successfully!', {
        description: 'Thank you for your purchase.',
      });
      
      // Redirect to success page (could create a dedicated order confirmation page)
      navigate('/');
    }, 2000);
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Steps */}
            <div className="lg:col-span-2">
              <Tabs value={activeStep} className="w-full">
                <TabsList className="w-full grid grid-cols-3 mb-8">
                  <TabsTrigger 
                    value="address"
                    onClick={() => setActiveStep("address")}
                    className="flex items-center justify-center"
                  >
                    <span className="mr-2">1.</span> Address
                  </TabsTrigger>
                  <TabsTrigger 
                    value="payment"
                    onClick={() => activeStep === "confirmation" && setActiveStep("payment")}
                    className="flex items-center justify-center"
                    disabled={activeStep === "address"}
                  >
                    <span className="mr-2">2.</span> Payment
                  </TabsTrigger>
                  <TabsTrigger 
                    value="confirmation"
                    className="flex items-center justify-center"
                    disabled={activeStep === "address" || activeStep === "payment"}
                  >
                    <span className="mr-2">3.</span> Confirmation
                  </TabsTrigger>
                </TabsList>
                
                {/* Step 1: Shipping Address */}
                <TabsContent value="address">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MapPin className="mr-2 h-5 w-5" /> Shipping Address
                      </CardTitle>
                      <CardDescription>
                        Enter the address where you want your order to be delivered
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...addressForm}>
                        <form onSubmit={addressForm.handleSubmit(onAddressSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={addressForm.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>First Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="John" required />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={addressForm.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Last Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="Doe" required />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={addressForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Address</FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      type="email" 
                                      placeholder="john.doe@example.com" 
                                      required 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={addressForm.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      type="tel" 
                                      placeholder="(123) 456-7890" 
                                      required 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={addressForm.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Street Address</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder="123 Main St, Apt 4B" 
                                    required 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                              control={addressForm.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>City</FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      placeholder="New York" 
                                      required 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={addressForm.control}
                              name="state"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>State</FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      placeholder="NY" 
                                      required 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={addressForm.control}
                              name="zipCode"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Zip Code</FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      placeholder="10001" 
                                      required 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={addressForm.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Country</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                  required
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a country" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="US">United States</SelectItem>
                                    <SelectItem value="CA">Canada</SelectItem>
                                    <SelectItem value="UK">United Kingdom</SelectItem>
                                    <SelectItem value="AU">Australia</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-end">
                            <Button type="submit" className="mt-4">
                              Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Step 2: Payment */}
                <TabsContent value="payment">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CreditCardIcon className="mr-2 h-5 w-5" /> Payment Method
                      </CardTitle>
                      <CardDescription>
                        Enter your payment details
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...paymentForm}>
                        <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-6">
                          <FormField
                            control={paymentForm.control}
                            name="cardName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name on Card</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder="John Doe" 
                                    required 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={paymentForm.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder="1234 5678 9012 3456" 
                                    required 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={paymentForm.control}
                              name="expiryDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Expiry Date</FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      placeholder="MM/YY" 
                                      required 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={paymentForm.control}
                              name="cvv"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CVV</FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      placeholder="123" 
                                      required 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="flex justify-between mt-4">
                            <Button 
                              type="button" 
                              variant="outline"
                              onClick={() => setActiveStep("address")}
                            >
                              Back to Address
                            </Button>
                            <Button type="submit">
                              Review Order <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Step 3: Confirmation */}
                <TabsContent value="confirmation">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CheckCircle2 className="mr-2 h-5 w-5" /> Order Confirmation
                      </CardTitle>
                      <CardDescription>
                        Review your order before confirming
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Order Summary */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium text-lg mb-3">Order Summary</h3>
                          <div className="bg-gray-50 p-4 rounded">
                            <div className="space-y-4">
                              {items.map((item) => (
                                <div key={item.product.id} className="flex justify-between">
                                  <div className="flex items-center">
                                    <img 
                                      src={item.product.image} 
                                      alt={item.product.name} 
                                      className="w-12 h-12 object-cover rounded mr-3"
                                    />
                                    <div>
                                      <p className="font-medium">{item.product.name}</p>
                                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                  </div>
                                  <p className="font-medium">
                                    ${(item.product.price * item.quantity).toFixed(2)}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Shipping and Payment Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-medium text-lg mb-3 flex items-center">
                              <MapPin className="h-4 w-4 mr-2" /> Shipping Address
                            </h3>
                            <div className="bg-gray-50 p-4 rounded">
                              <p>John Doe</p>
                              <p>123 Main St, Apt 4B</p>
                              <p>New York, NY 10001</p>
                              <p>United States</p>
                              <p className="mt-2">john.doe@example.com</p>
                              <p>(123) 456-7890</p>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-medium text-lg mb-3 flex items-center">
                              <CreditCardIcon className="h-4 w-4 mr-2" /> Payment Method
                            </h3>
                            <div className="bg-gray-50 p-4 rounded">
                              <p className="flex items-center">
                                <CreditCard className="h-4 w-4 mr-2" />
                                Credit Card
                              </p>
                              <p className="mt-2">**** **** **** 3456</p>
                              <p>Expiry: 12/25</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Shipping Method */}
                        <div>
                          <h3 className="font-medium text-lg mb-3 flex items-center">
                            <Truck className="h-4 w-4 mr-2" /> Shipping Method
                          </h3>
                          <div className="bg-gray-50 p-4 rounded">
                            <p className="font-medium">Standard Shipping</p>
                            <p className="text-sm text-gray-500">
                              Estimated delivery: 3-5 business days
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="outline"
                        onClick={() => setActiveStep("payment")}
                      >
                        Back to Payment
                      </Button>
                      <Button onClick={handleConfirmOrder}>
                        Confirm Order
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                {/* Summary Items */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    {shipping === 0 ? (
                      <span className="text-shop-success">Free</span>
                    ) : (
                      <span>${shipping.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="border-t my-4"></div>
                
                {/* Total */}
                <div className="flex justify-between mb-6">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold text-lg">${total.toFixed(2)}</span>
                </div>
                
                {/* Items Preview */}
                <div className="border-t pt-4">
                  <p className="font-medium mb-3">Items in Your Cart</p>
                  <div className="space-y-3 max-h-60 overflow-auto">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-10 h-10 object-cover rounded mr-3"
                          />
                          <div>
                            <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
