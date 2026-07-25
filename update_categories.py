import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "'ফ্রোজেন ফুড'",
    "'ফ্রোজেন ফুড',\n    'মধু',\n    'অন্যান্য'"
)

content = content.replace(
    """<select 
                    value={productFormData.category}
                    onChange={(e) => setProductFormData(p => ({ ...p, category: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-xs text-slate-700 font-bold cursor-pointer"
                  >
                    {categoriesList.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>""",
    """<input 
                    list="category-options"
                    value={productFormData.category}
                    onChange={(e) => setProductFormData(p => ({ ...p, category: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500/20 outline-none text-xs text-slate-700 font-bold"
                    placeholder="ক্যাটাগরি নির্বাচন করুন বা লিখুন"
                  />
                  <datalist id="category-options">
                    {categoriesList.map(cat => <option key={cat} value={cat} />)}
                  </datalist>"""
)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
