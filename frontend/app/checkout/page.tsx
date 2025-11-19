"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../../store/auth";
import { API_ENDPOINTS } from "../../lib/api";

interface CartItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: string;
    image_url?: string;
  };
  quantity: number;
}

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentInfo {
  method: 'credit_card' | 'paypal' | 'stripe';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardName?: string;
}

export default function CheckoutPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [processing, setProcessing] = useState(false);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: 'credit_card',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!user || !token) {
      router.push("/login");
      return;
    }

    fetchCartItems();
  }, [user, token, router]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.cart.list, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      router.push("/cart");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
      0
    );
    const shipping = subtotal > 100 ? 0 : 15;
    const tax = subtotal * 0.08; // 8% tax
    return {
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      tax: tax.toFixed(2),
      total: (subtotal + shipping + tax).toFixed(2),
    };
  };

  const validateShipping = () => {
    const newErrors: { [key: string]: string } = {};

    if (!shippingInfo.firstName.trim()) newErrors.firstName = "First name is required";
    if (!shippingInfo.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!shippingInfo.email.trim()) newErrors.email = "Email is required";
    if (!shippingInfo.phone.trim()) newErrors.phone = "Phone is required";
    if (!shippingInfo.address.trim()) newErrors.address = "Address is required";
    if (!shippingInfo.city.trim()) newErrors.city = "City is required";
    if (!shippingInfo.state.trim()) newErrors.state = "State is required";
    if (!shippingInfo.zipCode.trim()) newErrors.zipCode = "ZIP code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors: { [key: string]: string } = {};

    if (paymentInfo.method === 'credit_card') {
      if (!paymentInfo.cardNumber?.trim()) newErrors.cardNumber = "Card number is required";
      if (!paymentInfo.expiryDate?.trim()) newErrors.expiryDate = "Expiry date is required";
      if (!paymentInfo.cvv?.trim()) newErrors.cvv = "CVV is required";
      if (!paymentInfo.cardName?.trim()) newErrors.cardName = "Cardholder name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateShipping()) return;
    if (currentStep === 2 && !validatePayment()) return;
    setCurrentStep(currentStep + 1);
  };

  const handlePlaceOrder = async () => {
    setProcessing(true);
    try {
      // Create order
      const orderData = {
        shipping_info: shippingInfo,
        payment_method: paymentInfo.method,
        items: cartItems.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        }))
      };

      await axios.post(API_ENDPOINTS.orders.create, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Clear cart after successful order
      setCartItems([]);
      setCurrentStep(4); // Success step
    } catch (error: any) {
      console.error("Order failed:", error);
      alert("Order failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600">Loading checkout...</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</div>
          <button
            onClick={() => router.push("/products")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const totals = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    currentStep >= step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {step === 4 && currentStep === 4 ? '✓' : step}
                </div>
                <span className="ml-2 text-sm font-medium">
                  {step === 1 && 'Shipping'}
                  {step === 2 && 'Payment'}
                  {step === 3 && 'Review'}
                  {step === 4 && 'Complete'}
                </span>
                {step < 4 && <div className="w-16 h-px bg-gray-300 ml-8" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                        className={`w-full p-3 border rounded-lg ${errors.firstName ? 'border-red-300' : 'border-gray-300'}`}
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                        className={`w-full p-3 border rounded-lg ${errors.lastName ? 'border-red-300' : 'border-gray-300'}`}
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                        className={`w-full p-3 border rounded-lg ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                        className={`w-full p-3 border rounded-lg ${errors.phone ? 'border-red-300' : 'border-gray-300'}`}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      className={`w-full p-3 border rounded-lg ${errors.address ? 'border-red-300' : 'border-gray-300'}`}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        className={`w-full p-3 border rounded-lg ${errors.city ? 'border-red-300' : 'border-gray-300'}`}
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                        className={`w-full p-3 border rounded-lg ${errors.state ? 'border-red-300' : 'border-gray-300'}`}
                      />
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                      <input
                        type="text"
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                        className={`w-full p-3 border rounded-lg ${errors.zipCode ? 'border-red-300' : 'border-gray-300'}`}
                      />
                      {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-4">Payment Method</label>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="credit_card"
                          checked={paymentInfo.method === 'credit_card'}
                          onChange={(e) => setPaymentInfo({...paymentInfo, method: e.target.value as any})}
                          className="mr-3"
                        />
                        Credit Card
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="paypal"
                          checked={paymentInfo.method === 'paypal'}
                          onChange={(e) => setPaymentInfo({...paymentInfo, method: e.target.value as any})}
                          className="mr-3"
                        />
                        PayPal
                      </label>
                    </div>
                  </div>

                  {paymentInfo.method === 'credit_card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={paymentInfo.cardNumber || ''}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                          className={`w-full p-3 border rounded-lg ${errors.cardNumber ? 'border-red-300' : 'border-gray-300'}`}
                        />
                        {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={paymentInfo.expiryDate || ''}
                            onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                            className={`w-full p-3 border rounded-lg ${errors.expiryDate ? 'border-red-300' : 'border-gray-300'}`}
                          />
                          {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            value={paymentInfo.cvv || ''}
                            onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                            className={`w-full p-3 border rounded-lg ${errors.cvv ? 'border-red-300' : 'border-gray-300'}`}
                          />
                          {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                        <input
                          type="text"
                          value={paymentInfo.cardName || ''}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                          className={`w-full p-3 border rounded-lg ${errors.cardName ? 'border-red-300' : 'border-gray-300'}`}
                        />
                        {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Shipping Address</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                        <p>{shippingInfo.address}</p>
                        <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                        <p>{shippingInfo.phone}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Payment Method</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="capitalize">{paymentInfo.method.replace('_', ' ')}</p>
                        {paymentInfo.method === 'credit_card' && paymentInfo.cardNumber && (
                          <p>**** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Order Items</h3>
                      <div className="space-y-3">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                              {item.product.image_url && (
                                <img src={item.product.image_url} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                              )}
                              <div>
                                <h4 className="font-semibold">{item.product.name}</h4>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                              </div>
                            </div>
                            <p className="font-semibold">${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Order Complete */}
              {currentStep === 4 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h2>
                  <p className="text-gray-600 mb-8">Thank you for your purchase. You will receive an email confirmation shortly.</p>
                  <div className="space-y-4">
                    <button
                      onClick={() => router.push("/products")}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                      Continue Shopping
                    </button>
                    <button
                      onClick={() => router.push("/dashboard")}
                      className="block mx-auto text-blue-600 hover:text-blue-700"
                    >
                      View Order History
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <button
                    onClick={() => currentStep === 1 ? router.push("/cart") : setCurrentStep(currentStep - 1)}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    {currentStep === 1 ? "Back to Cart" : "Previous"}
                  </button>
                  
                  {currentStep < 3 && (
                    <button
                      onClick={handleNext}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Continue
                    </button>
                  )}
                  
                  {currentStep === 3 && (
                    <button
                      onClick={handlePlaceOrder}
                      disabled={processing}
                      className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                    >
                      {processing ? "Processing..." : "Place Order"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          {currentStep < 4 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.product.name} × {item.quantity}</span>
                      <span>${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totals.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${totals.shipping}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${totals.tax}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>${totals.total}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}