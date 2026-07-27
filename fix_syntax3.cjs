const fs = require('fs');
let code = fs.readFileSync('src/context/CartContext.tsx', 'utf-8');
let lines = code.split('\n');

// Find index of "const unsubOrders"
const unsubOrdersIndex = lines.findIndex(line => line.includes('const unsubOrders = onSnapshot'));

// Keep all lines up to unsubOrdersIndex, but remove the 4 extra lines before it
// Let's just manually splice it
lines.splice(unsubOrdersIndex - 4, 4);

fs.writeFileSync('src/context/CartContext.tsx', lines.join('\n'));
console.log("Fixed");
