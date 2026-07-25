const fs = require('fs');
let content = fs.readFileSync('src/components/home/CategoriesGrid.tsx', 'utf8');

content = content.replace(/min-w-\[100px\] sm:min-w-\[120px\]/g, 'min-w-[72px] sm:min-w-[100px]');
content = content.replace(/w-\[100px\] sm:w-\[120px\] h-\[100px\] sm:h-\[120px\]/g, 'w-[72px] sm:w-[100px] h-[72px] sm:h-[100px]');
content = content.replace(/p-1\.5 mb-3/, 'p-1 sm:p-1.5 mb-2 sm:mb-3');
content = content.replace(/mix-blend-multiply opacity-90 transition-transform duration-500 group-hover:scale-110/g, 'transition-transform duration-500 group-hover:scale-105');
content = content.replace(/text-xs sm:text-sm font-bold text-slate-700/g, 'text-[11px] sm:text-sm font-bold text-slate-700 mt-1');

fs.writeFileSync('src/components/home/CategoriesGrid.tsx', content);
console.log("Done");
