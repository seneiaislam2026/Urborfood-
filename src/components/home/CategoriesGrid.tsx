import { useUI } from '../../context/UIContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';



export default function CategoriesGrid() {
  const { setActiveCategory, categories } = useUI();

  return (
    <section className="py-8 sm:py-12 select-none bg-[#f8fafc]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">জনপ্রিয় ক্যাটাগরি</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">আপনার প্রয়োজনীয় সবকিছু এক জায়গায়</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 cursor-pointer transition-colors shadow-sm">
              <ChevronLeft size={20} />
            </button>
            <button className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center text-white cursor-pointer transition-colors shadow-md shadow-emerald-500/30">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
          {categories.map((cat, i) => (
            <button 
              key={i} 
              onClick={() => setActiveCategory(cat.id)}
              className="flex-shrink-0 flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:border-emerald-500 hover:shadow-md cursor-pointer transition-all duration-300 group w-[180px] sm:w-[220px] text-left"
            >
              <div className={`w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-xl overflow-hidden shrink-0`}>
                 <img loading="lazy"
                    src={cat.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200'}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                 />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[14px] sm:text-[16px] font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{cat.name}</h3>
                <span className="text-[11px] sm:text-[12px] font-medium text-slate-500 mt-0.5">অন্বেষণ করুন &rarr;</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
