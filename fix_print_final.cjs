const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

// Use handleA4Print
code = code.replace(
  /onClick=\{handleDownloadPdf\}/g,
  `onClick={() => handleA4Print()}`
);

// Remove html2canvas and jspdf from imports
code = code.replace(/import html2canvas from 'html2canvas';\n/, '');
code = code.replace(/import \{ jsPDF \} from 'jspdf';\n/, '');

// Fix table wrapping
code = code.replace(
  /<div className="mb-8 rounded-xl border border-slate-200 overflow-x-auto">/g,
  `<div className="mb-8 rounded-xl border border-slate-200">`
);

code = code.replace(
  /<table className="w-full text-left min-w-\[500px\]">/g,
  `<table className="w-full text-left">`
);

// Fix "Pendi" dropdown by giving it enough width
code = code.replace(
  /className=\`px-3 py-1\.5 rounded-lg text-\[11px\] font-bold outline-none border border-slate-200 cursor-pointer appearance-none \$\{/g,
  `className=\`px-3 py-1.5 min-w-[90px] rounded-lg text-[11px] font-bold outline-none border border-slate-200 cursor-pointer appearance-none \${`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing print final");
