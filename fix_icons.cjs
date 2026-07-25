const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');

// Remove the PlusCircle icon from the manual order button
content = content.replace(/<PlusCircle size=\{16\} \/>\s*<span className="text-\[11px\]">ম্যানুয়াল অর্ডার তৈরি করুন<\/span>/g, '<span className="text-[11px]">ম্যানুয়াল অর্ডার তৈরি করুন</span>');
content = content.replace(/<PlusCircle size=\{14\} \/>/g, '');

fs.writeFileSync('src/pages/AdminDashboard.tsx', content);
console.log("Done");
