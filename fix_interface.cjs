const fs = require('fs');
let code = fs.readFileSync('src/context/CartContext.tsx', 'utf-8');

code = code.replace(
  /salesman\?: string;/g,
  `salesman?: string;\n  source?: 'website' | 'facebook' | 'whatsapp' | 'shop';`
);

fs.writeFileSync('src/context/CartContext.tsx', code);
console.log("Done fixing interface");
