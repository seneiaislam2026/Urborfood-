import sys

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if "অ্যাডমিন শর্টকাট অ্যাকশন" in line and '<h3' in line:
        start_idx = i
        break

if start_idx != -1:
    for i in range(start_idx, len(lines)):
        if "</div>" in lines[i] and "mt-4 bg-[#f8fafc]" in lines[i+2]:
            end_idx = i
            break

if start_idx != -1 and end_idx != -1:
    replacement = """                    <h3 className="font-bold text-[15px] text-slate-800 mb-4 flex items-center gap-2">
                      <Settings size={18} className="text-slate-500" />
                      অ্যাডমিন শর্টকাট অ্যাকশন
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setIsManualOrderModalOpen(true)}
                        className="group relative flex flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-100 p-4 rounded-2xl transition-all duration-300 overflow-hidden"
                      >
                        <div className="absolute -right-4 -top-4 w-16 h-16 bg-indigo-100/50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
                        <div className="bg-indigo-100 text-indigo-600 p-2.5 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
                          <ShoppingCart size={22} />
                        </div>
                        <span className="text-[12px] font-bold text-slate-700 z-10">অর্ডার তৈরি</span>
                      </button>

                      <button 
                        onClick={openAddProductModal}
                        className="group relative flex flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-100 p-4 rounded-2xl transition-all duration-300 overflow-hidden"
                      >
                        <div className="absolute -right-4 -top-4 w-16 h-16 bg-emerald-100/50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
                        <div className="bg-emerald-100 text-emerald-600 p-2.5 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
                          <Plus size={22} />
                        </div>
                        <span className="text-[12px] font-bold text-slate-700 z-10">নতুন পণ্য যোগ</span>
                      </button>
                      
                      <button 
                        onClick={handleDownloadPDF}
                        className="group relative flex flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-rose-50 to-white border border-rose-100 hover:border-rose-300 hover:shadow-md hover:shadow-rose-100 p-4 rounded-2xl transition-all duration-300 overflow-hidden"
                      >
                        <div className="absolute -right-4 -top-4 w-16 h-16 bg-rose-100/50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
                        <div className="bg-rose-100 text-rose-600 p-2.5 rounded-xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 z-10">
                          <FileText size={22} />
                        </div>
                        <span className="text-[12px] font-bold text-slate-700 z-10">ডাউনলোড (PDF)</span>
                      </button>

                      <button 
                        onClick={handleDownloadCSV}
                        className="group relative flex flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-amber-50 to-white border border-amber-100 hover:border-amber-300 hover:shadow-md hover:shadow-amber-100 p-4 rounded-2xl transition-all duration-300 overflow-hidden"
                      >
                        <div className="absolute -right-4 -top-4 w-16 h-16 bg-amber-100/50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
                        <div className="bg-amber-100 text-amber-600 p-2.5 rounded-xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 z-10">
                          <Download size={22} />
                        </div>
                        <span className="text-[12px] font-bold text-slate-700 z-10">ডাউনলোড (Excel)</span>
                      </button>
                    </div>\n"""
    
    new_lines = lines[:start_idx] + [replacement] + lines[end_idx+1:]
    
    content = "".join(new_lines)
    if "ShoppingCart" not in content[:1000]:
        content = content.replace("import { ", "import { ShoppingCart, FileText, ")

    with open('src/pages/AdminDashboard.tsx', 'w') as f:
        f.write(content)
    print(f"Replaced from line {start_idx} to {end_idx}")
else:
    print(f"Target not found: start_idx={start_idx}, end_idx={end_idx}")

