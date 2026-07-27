const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
  /margin=\{\{ top: 10, right: 10, left: 0, bottom: 0 \}\}/g,
  `margin={{ top: 10, right: 10, left: 20, bottom: 0 }}`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing charts margin more");
