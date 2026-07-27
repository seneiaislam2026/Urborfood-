const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
    /\{selectedOrder.status !== 'Completed' && \(\s*<button \s*onClick=\{\(\) => \{ setBookingOrder\(selectedOrder\); setSelectedOrder\(null\); \}\}\s*className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-all shadow-sm cursor-pointer"\s*>\s*<Truck size=\{13\} \/> কুরিয়ার বুকিং করুন\s*<\/button>\s*\)\}/g,
    `<button 
                  onClick={() => { setInvoiceToPrint(selectedOrder); setSelectedOrder(null); }}
                  className="px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all shadow-sm cursor-pointer"
                >
                  <Printer size={13} /> ইনভয়েস
                </button>
                {selectedOrder.status !== 'Completed' && (
                  <button 
                    onClick={() => { setBookingOrder(selectedOrder); setSelectedOrder(null); }}
                    className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-all shadow-sm cursor-pointer"
                  >
                    <Truck size={13} /> কুরিয়ার বুকিং করুন
                  </button>
                )}`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing modal actions");
