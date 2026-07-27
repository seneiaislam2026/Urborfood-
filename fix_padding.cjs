const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

// Fix dropdown 1
code = code.replace(
  /<span className="truncate pr-2">\{p\.name\} \(\{p\.weight\}\)<\/span>/g,
  `<div className="flex items-baseline min-w-0 flex-1 pr-2"><span className="truncate">{p.name}</span><span className="shrink-0 text-slate-500 text-xs ml-1 whitespace-nowrap">({p.weight})</span></div>`
);

// Fix quantity input 1
code = code.replace(
  /<input\s+type="number"\s+min="1"\s+value=\{manualSelectedQuantity\}\s+onChange=\{\(e\) => setManualSelectedQuantity\(Number\(e\.target\.value\)\)\}\s+className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:border-slate-900 focus:ring-1 focus:ring-slate-900\/10 outline-none text-slate-800 transition-colors"\s+\/>/g,
  `<input type="text" inputMode="numeric" value={manualSelectedQuantity} onChange={(e) => { const val = e.target.value.replace(/[^0-9]/g, ''); setManualSelectedQuantity(val ? Math.max(1, Number(val)) : 1); }} className="w-full px-2 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 outline-none text-slate-800 transition-colors text-center" />`
);

// Fix quantity input 2
code = code.replace(
  /<input \s+type="number" \s+min="1"\s+value=\{manualSelectedQuantity\}\s+onChange=\{\(e\) => setManualSelectedQuantity\(Math\.max\(1, Number\(e\.target\.value\)\)\)\}\s+className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-600"\s+\/>/g,
  `<input type="text" inputMode="numeric" value={manualSelectedQuantity} onChange={(e) => { const val = e.target.value.replace(/[^0-9]/g, ''); setManualSelectedQuantity(val ? Math.max(1, Number(val)) : 1); }} className="w-full px-1 py-2 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-600 text-center" />`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing paddings");
