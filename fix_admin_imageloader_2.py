import re

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

old1 = """                        <tr key={product.id} className="hover:bg-[#f8fafc]/50 transition-colors">
                          <td className="p-4 select-none">
                            <ImageLoader src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-sm" />
                          </td>"""
new1 = """                        <tr key={product.id} className="hover:bg-[#f8fafc]/50 transition-colors">
                          <td className="p-4 select-none">
                            <div className="w-12 h-12 shrink-0 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                              <ImageLoader src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                          </td>"""
content = content.replace(old1, new1)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
