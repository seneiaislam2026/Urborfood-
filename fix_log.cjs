const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
  /alert\("পিডিএফ সেভ করতে সমস্যা হয়েছে\。"\);/,
  `console.error("PDF generation error:", e);\n      alert("পিডিএফ সেভ করতে সমস্যা হয়েছে। Error: " + (e.message || String(e)));`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
