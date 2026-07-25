const fs = require('fs');

let content = `import { ArrowRight } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export default function HeroSlider() {
  const { setActiveCategory } = useUI();
  
  return (
    <div className="container mx-auto px-4 py-4 max-w-7xl">
      <div className="h-auto lg:h-[320px]">
        {/* Main Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden group flex flex-col min-h-[220px] lg:h-full bg-[#f4f2eb]">
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" 
            alt="দেশী ফল, তাজা সবজি ও স্বাস্থ্যকর গ্রোসারি" 
            className="absolute inset-0 w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-700 opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#e3e9d8]/95 via-[#e3e9d8]/80 to-transparent"></div>
          
          <div className="relative z-10 flex flex-col justify-center p-5 sm:p-8 md:p-10 lg:p-12 h-full my-auto w-full sm:w-2/3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#115e5a] leading-[1.25] tracking-tight mb-3">
              দেশী ফল, তাজা সবজি <br /> ও স্বাস্থ্যকর গ্রোসারি
            </h1>
            <p className="text-slate-700 text-sm md:text-base font-semibold max-w-md mb-6 leading-relaxed">
              সরাসরি গ্রামের কৃষকের কাছ থেকে সংগ্রহ করে পৌঁছে দেই আপনার কাছে
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button onClick={() => setActiveCategory('all')} className="bg-[#115e5a] hover:bg-[#0b3d18] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors cursor-pointer flex items-center gap-2 shadow-lg shadow-emerald-900/20">
                অর্ডার করুন <ArrowRight size={16} />
              </button>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-700 shadow-sm">
                <span className="text-[10px] font-extrabold tracking-wide uppercase">FREE HOME DELIVERY</span>
                <span className="text-[10px] font-bold text-orange-600 bg-orange-200/50 px-1.5 py-0.5 rounded">Bosila Garden City</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`
fs.writeFileSync('src/components/home/HeroSlider.tsx', content);
