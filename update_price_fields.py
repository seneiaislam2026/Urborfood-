import sys

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

target = """              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">আসল মূল্য (৳) <span className="text-rose-500">*</span></label>
                  <input 
                    type="number" 
                    required
                    value={productFormData.originalPrice}
                    onChange={(e) => setProductFormData(p => ({ ...p, originalPrice: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 outline-none text-xs text-slate-700 font-bold" 
                    placeholder="যেমন: ৮৫০"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">অফার মূল্য (৳) <span className="text-slate-500">(ঐচ্ছিক)</span></label>
                  <input 
                    type="number"
                    value={productFormData.discountedPrice}
                    onChange={(e) => setProductFormData(p => ({ ...p, discountedPrice: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 outline-none text-xs text-slate-700 font-bold" 
                    placeholder="যেমন: ৭৯৯"
                  />
                </div>
              </div>"""

replacement = """              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">কেনার মূল্য (৳) <span className="text-slate-400">(ঐচ্ছিক)</span></label>
                  <input 
                    type="number" 
                    value={productFormData.buyingPrice}
                    onChange={(e) => setProductFormData(p => ({ ...p, buyingPrice: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 outline-none text-xs text-slate-700 font-bold bg-slate-50" 
                    placeholder="কেনার খরচ (যেমন: ৫০০)"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">আসল মূল্য (৳) <span className="text-rose-500">*</span></label>
                  <input 
                    type="number" 
                    required
                    value={productFormData.originalPrice}
                    onChange={(e) => setProductFormData(p => ({ ...p, originalPrice: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 outline-none text-xs text-slate-700 font-bold" 
                    placeholder="বিক্রির মূল্য (যেমন: ৮৫০)"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">অফার মূল্য (৳) <span className="text-slate-400">(ঐচ্ছিক)</span></label>
                  <input 
                    type="number"
                    value={productFormData.discountedPrice}
                    onChange={(e) => setProductFormData(p => ({ ...p, discountedPrice: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 outline-none text-xs text-slate-700 font-bold" 
                    placeholder="যেমন: ৭৯৯"
                  />
                </div>
              </div>"""

if target in content:
    content = content.replace(target, replacement)
    print("Updated price fields successfully")
else:
    print("Could not find target price fields")

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
