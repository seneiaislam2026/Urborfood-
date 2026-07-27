const fs = require('fs');
let code = fs.readFileSync('src/pages/ProductLandingPage.tsx', 'utf-8');

code = code.replace(
  /const \{ products, addToCart, placeOrder, clearCart, orders, reviews, addReview \} = useCart\(\);/g,
  `const { products, addToCart, placeOrder, clearCart, orders, reviews, addReview, isLoadingProducts } = useCart();`
);

code = code.replace(
  /if \(!product\) return \([\s\S]*?<div className="min-h-screen flex items-center justify-center bg-slate-50">[\s\S]*?<h2 className="text-2xl font-bold text-slate-800 mb-2">পণ্যটি পাওয়া যায়নি<\/h2>[\s\S]*?<\/button>\s*<\/div>\s*<\/div>\s*\);/g,
  `if (isLoadingProducts) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">পণ্যটি পাওয়া যায়নি</h2>
        <button 
          onClick={onBack || (() => setSelectedProduct(null))}
          className="text-emerald-600 font-semibold flex items-center gap-2 justify-center mx-auto hover:text-emerald-700"
        >
          <ChevronLeft size={20} /> ফিরে যান
        </button>
      </div>
    </div>
  );`
);

fs.writeFileSync('src/pages/ProductLandingPage.tsx', code);
console.log("Done fixing landing loader");
