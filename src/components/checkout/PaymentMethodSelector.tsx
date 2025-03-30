
import React from 'react';
import { 
  PaymentMethodRadioGroup, 
  PaymentMethodRadioItem 
} from '@/components/ui/radio-group';
import { 
  CreditCard, 
  Paypal, 
  Apple, 
  Wallet, 
  TruckDelivery, 
  AlertCircle 
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  setSelectedMethod: (method: string) => void;
  error?: string;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  setSelectedMethod,
  error
}) => {
  // Payment methods data
  const paymentMethods = [
    {
      id: 'credit_card',
      name: 'Credit Card',
      description: 'Pay securely with your credit card',
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Fast and secure payment with PayPal',
      icon: <Paypal className="h-5 w-5" />,
    },
    {
      id: 'apple_pay',
      name: 'Apple Pay',
      description: 'Pay with Apple Pay if you have an Apple device',
      icon: <Apple className="h-5 w-5" />,
    },
    {
      id: 'google_pay',
      name: 'Google Pay',
      description: 'Quick checkout with Google Pay',
      icon: <Wallet className="h-5 w-5" />,
    },
    {
      id: 'cash_on_delivery',
      name: 'Pay on Delivery',
      description: 'Pay with cash when your order arrives',
      icon: <TruckDelivery className="h-5 w-5" />,
    },
  ];

  const handleChange = (value: string) => {
    setSelectedMethod(value);
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <PaymentMethodRadioGroup 
        value={selectedMethod} 
        onValueChange={handleChange}
      >
        {paymentMethods.map((method) => (
          <PaymentMethodRadioItem
            key={method.id}
            value={method.id}
            id={method.id}
            icon={method.icon}
            description={method.description}
          >
            {method.name}
          </PaymentMethodRadioItem>
        ))}
      </PaymentMethodRadioGroup>

      {/* Dynamic extra fields based on selected payment method */}
      {selectedMethod === 'credit_card' && (
        <div className="mt-4 p-4 bg-muted/50 rounded-md">
          <p className="text-sm text-muted-foreground mb-2">
            For demo purposes, use any future date and any 3 digits for CVV
          </p>
          <p className="text-xs text-muted-foreground">
            All payment information is securely processed
          </p>
        </div>
      )}
      
      {selectedMethod === 'cash_on_delivery' && (
        <div className="mt-4 p-4 bg-muted/50 rounded-md">
          <p className="text-sm">
            You'll pay the full amount when your order is delivered.
            Our delivery person will accept cash or card payment.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;
