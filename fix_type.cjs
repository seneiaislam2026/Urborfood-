const fs = require('fs');
let code = fs.readFileSync('src/context/CartContext.tsx', 'utf-8');

code = code.replace(
    /addSimulatedOrder: \(order: Order\) => void;/g,
    `addSimulatedOrder: (order: Order, silent?: boolean) => void;`
);

fs.writeFileSync('src/context/CartContext.tsx', code);
console.log("Done fixing interface");
