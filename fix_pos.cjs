const fs = require('fs');
let code = fs.readFileSync('src/components/admin/POSInvoicePrint.tsx', 'utf-8');

code = code.replace(
    /if \(\(num = num\.toString\(\)\)\.length > 9\) return 'overflow';/g,
    `let numStr = num.toString();
  if (numStr.length > 9) return 'overflow';`
);

code = code.replace(
    /const n = \('000000000' \+ num\)\.substring\(num\.length > 9 \? num\.length - 9 : 0\)\.match\(\/\^\(\\d\{2\}\)\(\\d\{2\}\)\(\\d\{2\}\)\(\\d\{1\}\)\(\\d\{2\}\)\$\/\);/g,
    `const n = ('000000000' + numStr).substring(numStr.length > 9 ? numStr.length - 9 : 0).match(/^(\\d{2})(\\d{2})(\\d{2})(\\d{1})(\\d{2})$/);`
);

fs.writeFileSync('src/components/admin/POSInvoicePrint.tsx', code);
console.log("Done fixing POSInvoicePrint");
