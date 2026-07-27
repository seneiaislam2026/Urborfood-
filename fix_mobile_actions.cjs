const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
    /<button\s*onClick=\{\(\) => setSelectedOrder\(order\)\}/,
    `<button 
                               onClick={() => setInvoiceToPrint(order)}
                              className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors shrink-0 flex items-center gap-1"
                            >
                              <Printer size={12} /> ইনভয়েস
                            </button>
                            <button 
                               onClick={() => setSelectedOrder(order)}`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing mobile actions");
