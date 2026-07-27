const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
  /const element = document\.getElementById\('printable-invoice'\);\s*if \(!element\) return;\s*try \{/g,
  `const element = document.getElementById('printable-invoice');
    if (!element) return;
    const originalHeight = element.style.height;
    const originalOverflow = element.style.overflow;
    element.style.height = 'auto';
    element.style.overflow = 'visible';
    try {`
);

code = code.replace(
  /\} catch\(e\) \{\s*alert\("পিডিএফ সেভ করতে সমস্যা হয়েছে\。"\);\s*\}/g,
  `} catch(e) {
      alert("পিডিএফ সেভ করতে সমস্যা হয়েছে।");
    } finally {
      element.style.height = originalHeight;
      element.style.overflow = originalOverflow;
    }`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing PDF overflow");
