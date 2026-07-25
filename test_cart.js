const fs = require('fs');
const content = fs.readFileSync('src/context/CartContext.tsx', 'utf-8');
console.log(content.includes('cartToast.productPrice * cartToast.quantity'));
