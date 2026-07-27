const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
  /<span>&nbsp;৳\{invoiceToPrint.items/g,
  `<span>৳ {invoiceToPrint.items`
);

code = code.replace(
  /<span>&nbsp;৳৬০<\/span>/g,
  `<span>৳ ৬০</span>`
);

code = code.replace(
  /<span className="text-base">&nbsp;৳\{invoiceToPrint.total.toLocaleString\('bn-BD'\)\}<\/span>/g,
  `<span className="text-base">৳ {invoiceToPrint.total.toLocaleString('bn-BD')}</span>`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing totals");
