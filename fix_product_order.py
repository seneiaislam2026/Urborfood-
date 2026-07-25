import re

with open('src/pages/ProductLandingPage.tsx', 'r') as f:
    content = f.read()

content = content.replace("import { submitOrder } from '../services/api';", "")

content = content.replace(
    "const { addToCart } = useCart();",
    "const { addToCart, placeOrder, clearCart } = useCart();\n  const [successTrackingId, setSuccessTrackingId] = useState('');\n  const [copied, setCopied] = useState(false);"
)

old_submit = """    setIsSubmitting(true);
    try {
      const orderData = {
        customerName,
        phone,
        address,
        items: [{
          productId: product.id,
          name: product.name,
          price: price,
          quantity: quantity,
          weight: product.weight
        }],
        subtotal: price * quantity,
        deliveryCharge,
        total: totalPrice,
        status: 'Pending'
      };
      
      await submitOrder(orderData);
      setOrderSuccess(true);
      setTimeout(() => {
        setOrderSuccess(false);
        setSelectedProduct(null);
      }, 3000);
    } catch (error) {
      console.error('Order error:', error);
      setFormError('অর্ডারটি সম্পন্ন করা যাচ্ছে না। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }"""

new_submit = """    setIsSubmitting(true);
    try {
      // First clear cart if we are doing a direct buy to avoid mixing
      // clearCart();
      // add to cart then checkout 
      addToCart(product, quantity);
      
      // small delay to let state update, then place order
      setTimeout(() => {
         const trackingId = placeOrder(customerName, phone, address);
         setSuccessTrackingId(trackingId);
         setOrderSuccess(true);
         clearCart();
         setIsSubmitting(false);
      }, 100);
    } catch (error) {
      console.error('Order error:', error);
      setFormError('অর্ডারটি সম্পন্ন করা যাচ্ছে না। অনুগ্রহ করে আবার চেষ্টা করুন।');
      setIsSubmitting(false);
    }"""

content = content.replace(old_submit, new_submit)

old_success = """          <p className="text-slate-500 text-center max-w-sm mb-8 font-medium">আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। আমাদের একজন প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।</p>
          <button 
            onClick={() => setSelectedProduct(null)}
            className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors"
          >
            হোমে ফিরে যান
          </button>"""

new_success = """          <p className="text-slate-500 text-center max-w-sm mb-4 font-medium">আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। আমাদের একজন প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।</p>
          
          <div className="bg-white p-4 rounded-xl border border-slate-200 mb-8 w-full max-w-xs">
            <p className="text-xs text-slate-500 text-center mb-1 uppercase tracking-wider font-bold">আপনার ট্র্যাকিং আইডি</p>
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="font-mono font-bold text-slate-800 text-lg tracking-wider">{successTrackingId}</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(successTrackingId);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className={`p-2 rounded-lg transition-colors ${copied ? 'bg-emerald-100 text-emerald-600' : 'bg-white border border-slate-200 text-slate-500 hover:text-emerald-600'}`}
              >
                {copied ? <CheckCircle2 size={18} /> : 'কপি'}
              </button>
            </div>
          </div>

          <button 
            onClick={() => {
              setOrderSuccess(false);
              setSelectedProduct(null);
            }}
            className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-sm"
          >
            হোমে ফিরে যান
          </button>"""

content = content.replace(old_success, new_success)

# Replace copy icon import
content = content.replace("CheckCircle2, ChevronRight", "CheckCircle2, ChevronRight, Copy")

with open('src/pages/ProductLandingPage.tsx', 'w') as f:
    f.write(content)

