import re

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

old_cards = """                  return (
                    <div key={i} className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 group relative overflow-hidden flex flex-col justify-center gap-3">
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${colors.bg} opacity-60 group-hover:opacity-100 transition-opacity`} />
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colors.lightBg} ${colors.text} group-hover:scale-110 transition-transform duration-300 border ${colors.border} shadow-sm`}>
                          <stat.icon size={20} strokeWidth={2.5} />
                        </div>
                        <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-bold w-max ${colors.lightBg} ${colors.text} border ${colors.border}`}>
                          {stat.countDesc}
                        </span>
                      </div>
                      
                      <div className="mt-1">
                        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mb-0.5">{stat.value}</h3>
                        <p className="text-[11px] sm:text-xs font-semibold text-slate-500">{stat.label}</p>
                      </div>
                    </div>
                  )"""

new_cards = """                  return (
                    <div key={i} className="bg-white rounded-[16px] p-4 sm:p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all duration-300 flex items-center justify-between group">
                      <div className="flex flex-col">
                        <p className="text-[12px] sm:text-[13px] font-semibold text-slate-500 mb-1">{stat.label}</p>
                        <h3 className="text-[20px] sm:text-[24px] font-black text-slate-800 tracking-tight leading-none mb-2">{stat.value}</h3>
                        <span className={`inline-block px-2 py-0.5 rounded w-max text-[10px] font-bold ${colors.lightBg} ${colors.text}`}>
                          {stat.countDesc}
                        </span>
                      </div>
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shrink-0 ${colors.lightBg} ${colors.text} group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon size={24} strokeWidth={2} />
                      </div>
                    </div>
                  )"""

content = content.replace(old_cards, new_cards)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
