const fs = require('fs');
let code = fs.readFileSync('src/components/layout/Layout.tsx', 'utf-8');

code = code.replace(
  /const HomePage = lazy\(\(\) => import\('\.\.\/\.\.\/pages\/HomePage'\)\);/,
  `import HomePage from '../../pages/HomePage';`
);

code = code.replace(
  /const ProductLandingPage = lazy\(\(\) => import\('\.\.\/\.\.\/pages\/ProductLandingPage'\)\);/,
  `import ProductLandingPage from '../../pages/ProductLandingPage';`
);

code = code.replace(
  /<Suspense fallback=\{<div className="h-screen w-full flex items-center justify-center bg-white"><Loader2 className="w-8 h-8 text-emerald-600 animate-spin" \/><\/div>\}>\s*<ProductLandingPage\s*productId=\{landingProductId\}\s*onBack=\{\(\) => \{ window\.location\.hash = ''; \}\}\s*\/>\s*<\/Suspense>/g,
  `<ProductLandingPage 
            productId={landingProductId} 
            onBack={() => { window.location.hash = ''; }} 
          />`
);

code = code.replace(
  /<Suspense fallback=\{<div className="min-h-screen w-full flex items-center justify-center bg-white"><Loader2 className="w-8 h-8 text-emerald-600 animate-spin" \/><\/div>\}>\s*<HomePage \/>\s*<\/Suspense>/g,
  `<HomePage />`
);

fs.writeFileSync('src/components/layout/Layout.tsx', code);
console.log("Lazy loads removed for storefront");
