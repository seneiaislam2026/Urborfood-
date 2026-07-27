const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

// Fix input field in Manual Order (Form 2)
code = code.replace(
  /className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium outline-none bg-white hover:bg-\[#f8fafc\] transition-colors focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600\/10"/g,
  `className="w-full px-3 py-2.5 leading-relaxed rounded-xl border border-slate-200 text-sm font-medium outline-none bg-white hover:bg-[#f8fafc] transition-colors focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/10"`
);

// Fix truncate spans in the dropdown
code = code.replace(
  /<span className="truncate">\{p\.name\}<\/span>/g,
  `<span className="truncate py-0.5 leading-relaxed">{p.name}</span>`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing one");
