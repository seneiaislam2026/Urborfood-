const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

// 1. Add print:hidden to Sidebar
code = code.replace(
  /<div className="w-\[280px\] bg-slate-100 hidden md:flex flex-col flex-shrink-0 z-10 border-r border-slate-200\/60 overflow-hidden">/g,
  `<div className="w-[280px] bg-slate-100 hidden md:flex flex-col flex-shrink-0 z-10 border-r border-slate-200/60 overflow-hidden print:hidden">`
);

// 2. Add print:hidden to Main Content Area
code = code.replace(
  /<div className="flex-1 flex flex-col overflow-hidden min-w-0">/g,
  `<div className="flex-1 flex flex-col overflow-hidden min-w-0 print:hidden">`
);

// 3. Update main container to allow print overflow
code = code.replace(
  /<div className="flex h-screen bg-gray-50 overflow-hidden font-sans text-slate-800">/g,
  `<div className="flex h-screen bg-gray-50 overflow-hidden font-sans text-slate-800 print:overflow-visible print:h-auto print:block">`
);

// 4. Update handleA4Print to just be window.print()
// We will replace the button's onClick
code = code.replace(
  /onClick=\{\(\) => handleA4Print\(\)\}/g,
  `onClick={() => window.print()}`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing print layout");
