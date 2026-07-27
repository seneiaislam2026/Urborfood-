const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
  /<div className="bg-white rounded-xl border border-slate-200 shadow-sm lg:col-span-8 flex flex-col min-w-0 overflow-hidden order-2 lg:order-1">\n\s*<div className="p-5 border-b border-slate-200 flex items-center justify-between gap-3 flex-wrap shrink-0 bg-gradient-to-r from-white to-slate-50\/50 select-none">/g,
  `<div className="bg-white rounded-xl border border-slate-200 shadow-sm lg:col-span-8 flex flex-col min-w-0 overflow-hidden">\n                  <div className="p-5 border-b border-slate-200 flex items-center justify-between gap-3 flex-wrap shrink-0 bg-gradient-to-r from-white to-slate-50/50 select-none">`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Reverted orders grid");
