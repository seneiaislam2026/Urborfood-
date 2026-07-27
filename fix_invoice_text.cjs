const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
    /<Printer size=\{14\} \/> প্রিন্ট করুন/g,
    `<Printer size={14} /> প্রিন্ট / সেভ পিডিএফ`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing invoice button text");
