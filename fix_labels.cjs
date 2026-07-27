const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

// Desktop
code = code.replace(
    /<label className="block text-xs text-slate-700 font-bold mb-1\.5">কাস্টমার নাম \*<\/label>/g,
    `<label className="block text-xs text-slate-700 font-bold mb-1.5">কাস্টমার নাম {manualOrderSource !== 'shop' && '*'}</label>`
);

code = code.replace(
    /<label className="block text-xs text-slate-700 font-bold mb-1\.5">মোবাইল নম্বর \*<\/label>/g,
    `<label className="block text-xs text-slate-700 font-bold mb-1.5">মোবাইল নম্বর {manualOrderSource !== 'shop' && '*'}</label>`
);

code = code.replace(
    /<label className="block text-xs text-slate-700 font-bold mb-1\.5">ডেলিভারি ঠিকানা \*<\/label>/g,
    `<label className="block text-xs text-slate-700 font-bold mb-1.5">ডেলিভারি ঠিকানা {manualOrderSource !== 'shop' && '*'}</label>`
);

// Mobile
code = code.replace(
    /<label className="block text-\[10px\] text-slate-500 font-medium mb-1">গ্রাহকের নাম \*<\/label>\s*<input\s*type="text"\s*required/g,
    `<label className="block text-[10px] text-slate-500 font-medium mb-1">গ্রাহকের নাম {manualOrderSource !== 'shop' && '*'}</label>
                    <input 
                      type="text" 
                      required={manualOrderSource !== 'shop'}`
);

code = code.replace(
    /<label className="block text-\[10px\] text-slate-500 font-medium mb-1">মোবাইল নম্বর \*<\/label>\s*<input\s*type="text"\s*required/g,
    `<label className="block text-[10px] text-slate-500 font-medium mb-1">মোবাইল নম্বর {manualOrderSource !== 'shop' && '*'}</label>
                    <input 
                      type="text" 
                      required={manualOrderSource !== 'shop'}`
);

code = code.replace(
    /<label className="block text-\[10px\] text-slate-500 font-medium mb-1">ডেলিভারি ঠিকানা \*<\/label>\s*<input\s*type="text"\s*required/g,
    `<label className="block text-[10px] text-slate-500 font-medium mb-1">ডেলিভারি ঠিকানা {manualOrderSource !== 'shop' && '*'}</label>
                    <input 
                      type="text" 
                      required={manualOrderSource !== 'shop'}`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done updating labels");
