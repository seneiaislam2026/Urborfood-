const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');

// 1. Sidebar to a sleek dark theme
// Replace the wrapper
content = content.replace(
  /<div className="w-64 bg-white border-r border-slate-200\/60 hidden md:flex flex-col flex-shrink-0 shadow-\[4px_0_24px_rgba\(0,0,0,0\.02\)\] z-10">/g,
  '<div className="w-64 bg-[#0B1120] border-r border-slate-800 hidden md:flex flex-col flex-shrink-0 z-10">'
);
content = content.replace(
  /<div className="p-5 flex items-center justify-between border-b border-slate-100\/80 bg-white">/g,
  '<div className="p-6 flex items-center justify-between border-b border-slate-800/80 bg-[#0B1120]">'
);
content = content.replace(
  /<span className="text-lg font-black text-emerald-600 tracking-tight leading-snug">{t.appName}<\/span>/g,
  '<span className="text-xl font-black text-white tracking-tight leading-snug">{t.appName}</span>'
);

// Sidebar buttons active/inactive
const activeBtnLight = "bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100/50";
const inactiveBtnLight = "text-slate-500 hover:bg-slate-50 hover:text-slate-900";

const activeBtnDark = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
const inactiveBtnDark = "text-slate-400 hover:bg-white/5 hover:text-white";

content = content.split(activeBtnLight).join(activeBtnDark);
content = content.split(inactiveBtnLight).join(inactiveBtnDark);

// Mobile Sidebar tweaks
content = content.replace(
  /<div className="relative flex flex-col w-72 max-w-\[85vw\] bg-white text-slate-800 h-full shadow-2xl/g,
  '<div className="relative flex flex-col w-72 max-w-[85vw] bg-[#0B1120] text-slate-300 h-full shadow-2xl'
);
content = content.replace(
  /<div className="p-5 flex items-center justify-between border-b border-slate-100 bg-white">/g,
  '<div className="p-5 flex items-center justify-between border-b border-slate-800 bg-[#0B1120]">'
);

// Sidebar bottom sections (lang & logout)
content = content.replace(
  /<div className="p-4 border-t border-slate-100\/80 bg-slate-50\/50 select-none">/g,
  '<div className="p-4 border-t border-slate-800 bg-[#0B1120] select-none">'
);
content = content.replace(
  /<div className="p-4 border-t border-slate-100 bg-slate-50\/50 select-none">/g,
  '<div className="p-4 border-t border-slate-800 bg-[#0B1120] select-none">'
);
content = content.replace(
  /<div className="flex gap-1.5 p-1 bg-slate-200\/50 rounded-xl">/g,
  '<div className="flex gap-1.5 p-1 bg-slate-800/50 rounded-xl border border-slate-700/50">'
);
content = content.replace(
  /bg-white text-emerald-600 shadow-sm/g,
  'bg-emerald-500/20 text-emerald-400 shadow-sm'
);
content = content.replace(
  /text-slate-500 hover:text-slate-700 hover:bg-white\/50/g,
  'text-slate-400 hover:text-slate-200 hover:bg-white/5'
);

content = content.replace(
  /<div className="p-4 border-t border-slate-100 bg-white">/g,
  '<div className="p-4 border-t border-slate-800 bg-[#0B1120]">'
);
content = content.replace(
  /hover:bg-rose-50 hover:text-rose-600/g,
  'hover:bg-rose-500/10 hover:text-rose-400'
);

// 2. Main content Header
content = content.replace(
  /<header className="bg-white border-b border-slate-100 px-4 md:px-8 py-4 md:py-5 flex items-center justify-between sticky top-0 z-20">/g,
  '<header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">'
);

// 3. Stats Cards: from gradients to clean white
content = content.replace(
  /bg-gradient-to-br \${stat\.color} rounded-3xl p-5 border border-white\/10 flex flex-col justify-between shadow-lg shadow-slate-200\/50/g,
  'bg-white rounded-2xl p-5 md:p-6 border border-slate-200 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow'
);
content = content.replace(
  /<div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white\/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"><\/div>/g,
  ''
);
content = content.replace(
  /text-\[11px\] md:text-xs font-bold text-white\/90 uppercase/g,
  'text-xs font-bold text-slate-500 uppercase'
);
content = content.replace(
  /w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 \${stat\.icon} backdrop-blur-sm/g,
  'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${stat.iconBg} text-${stat.iconColor}'
);
content = content.replace(
  /text-2xl md:text-3xl font-black text-white/g,
  'text-2xl md:text-3xl font-black text-slate-800'
);
content = content.replace(
  /text-\[10px\] md:text-\[11px\] font-bold text-white\/80/g,
  'text-[11px] font-bold text-slate-500'
);
content = content.replace(
  /<span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse"><\/span>/g,
  '<span className={`w-1.5 h-1.5 rounded-full inline-block ${stat.dotColor}`}></span>'
);

// Fix the stats array
content = content.replace(
  /color: 'from-emerald-500 to-teal-600', icon: 'bg-white\/20 text-white'/g,
  "iconBg: 'bg-emerald-50', iconColor: 'emerald-600', dotColor: 'bg-emerald-500'"
);
content = content.replace(
  /color: 'from-orange-500 to-amber-500', icon: 'bg-white\/20 text-white'/g,
  "iconBg: 'bg-orange-50', iconColor: 'orange-600', dotColor: 'bg-orange-500'"
);
content = content.replace(
  /color: 'from-blue-500 to-sky-600', icon: 'bg-white\/20 text-white'/g,
  "iconBg: 'bg-blue-50', iconColor: 'blue-600', dotColor: 'bg-blue-500'"
);
content = content.replace(
  /color: 'from-purple-500 to-indigo-600', icon: 'bg-white\/20 text-white'/g,
  "iconBg: 'bg-purple-50', iconColor: 'purple-600', dotColor: 'bg-purple-500'"
);


// 4. Rounded-3xl back to rounded-2xl for all major panels
content = content.replace(/rounded-3xl/g, 'rounded-2xl');

fs.writeFileSync('src/pages/AdminDashboard.tsx', content);
console.log("Done");
