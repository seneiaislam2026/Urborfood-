import re

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

# Fix line 2004
old1 = """                              {p.image && (
                                <ImageLoader src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
                              )}"""
new1 = """                              {p.image && (
                                <div className="w-10 h-10 shrink-0 rounded-lg overflow-hidden border border-slate-200">
                                  <ImageLoader src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                </div>
                              )}"""
content = content.replace(old1, new1)

# Fix line 4261
old2 = """                                  {p.image && (
                                    <ImageLoader src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover border" />
                                  )}"""
new2 = """                                  {p.image && (
                                    <div className="w-8 h-8 shrink-0 rounded-lg overflow-hidden border border-slate-200">
                                      <ImageLoader src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                    </div>
                                  )}"""
content = content.replace(old2, new2)

# Fix line 4323
old3 = """                            {p.image && (
                              <ImageLoader src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover border border-slate-200" />
                            )}"""
new3 = """                            {p.image && (
                              <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden border border-slate-200">
                                <ImageLoader src={p.image} alt={p.name} className="w-full h-full object-cover" />
                              </div>
                            )}"""
content = content.replace(old3, new3)


with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
