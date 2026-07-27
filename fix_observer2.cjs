const fs = require('fs');
let code = fs.readFileSync('src/pages/ProductLandingPage.tsx', 'utf-8');

code = code.replace(
  /\}, \[product, isLoadingProducts\]\);/g,
  `}, [product, isLoadingProducts, orderSuccess]);`
);

fs.writeFileSync('src/pages/ProductLandingPage.tsx', code);
console.log("Done fixing observer 2");
