const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
  /className="py-4 px-6 text-sm font-medium text-slate-700 max-w-\[200px\] whitespace-normal leading-relaxed"/g,
  `className="py-4 px-6 text-sm font-medium text-slate-700 leading-relaxed"`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing td");
