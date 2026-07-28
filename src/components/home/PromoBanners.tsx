import React from 'react';

const bannerData = [
  {
    title: 'ফ্রেশ মাছের নিশ্চয়তা',
    subtitle: 'প্রতিদিনের তাজা সংগ্রহ',
    btnText: 'মাছ দেখুন',
    btnColor: 'bg-emerald-700 hover:bg-emerald-800',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
    slug: 'fish',
  },
  {
    title: 'হালাল মাংস',
    subtitle: 'বিশ্বস্ততা আমাদের অঙ্গীকার',
    btnText: 'মাংস দেখুন',
    btnColor: 'bg-red-700 hover:bg-red-800',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80',
    slug: 'beef',
  },
  {
    title: 'ফ্রোজেন ফুড',
    subtitle: 'সহজ, সুস্বাদু, সময় বাঁচায়',
    btnText: 'এখনই কিনুন',
    btnColor: 'bg-blue-700 hover:bg-blue-800 border-none',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80',
    slug: 'frozen',
  }
];

export default function PromoBanners() {
  return (
    <section className="py-6 bg-transparent select-none">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bannerData.map((b, i) => (
            <div 
              key={i} 
              className="relative rounded-3xl overflow-hidden h-44 shadow-sm border border-gray-100 flex items-center p-6 text-white group"
            >
              {/* Back Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent z-10" />
              <img loading="lazy" 
                src={b.image} 
                alt={b.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Text content */}
              <div className="relative z-20 max-w-[65%]">
                <h3 className="text-lg font-black leading-tight tracking-tight text-white mb-1">
                  {b.title}
                </h3>
                <p className="text-zinc-300 text-[11px] font-bold mb-4">{b.subtitle}</p>
                <a 
                  href={`#${b.slug}`}
                  className={`inline-block text-[11px] font-black text-white px-4 py-2 rounded-lg transition-all border border-white/20 hover:border-white shadow-xs ${b.btnColor}`}
                >
                  {b.btnText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
