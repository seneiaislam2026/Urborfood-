import { useUI } from '../context/UIContext';
import { useCart } from '../context/CartContext';
import HeroSlider from '../components/home/HeroSlider';
import Features from '../components/home/Features';
import CategoriesGrid from '../components/home/CategoriesGrid';
import BestSellers from '../components/home/BestSellers';
import FlashSale from '../components/home/FlashSale';
import PromoBanners from '../components/home/PromoBanners';
import CustomerReviews from '../components/home/CustomerReviews';
import BlogSection from '../components/home/BlogSection';
import ProductCard from '../components/ui/ProductCard';
import { ArrowLeft, Filter, ShoppingBag, ShieldCheck, CreditCard, RefreshCw, Gift } from 'lucide-react';
import { toBanglaNumber } from '../utils/banglaHelpers';

const getCategoryNameInBangla = (slug: string) => {
  switch (slug) {
    case 'fish': return 'তাজা ও পরিষ্কার মাছ';
    case 'beef': return 'হালাল ও তাজা গরুর মাংস';
    case 'chicken': return 'দেশি ও ব্রয়লার মুরগি';
    case 'egg': return 'ফার্মের ও দেশি ডিম';
    case 'dairy': return 'দুধ ও দুগ্ধজাত ডেইরি পণ্য';
    case 'frozen': return 'ফ্রোজেন প্রস্তুতকৃত খাবার';
    case 'grocery': return 'নিত্যপ্রয়োজনীয় গ্রোসারি ও চাল';
    case 'vegetables': return 'ফ্রেশ শাকসবজি ও ফলমূল';
    case 'beverage': return 'ঠান্ডা ড্রিংকস ও সফট বেভারেজ';
    case 'pet-food': return 'পোষা প্রাণীর পুষ্টিকর খাবার';
    default: return 'পছন্দের পণ্যসমূহ';
  }
};

export default function HomePage() {
  const { activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useUI();
  const { products, addToCart } = useCart();

  // Advanced Category & Search matching filter logic
  const filteredProducts = products.filter(product => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return product.name.toLowerCase().includes(q) || 
             product.category.toLowerCase().includes(q);
    }
    
    if (activeCategory && activeCategory !== 'all') {
      const cat = activeCategory.toLowerCase();
      if (cat === 'honey') return product.category.includes('মধু');
      if (cat === 'pickle') return product.category.includes('আচার');
      if (cat === 'frozen') return product.category.includes('ফ্রোজেন');
      if (cat === 'dairy') return product.category.includes('দুধ') || product.category.includes('ঘি') || product.category.includes('মাখন');
      if (cat === 'oil-spice') return product.category.includes('তেল') || product.category.includes('মসলা');
      if (cat === 'grocery') return product.category.includes('চাল') || product.category.includes('ডাল') || product.category.includes('প্রয়োজনীয়');
      
      // Fallback exact match or category includes slug
      return product.category.toLowerCase().includes(cat);
    }
    return true;
  });

  const isBrowsingCatalog = activeCategory !== null || searchQuery !== '';

  return (
    <div className="min-h-screen font-sans bg-[#f8fafc]">
      {isBrowsingCatalog ? (
        /* Catalog/Search Filter landing layout */
        <div className="container mx-auto px-4 max-w-[1400px] py-8 select-none">
          {/* Breadcrumb row */}
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 mb-6">
            <button onClick={() => { setActiveCategory(null); setSearchQuery(''); }} className="hover:text-[#0b3d18] cursor-pointer">হোম</button>
            <span>/</span>
            {searchQuery ? (
              <span className="text-[#0b3d18] font-black">অনুসন্ধান ফলাফল: "{searchQuery}"</span>
            ) : (
              <span className="text-[#0b3d18] font-black">ক্যাটাগরি: {getCategoryNameInBangla(activeCategory || '')}</span>
            )}
          </div>

          <div className="flex flex-col gap-8 items-start">
            {/* Catalog Grid results area */}
            <div className="w-full">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 pb-4 border-b border-gray-200/60">
                <div>
                  <h1 className="text-2xl font-black text-gray-900 leading-tight">
                    {searchQuery ? `"${searchQuery}" এর অনুসন্ধান ফলাফল` : getCategoryNameInBangla(activeCategory || '')}
                  </h1>
                  <p className="text-sm text-gray-500 font-bold mt-2">
                    মোট {filteredProducts.length} টি পণ্য পাওয়া গেছে
                  </p>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                /* Beautiful empty state */
                <div className="bg-white border border-gray-200 rounded-3xl p-16 text-center max-w-2xl mx-auto my-12 shadow-sm">
                  <div className="w-24 h-24 bg-red-50 border-2 border-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag size={40} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2">দুঃখিত, কোনো পণ্য পাওয়া যায়নি!</h2>
                  <p className="text-sm text-gray-500 font-bold mb-8">আপনার টাইপকৃত কীওয়ার্ডটি আবার যাচাই করুন অথবা নিচের জনপ্রিয় ক্যাটাগরিগুলো ব্রাউজ করুন।</p>
                  
                  <div className="flex flex-wrap justify-center gap-3">
                    {[
                      { name: 'খাঁটি মধু', slug: 'honey' },
                      { name: 'মজাদার আচার', slug: 'pickle' },
                      { name: 'ফ্রোজেন ফুড', slug: 'frozen' },
                      { name: 'ঘি ও মাখন', slug: 'dairy' }
                    ].map(tag => (
                      <button
                        key={tag.slug}
                        onClick={() => { setActiveCategory(tag.slug); setSearchQuery(''); }}
                        className="bg-zinc-100 hover:bg-[#f0f7f2] hover:text-[#0b3d18] text-gray-700 text-sm font-black px-6 py-3 rounded-full transition-all cursor-pointer"
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Regular Home Layout matches template */
        <div className="w-full bg-[#f8fafc]">
          <HeroSlider />
          <CategoriesGrid />
          
          {/* Best Selling Section */}
          <section className="container mx-auto px-4 max-w-7xl py-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-[22px] font-black text-[#1e293b] tracking-tight">জনপ্রিয় পণ্য</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">কাস্টমারদের সবচেয়ে পছন্দের আইটেমগুলো</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
               {products.slice(0, 8).map(product => (
                 <ProductCard key={product.id} product={product} />
               ))}
            </div>
            
            <div className="flex justify-center mt-10">
              <button className="bg-white border-2 border-emerald-500 text-emerald-600 px-8 py-3 rounded-xl text-sm font-black hover:bg-emerald-50 transition-colors cursor-pointer shadow-sm">
                সকল জনপ্রিয় পণ্য দেখুন
              </button>
            </div>
          </section>

          {/* Today's Fresh Section */}
          <section className="bg-emerald-50/50 py-16 border-y border-emerald-100/50">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="mb-10 text-center max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-3">আজকের তাজা পণ্য</h2>
                <p className="text-sm text-slate-500 font-medium">আজই খামার থেকে সংগ্রহ করা হয়েছে। দ্রুত অর্ডার করুন, স্টক সীমিত!</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {products.slice(0, 2).map((product, i) => (
                  <div key={i} className="bg-white rounded-3xl p-5 md:p-6 flex flex-col sm:flex-row gap-6 items-center border border-emerald-100/50 shadow-xl shadow-emerald-900/5 group cursor-pointer" onClick={() => window.location.hash = '#product=' + product.id}>
                    <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 bg-slate-50 rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                       <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col flex-1 w-full">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-rose-100 text-rose-600 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">হট ডিল</span>
                        <span className="text-xs font-bold text-slate-400">{product.category}</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-black text-slate-800 mb-2 leading-tight group-hover:text-emerald-600 transition-colors">{product.name}</h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4 line-clamp-2">
                        গ্রামের মহিলাদের পালা দেশি মোরগ/মুরগি হালাল ভাবে জবাই করে প্রসেস করার পরে ওজন দেয়া। ১০০% প্রাকৃতিক ও স্বাস্থ্যসম্মত।
                      </p>
                      
                      <div className="flex items-end justify-between mt-auto">
                        <div>
                          <div className="text-[11px] text-slate-400 font-bold mb-1 bn-safe ">{product.weight || 'কেজি'}</div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-emerald-600 font-hind">৳{toBanglaNumber(product.discountedPrice || product.originalPrice)}</span>
                            {product.discountedPrice && (
                              <span className="text-sm font-bold text-rose-500 line-through font-hind">৳{toBanglaNumber(product.originalPrice)}</span>
                            )}
                          </div>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className="bg-slate-900 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
                        >
                          <ShoppingBag size={16} /> 
                          <span className="hidden sm:inline">অর্ডার করুন</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
