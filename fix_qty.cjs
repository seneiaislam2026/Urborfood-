const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
  /<input type="text" inputMode="numeric" value=\{manualSelectedQuantity\} onChange=\{\(e\) => \{ const val = e\.target\.value\.replace\(\/\[\^0-9\]\/g, ''\); setManualSelectedQuantity\(val \? Math\.max\(1, Number\(val\)\) : 1\); \}\} className="w-full px-2 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:border-slate-900 focus:ring-1 focus:ring-slate-900\/10 outline-none text-slate-800 transition-colors text-center" \/>/g,
  `<input type="number" min="1" value={manualSelectedQuantity} onChange={(e) => setManualSelectedQuantity(Number(e.target.value) || 1)} className="w-full px-2 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 outline-none text-slate-800 transition-colors text-center leading-relaxed" />`
);

code = code.replace(
  /<input type="text" inputMode="numeric" value=\{manualSelectedQuantity\} onChange=\{\(e\) => \{ const val = e\.target\.value\.replace\(\/\[\^0-9\]\/g, ''\); setManualSelectedQuantity\(val \? Math\.max\(1, Number\(val\)\) : 1\); \}\} className="w-full px-1 py-2 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-600 text-center" \/>/g,
  `<input type="number" min="1" value={manualSelectedQuantity} onChange={(e) => setManualSelectedQuantity(Number(e.target.value) || 1)} className="w-full px-1 py-2 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-600 text-center leading-relaxed" />`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing qty");
