const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');

// Typography Fixes
// Replace font-black with font-bold for standard headers, and font-extrabold with font-semibold
content = content.replace(/font-black/g, 'font-bold');
content = content.replace(/font-extrabold/g, 'font-semibold');
// In some cases font-bold was overused for body text, change to font-medium
content = content.replace(/text-slate-500 font-bold/g, 'text-slate-500 font-medium');
content = content.replace(/text-slate-600 font-bold/g, 'text-slate-600 font-medium');

// Card styles
// Convert rounded-2xl to rounded-xl for a more professional, less "bubbly" feel
content = content.replace(/rounded-2xl/g, 'rounded-xl');
content = content.replace(/rounded-3xl/g, 'rounded-xl');

// Subtle Borders
content = content.replace(/border-slate-200/g, 'border-slate-200/60');
content = content.replace(/border-slate-150/g, 'border-slate-200/60');
content = content.replace(/divide-slate-150\/60/g, 'divide-slate-200/60');

// Top Header
content = content.replace(/bg-white\/80 backdrop-blur-md border-b border-slate-200\/60/g, 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60');

// Table Headers
content = content.replace(/bg-slate-50\/60 border-b border-slate-100/g, 'bg-slate-50/50 border-b border-slate-200/60');
content = content.replace(/text-\[10px\] uppercase tracking-wider text-slate-500/g, 'text-xs font-semibold text-slate-500');

// Primary Actions - some were emerald, change to slate-900 for that premium "Vercel/Stripe" look
content = content.replace(/bg-emerald-600 hover:bg-emerald-700 text-white/g, 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm');
content = content.replace(/bg-emerald-600 hover:bg-slate-800/g, 'bg-slate-900 hover:bg-slate-800');

// Sidebar App Name
content = content.replace(/text-xl font-bold text-white tracking-tight leading-snug/g, 'text-xl font-semibold text-white tracking-tight leading-snug');
// Active Sidebar Tab - make it stand out a bit more with a solid slate or subtle emerald
content = content.replace(/bg-emerald-500\/10 text-emerald-400 border border-emerald-500\/20/g, 'bg-emerald-500/15 text-emerald-400 font-semibold');

// Quick view of the sidebar active states
content = content.replace(/text-slate-400 hover:bg-white\/5 hover:text-white/g, 'text-slate-400 hover:bg-white/5 hover:text-slate-200 font-medium');

// The orders badge
content = content.replace(/bg-rose-500 text-white text-\[10px\] px-2 py-0.5 rounded-full font-bold shadow-sm/g, 'bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-md font-bold');

fs.writeFileSync('src/pages/AdminDashboard.tsx', content);
console.log("Done");
