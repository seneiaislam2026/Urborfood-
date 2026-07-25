const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');

// The panels use this specific styling for big cards:
// bg-white rounded-xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]
// Let's refine them to a super clean look with slightly lighter border: border-slate-200/60
content = content.replace(/border-slate-100 shadow-\[0_8px_30px_rgb\(0,0,0,0\.02\)\]/g, 'border-slate-200/60 shadow-sm');
content = content.replace(/border-slate-100 shadow-sm/g, 'border-slate-200/60 shadow-sm');
content = content.replace(/border-slate-50 /g, 'border-slate-100/60 ');
content = content.replace(/border-slate-100/g, 'border-slate-200/60');
content = content.replace(/divide-slate-100/g, 'divide-slate-200/60');

// Input fields and textareas inside the Admin Dashboard:
content = content.replace(/border-slate-200\/60/g, 'border-slate-200'); // ensure inputs have a bit of visibility
content = content.replace(/focus:border-emerald-500/g, 'focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10'); 

// Button styles (specifically the update/save buttons)
content = content.replace(/bg-emerald-600 hover:bg-emerald-700/g, 'bg-slate-900 hover:bg-slate-800');
content = content.replace(/bg-\[\#00a651\] hover:bg-green-700/g, 'bg-slate-900 hover:bg-slate-800');

// "LIVE" badge on top left
content = content.replace(/bg-emerald-100 text-emerald-600/g, 'bg-emerald-500/20 text-emerald-400');
content = content.replace(/border border-emerald-200/g, 'border border-emerald-500/20');

// Ensure stats cards have subtle shadow
content = content.replace(/shadow-sm hover:shadow-md/g, 'shadow-sm hover:shadow-md hover:border-slate-300');

fs.writeFileSync('src/pages/AdminDashboard.tsx', content);
console.log("Done");
