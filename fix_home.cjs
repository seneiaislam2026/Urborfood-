const fs = require('fs');
let code = fs.readFileSync('src/pages/HomePage.tsx', 'utf-8');

code = code.replace(
  /const \{ products, addToCart \} = useCart\(\);/g,
  `const { products, addToCart, isLoadingProducts } = useCart();`
);

code = code.replace(
  /\{filteredProducts\.length > 0 \? \(/g,
  `{isLoadingProducts ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-3 sm:p-4 animate-pulse">
                      <div className="w-full aspect-square bg-slate-200 rounded-xl mb-4"></div>
                      <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/2 mb-4"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-5 bg-slate-200 rounded w-1/3"></div>
                        <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (`
);

fs.writeFileSync('src/pages/HomePage.tsx', code);
console.log("Done fixing home loader");
