const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
  /addNotification\('সতর্কতা', 'অনুগ্রহ করে গ্রাহকের সম্পূর্ণ বিবরণ ও তথ্য প্রদান করুন।'\);/g,
  `alert('অনুগ্রহ করে গ্রাহকের সম্পূর্ণ বিবরণ ও তথ্য প্রদান করুন।');`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing remaining Admin dashboard alerts");
