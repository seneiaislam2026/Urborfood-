const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
  /<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900\/60 print:bg-white">/g,
  `<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 print:bg-white print:static print:block print:p-0 print:inset-auto">`
);

code = code.replace(
  /<div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-\[90vh\] print:fixed print:inset-0 print:m-0 print:w-full print:max-w-none print:h-auto print:max-h-none print:rounded-none print:shadow-none print:border-none print:overflow-visible">/g,
  `<div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[90vh] print:static print:m-0 print:w-full print:max-w-none print:h-auto print:max-h-none print:rounded-none print:shadow-none print:border-none print:overflow-visible print:block">`
);

code = code.replace(
  /<div className="flex-1 overflow-y-auto p-8 md:p-10 print:p-8 bg-white" id="printable-invoice" ref=\{a4PrintRef\}>/g,
  `<div className="flex-1 overflow-y-auto p-8 md:p-10 print:p-0 bg-white print:overflow-visible" id="printable-invoice" ref={a4PrintRef}>`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing modal static");
