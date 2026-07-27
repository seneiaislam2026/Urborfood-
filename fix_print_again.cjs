const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
  /onClick=\{\(\) => handleA4Print\(\)\}/g,
  `onClick={() => {
    try {
      window.print();
    } catch(e) {
      alert("প্রিন্ট করতে সমস্যা হলে, দয়া করে অ্যাপটি নতুন ট্যাবে (New Tab) ওপেন করে চেষ্টা করুন।");
    }
  }}`
);

// Fix the table wrapping and padding issues
code = code.replace(
  /<th className="py-3 px-4 text-\[10px\] text-xs font-semibold uppercase tracking-wider text-slate-500 text-white uppercase tracking-wider">বিবরণ<\/th>/g,
  `<th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-white">বিবরণ</th>`
);

code = code.replace(
  /<th className="py-3 px-4 text-\[10px\] text-xs font-semibold uppercase tracking-wider text-slate-500 text-white uppercase tracking-wider text-center">পরিমাণ<\/th>/g,
  `<th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-white text-center">পরিমাণ</th>`
);

code = code.replace(
  /<th className="py-3 px-4 text-\[10px\] text-xs font-semibold uppercase tracking-wider text-slate-500 text-white uppercase tracking-wider text-right">মূল্য<\/th>/g,
  `<th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-white text-right">মূল্য</th>`
);

code = code.replace(
  /<th className="py-3 px-4 text-\[10px\] text-xs font-semibold uppercase tracking-wider text-slate-500 text-white uppercase tracking-wider text-right">মোট<\/th>/g,
  `<th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-white text-right">মোট</th>`
);

// Fix td padding
code = code.replace(
  /<td className="py-4 px-4 text-xs font-medium text-slate-700">\{item.name\}<\/td>/g,
  `<td className="py-4 px-6 text-sm font-medium text-slate-700 max-w-[200px] whitespace-normal leading-relaxed">{item.name}</td>`
);

code = code.replace(
  /<td className="py-4 px-4 text-xs font-medium text-slate-700 text-center bg-\[\#f8fafc\]">\{item.quantity\}<\/td>/g,
  `<td className="py-4 px-6 text-sm font-medium text-slate-700 text-center bg-[#f8fafc]">{item.quantity}</td>`
);

code = code.replace(
  /<td className="py-4 px-4 text-xs font-medium text-slate-500 text-right">&nbsp;৳\{item.price.toLocaleString\('bn-BD'\)\}<\/td>/g,
  `<td className="py-4 px-6 text-sm font-medium text-slate-500 text-right">৳ {item.price.toLocaleString('bn-BD')}</td>`
);

code = code.replace(
  /<td className="py-4 px-4 text-xs font-medium text-slate-800 text-right bg-\[\#f8fafc\]">&nbsp;৳\{\(item.price \* item.quantity\).toLocaleString\('bn-BD'\)\}<\/td>/g,
  `<td className="py-4 px-6 text-sm font-medium text-slate-800 text-right bg-[#f8fafc]">৳ {(item.price * item.quantity).toLocaleString('bn-BD')}</td>`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing AdminDashboard print again");
