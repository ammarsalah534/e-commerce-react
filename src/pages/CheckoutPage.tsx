
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
import { toast } from 'sonner';
import { 
  CreditCard, 
  CheckCircle2, 
  Truck, 
  MapPin, 
  CreditCard as CreditCardIcon,
  ArrowRight,
  ShoppingBag,
  AlertCircle
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useForm } from 'react-hook-form';
import PaymentMethodSelector from '@/components/checkout/PaymentMethodSelector';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CheckoutPage: React.FC = () => {
  const { items, subtotal, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState("address");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit_card");
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
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
    
    // Simulate payment processing
    if (selectedPaymentMethod === "credit_card" && Math.random() > 0.9) {
      // Simulate occasional payment failure for demo purposes (10% chance)
      setPaymentError("Your card was declined. Please try another payment method.");
      return;
    }
    
    setPaymentError(null);
    setActiveStep("confirmation");
    
    // Show appropriate toast message based on payment method
    const paymentMethodMessages = {
      credit_card: "Credit card payment processed successfully",
      paypal: "PayPal payment processed successfully",
      apple_pay: "Apple Pay payment processed successfully",
      google_pay: "Google Pay payment processed successfully",
      cash_on_delivery: "Cash on delivery selected, you'll pay when your order arrives"
    };
    
    toast.success("Payment method accepted", {
      description: paymentMethodMessages[selectedPaymentMethod as keyof typeof paymentMethodMessages],
    });
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
                        Choose your preferred payment method
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...paymentForm}>
                        <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-6">
                          {/* Payment Method Selection */}
                          <div className="mb-6">
                            <h3 className="text-lg font-medium mb-4">Select Payment Method</h3>
                            <PaymentMethodSelector 
                              selectedMethod={selectedPaymentMethod}
                              setSelectedMethod={setSelectedPaymentMethod}
                              error={paymentError || undefined}
                            />
                          </div>
                          
                          {/* Show credit card fields only when credit card is selected */}
                          {selectedPaymentMethod === 'credit_card' && (
                            <>
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
                            </>
                          )}
                          
                          {/* Security notice */}
                          <div className="rounded-md bg-muted/50 p-4 text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <CreditCard className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium">Secure Payments</h3>
                                <div className="mt-1 text-sm text-muted-foreground">
                                  All transactions are secure and encrypted.
                                </div>
                              </div>
                            </div>
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
                              {selectedPaymentMethod === 'credit_card' && (
                                <>
                                  <p className="flex items-center">
                                    <CreditCard className="h-4 w-4 mr-2" />
                                    Credit Card
                                  </p>
                                  <p className="mt-2">**** **** **** 3456</p>
                                  <p>Expiry: 12/25</p>
                                </>
                              )}
                              
                              {selectedPaymentMethod === 'paypal' && (
                                <p className="flex items-center">
                                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.5 8.25L18 12.75H15.75V8.25H19.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15.75 12.75H13.5C12.9477 12.75 12.5 12.3023 12.5 11.75V9.25C12.5 8.69772 12.9477 8.25 13.5 8.25H15.75M15.75 12.75V15M15.75 12.75H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13.5 8.25H6C5.17157 8.25 4.5 8.92157 4.5 9.75V17.25C4.5 18.0784 5.17157 18.75 6 18.75H13.5C14.3284 18.75 15 18.0784 15 17.25V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7.875 11.25H9.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  PayPal
                                </p>
                              )}
                              
                              {selectedPaymentMethod === 'apple_pay' && (
                                <p className="flex items-center">
                                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 6.75C13.6569 6.75 15 5.40685 15 3.75C15 3.41848 14.9354 3.09912 14.8169 2.8059C13.5491 3.01539 12.5525 4.0962 12.5262 5.40725C13.348 5.88414 13.8142 6.76969 13.8142 7.77725C13.8142 8.29362 13.6384 8.77638 13.3388 9.17017C13.1032 9.49181 12.796 9.75 12.4305 9.75C12.1253 9.75 11.908 9.60344 11.6633 9.50619L11.601 9.48136C11.3654 9.38759 11.1008 9.28966 10.804 9.28966C10.5071 9.28966 10.2425 9.38759 10.0069 9.48136L9.94503 9.50604C9.70028 9.60344 9.48298 9.75 9.17852 9.75C8.81228 9.75 8.50502 9.49012 8.26986 9.17017C7.97026 8.77638 7.79437 8.29362 7.79437 7.77725C7.79437 6.76969 8.26043 5.88414 9.08185 5.40725C9.0602 4.68078 8.71656 4.04192 8.18296 3.6142C7.4353 4.1742 6.99997 5.07898 6.99997 6.09415C6.99997 6.61224 7.09705 7.10455 7.27648 7.55535C6.49241 8.21398 6 9.18233 6 10.2499C6 12.3211 7.67893 14 9.75 14H14.25C16.3211 14 18 12.3211 18 10.2499C18 8.82169 17.1893 7.58029 16 6.93012" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8 14V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 14V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16 14V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  Apple Pay
                                </p>
                              )}
                              
                              {selectedPaymentMethod === 'google_pay' && (
                                <p className="flex items-center">
                                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="1.5" />
                                  </svg>
                                  Google Pay
                                </p>
                              )}
                              
                              {selectedPaymentMethod === 'cash_on_delivery' && (
                                <p className="flex items-center">
                                  <Truck className="h-4 w-4 mr-2" />
                                  Pay on Delivery (Cash)
                                </p>
                              )}
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
