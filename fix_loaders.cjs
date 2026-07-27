const fs = require('fs');

// Fix ProductLandingPage
let lpCode = fs.readFileSync('src/pages/ProductLandingPage.tsx', 'utf-8');
lpCode = lpCode.replace(
  /if \(isLoadingProducts\) return \([\s\S]*?<div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"><\/div>\s*<\/div>\s*\);/g,
  `if (!product && isLoadingProducts) return (
    <div className="min-h-screen bg-slate-50 animate-pulse p-4 md:p-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-200 rounded-2xl aspect-square"></div>
        <div className="space-y-4 pt-4">
          <div className="h-10 bg-slate-200 rounded w-3/4"></div>
          <div className="h-6 bg-slate-200 rounded w-1/4"></div>
          <div className="h-24 bg-slate-200 rounded w-full mt-8"></div>
        </div>
      </div>
    </div>
  );`
);
fs.writeFileSync('src/pages/ProductLandingPage.tsx', lpCode);

// Fix HomePage
let hpCode = fs.readFileSync('src/pages/HomePage.tsx', 'utf-8');
hpCode = hpCode.replace(
  /\{isLoadingProducts \? \(/g,
  `{(isLoadingProducts && products.length === 0) ? (`
);
fs.writeFileSync('src/pages/HomePage.tsx', hpCode);

console.log("Loaders fixed");
