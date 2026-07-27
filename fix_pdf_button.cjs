const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

const target = `onClick={() => {
    try {
      window.print();
    } catch(e) {
      alert("প্রিন্ট করতে সমস্যা হলে, দয়া করে অ্যাপটি নতুন ট্যাবে (New Tab) ওপেন করে চেষ্টা করুন।");
    }
  }}`;
  
code = code.replace(target, `onClick={handleDownloadPdf}`);
fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing button exactly");
