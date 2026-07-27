const fs = require('fs');
let code = fs.readFileSync('src/pages/ProductLandingPage.tsx', 'utf-8');

code = code.replace(
  /const formEl = document\.getElementById\('checkout-form'\);/g,
  `const formEl = document.getElementById('submit-order-btn');`
);

fs.writeFileSync('src/pages/ProductLandingPage.tsx', code);
console.log("Fixed observer target");
