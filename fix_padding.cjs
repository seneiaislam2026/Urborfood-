const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
  /className="flex items-center gap-2 overflow-x-auto no-scrollbar justify-end w-full"/g,
  `className="flex flex-wrap items-center gap-2 justify-end w-full"`
);

// Also check for other places with overflow-x-auto in buttons
code = code.replace(
  /className="pt-4 border-t border-slate-200 flex flex-wrap gap-2 justify-end shrink-0 select-none"/g,
  `className="pt-4 border-t border-slate-200 flex flex-wrap gap-2 justify-end shrink-0 select-none w-full"`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing padding/wrap");
