const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
    /addSimulatedOrder\(newOrderObj\);/g,
    `addSimulatedOrder(newOrderObj, true);`
);

code = code.replace(
    /addSimulatedOrder\(newManualOrderObj\);/g,
    `addSimulatedOrder(newManualOrderObj, true);`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing Admin silent");
