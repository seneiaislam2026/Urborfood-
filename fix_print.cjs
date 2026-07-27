const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

// Use setInvoiceToPrint instead of setOrderToPrint for manual order
code = code.replace(
  /setOrderToPrint\(newOrderObj\);/g,
  `setInvoiceToPrint(newOrderObj);`
);

// We also change the action button in the table just in case
code = code.replace(
  /onClick=\{\(\) => setOrderToPrint\(order\)\}/g,
  `onClick={() => setInvoiceToPrint(order)}`
);

// For the notifications, replace addNotification for stock with alert()
code = code.replace(
  /addNotification\('সতর্কতা', \`দুঃখিত! এই পণ্যটির স্টক সংখ্যা সীমিত \(\$\{p.stock\} টি\)।\`\);/g,
  `alert(\`দুঃখিত! এই পণ্যটির স্টক সংখ্যা সীমিত (\$\{p.stock\} টি)।\`);`
);

code = code.replace(
  /addNotification\('সতর্কতা', 'অনুগ্রহ করে কাস্টমারের নাম, ফোন নম্বর ও ডেলিভারি ঠিকানা সঠিকভাবে লিখুন।'\);/g,
  `alert('অনুগ্রহ করে কাস্টমারের নাম, ফোন নম্বর ও ডেলিভারি ঠিকানা সঠিকভাবে লিখুন।');`
);

code = code.replace(
  /addNotification\('সতর্কতা', 'অনুগ্রহ করে অন্তত ১টি পণ্য যুক্ত করুন।'\);/g,
  `alert('অনুগ্রহ করে অন্তত ১টি পণ্য যুক্ত করুন।');`
);

code = code.replace(
  /addNotification\('সতর্কতা', 'অনুগ্রহ করে একটি সঠিক বাংলাদেশী মোবাইল নম্বর লিখুন \(যেমন: 017XXXXXXXX\)।'\);/g,
  `alert('অনুগ্রহ করে একটি সঠিক বাংলাদেশী মোবাইল নম্বর লিখুন (যেমন: 017XXXXXXXX)।');`
);

code = code.replace(
  /addNotification\('সতর্কতা', 'অনুগ্রহ করে পণ্য নির্বাচন করুন।'\);/g,
  `alert('অনুগ্রহ করে পণ্য নির্বাচন করুন।');`
);

// Also remove addNotification from successful manual order creations to avoid cluttering the dropdown, since the user gets a modal anyway.
code = code.replace(
  /addNotification\(\s*'ম্যানুয়াল অর্ডার তৈরি করা হয়েছে 🎉',\s*\`কাস্টমার \$\{manualOrderCustomerName\} এর জন্য ৳\$\{totalBill\} মূল্যের অর্ডারটি সফলভাবে এন্ট্রি করা হয়েছে।\`\s*\);/g,
  ``
);

code = code.replace(
  /addNotification\(\s*'ম্যানুয়াল অর্ডার বুকিং করা হয়েছে 📝',\s*\`গ্রাহক \$\{manualOrderCustomerName\} এর জন্য ৳\$\{grandTotal\} টাকার নতুন অর্ডার বুকিং সম্পন্ন।\`\s*\);/g,
  ``
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing AdminDashboard");
