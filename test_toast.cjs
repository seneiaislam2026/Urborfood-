const fs = require('fs');
const content = fs.readFileSync('src/context/CartContext.tsx', 'utf-8');
const match = content.match(/setCartToast\(\{([\s\S]*?)\}\);/);
console.log(match ? match[0] : 'not found');
