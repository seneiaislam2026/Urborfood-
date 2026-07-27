const fs = require('fs');
let code = fs.readFileSync('src/context/CartContext.tsx', 'utf-8');

code = code.replace(
    /const addSimulatedOrder = \(simulatedOrder: Order\) => \{/,
    `const addSimulatedOrder = (simulatedOrder: Order, silent: boolean = false) => {`
);

code = code.replace(
    /triggerOrderNotification\(simulatedOrder\);\s*\};/g,
    `if (!silent) triggerOrderNotification(simulatedOrder);\n  };`
);

fs.writeFileSync('src/context/CartContext.tsx', code);
console.log("Done fixing CartContext");
