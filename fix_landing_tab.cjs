const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');

const newTabContent = `          {/* TAB: LANDING PAGE */}
          {activeTab === 'landing-page' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 tracking-tight">প্রোডাক্ট ল্যান্ডিং পেইজ</h2>
                  <p className="text-sm text-slate-500 font-medium mt-1">
                    আপনার প্রতিটি পণ্যের জন্য আলাদা সিঙ্গেল ল্যান্ডিং পেইজ পরিচালনা করুন। লিংক কপি করে মার্কেটিং করুন।
                  </p>
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="পণ্য খুঁজুন..." 
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 transition-all shadow-sm" 
                  />
                  <Search size={16} className="absolute left-3.5 top-2.5 text-slate-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col group hover:shadow-md hover:border-slate-300 transition-all">
                    <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 flex gap-2">
                        {product.isFlashSale && <span className="bg-rose-500 text-white text-[10px] px-2 py-1 rounded-md font-bold shadow-sm">Flash Sale</span>}
                        <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] px-2 py-1 rounded-md font-bold shadow-sm">{product.category}</span>
                      </div>
                    </div>
                    
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-bold text-slate-800 text-base leading-tight mb-1">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="font-bold text-emerald-600">৳{product.discountedPrice || product.originalPrice}</span>
                        {product.discountedPrice && <span className="text-xs text-slate-400 line-through">৳{product.originalPrice}</span>}
                        <span className="text-xs text-slate-500 font-medium">/ {product.weight}</span>
                      </div>

                      <div className="mt-auto space-y-2.5">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(window.location.origin + '/#product=' + product.id);
                              alert('ল্যান্ডিং পেইজ লিংক কপি হয়েছে!');
                            }}
                            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-sm font-medium transition-colors"
                          >
                            <Copy size={16} className="text-slate-500" /> লিংক কপি
                          </button>
                          <a 
                            href={'/#product=' + product.id} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center justify-center p-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg transition-colors"
                            title="লাইভ দেখুন"
                          >
                            <ExternalLink size={16} />
                          </a>
                        </div>
                        <button 
                          onClick={() => setEditingProduct(product)}
                          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                        >
                          <Edit3 size={16} /> পেইজ এডিট করুন
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredProducts.length === 0 && (
                  <div className="col-span-full py-16 text-center bg-white border border-slate-200/60 rounded-xl">
                    <MonitorSmartphone size={40} className="mx-auto mb-3 text-slate-300" />
                    <p className="text-slate-500 font-medium">কোন পণ্য পাওয়া যায়নি</p>
                  </div>
                )}
              </div>
            </div>
          )}
`;

content = content.replace(
  /\{\/\* TAB: LANDING PAGE \*\/\}.*?(?=\{\/\* TAB 5: SYSTEM SETTINGS \*\/\})/s,
  newTabContent + '\n          '
);

// We need to import Copy, ExternalLink, Edit3 if they are not already imported.
if (!content.includes('ExternalLink')) {
  content = content.replace(/import \{([^}]+)\} from 'lucide-react';/, "import {$1, ExternalLink, Copy, Edit3} from 'lucide-react';");
}

fs.writeFileSync('src/pages/AdminDashboard.tsx', content);
console.log("Done");
