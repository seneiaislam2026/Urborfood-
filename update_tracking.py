import sys

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

target_tracking_btn = """                          }
                        }}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shrink-0 shadow-sm"
                      >
                        {isTrackingLoading ? 'খুঁজছে...' : 'ট্র্যাক করুন'}
                      </button>"""
replacement_tracking_btn = """                          }
                        }}
                        className="bg-slate-900 hover:bg-blue-600 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm shadow-slate-900/10 hover:shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0 active:scale-95"
                      >
                        {isTrackingLoading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> খুঁজছে...</> : <><Search size={16} /> ট্র্যাক করুন</>}
                      </button>"""
if target_tracking_btn in content:
    content = content.replace(target_tracking_btn, replacement_tracking_btn)
    print("Updated tracking button")

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)

