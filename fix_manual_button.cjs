const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');

// The button has this structure:
// <button 
//   onClick={() => {
//     setManualOrderCustomerName('');
//     setManualOrderPhone('');
//     setManualOrderAddress('');
//     setManualOrderItems([]);
//     setManualSelectedProductId(products[0]?.id || '');
//     setManualSelectedQuantity(1);
//     setIsManualOrderModalOpen(true);
//   }}
//   className="col-span-2 flex items-center justify-center gap-2 bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-800 py-3 px-4 rounded-xl transition-all font-bold cursor-pointer hover:-translate-y-0.5"
// >
//   <span className="text-[11px]">ম্যানুয়াল অর্ডার তৈরি করুন</span>
// </button>

const regex = /<button \s*onClick=\{\(\) => \{\s*setManualOrderCustomerName\(''\);\s*setManualOrderPhone\(''\);\s*setManualOrderAddress\(''\);\s*setManualOrderItems\(\[\]\);\s*setManualSelectedProductId\(products\[0\]\?\.id \|\| ''\);\s*setManualSelectedQuantity\(1\);\s*setIsManualOrderModalOpen\(true\);\s*\}\}\s*className="col-span-2 flex items-center justify-center gap-2 bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-800 py-3 px-4 rounded-xl transition-all font-bold cursor-pointer hover:-translate-y-0\.5"\s*>\s*<span className="text-\[11px\]">ম্যানুয়াল অর্ডার তৈরি করুন<\/span>\s*<\/button>/g;

content = content.replace(regex, '');

fs.writeFileSync('src/pages/AdminDashboard.tsx', content);
console.log("Done");
