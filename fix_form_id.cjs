const fs = require('fs');
let code = fs.readFileSync('src/pages/ProductLandingPage.tsx', 'utf-8');

code = code.replace(
  /<form onSubmit=\{handleCheckoutSubmit\} className="space-y-5">/g,
  `<form id="checkout-form-section" onSubmit={handleCheckoutSubmit} className="space-y-5">`
);

code = code.replace(
  /document\.getElementById\('submit-order-btn'\)/g,
  `document.getElementById('checkout-form-section')`
);

fs.writeFileSync('src/pages/ProductLandingPage.tsx', code);
console.log("Fixed form id and observer");
