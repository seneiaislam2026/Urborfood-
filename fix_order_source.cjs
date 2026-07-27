const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
  /salesman: manualOrderSalesman\s*\};\s*\/\/ Deduct from product stocks/g,
  `salesman: manualOrderSalesman,\n                            source: manualOrderSource\n                          };\n                          // Deduct from product stocks`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing manual order source");
