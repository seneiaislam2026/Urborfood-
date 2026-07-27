const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
  /<div className="mb-8 rounded-xl border border-slate-200 overflow-hidden">/g,
  `<div className="mb-8 rounded-xl border border-slate-200 overflow-x-auto">`
);

code = code.replace(
  /<table className="w-full text-left">/g,
  `<table className="w-full text-left min-w-[500px]">`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing invoice mobile layout");
