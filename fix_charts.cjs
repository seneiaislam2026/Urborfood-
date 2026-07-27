const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
  /margin=\{\{ top: 10, right: 10, left: -20, bottom: 0 \}\}/g,
  `margin={{ top: 10, right: 10, left: 0, bottom: 0 }}`
);

// Also let's add a space after Taka sign in the charts to make it look nicer
code = code.replace(
  /tickFormatter=\{\(value\) => \`৳\$\{value\}\`\}/g,
  `tickFormatter={(value) => \`৳ \${value}\`}`
);
code = code.replace(
  /formatter=\{\(value: number\) => \[\`৳\$\{value\.toLocaleString\('bn-BD'\)\}\`, 'মোট বিক্রি'\]\}/g,
  `formatter={(value: number) => [\`৳ \${value.toLocaleString('bn-BD')}\`, 'মোট বিক্রি']}`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing charts");
