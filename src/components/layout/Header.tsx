import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Truck, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { setActiveCategory, setIsOrderTrackingOpen, setIsPriceListOpen, setIsMyOrdersOpen } = useUI();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [logoUrl, setLogoUrl] = useState('/logo.jpg');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkAuth = () => {
      setIsAdmin(localStorage.getItem('urbor_admin_auth') === 'true');
      setIsCustomer(localStorage.getItem('urbor_customer_auth') === 'true');
      setCustomerName(localStorage.getItem('urbor_customer_name') || 'গ্রাহক');
      setLogoUrl(localStorage.getItem('urbor_logo_url') || '/logo.jpg');
    };
    
    checkAuth();
    window.addEventListener('hashchange', checkAuth);
    const interval = setInterval(checkAuth, 1000);
    
    return () => {
      window.removeEventListener('hashchange', checkAuth);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: '📦 আমার অর্ডার', action: () => { setIsMyOrdersOpen(true); setIsMobileMenuOpen(false); } },
    { name: '📋 মূল্য তালিকা', action: () => { setIsPriceListOpen(true); setIsMobileMenuOpen(false); } },
    { name: '⭐ প্রোডাক্ট রিভিও', action: () => { setIsMobileMenuOpen(false); setTimeout(() => { document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' }); }, 100); } },
    { name: 'শপ', action: () => { window.location.hash = ''; setActiveCategory(null); setIsMobileMenuOpen(false); } },
    { name: 'ক্যাটাগরি', action: () => { window.location.hash = ''; setIsMobileMenuOpen(false); } },
    { name: 'আমাদের সম্পর্কে', action: () => setIsMobileMenuOpen(false) },
  ];

  return (
    <>
      <header className="w-full bg-white relative z-50 shadow-[0_2px_15px_rgba(0,0,0,0.04)] ">
        <div className="container mx-auto px-4 lg:px-6 h-[72px] sm:h-[80px] flex items-center justify-between max-w-[1400px]">
          
          {/* Logo & Branding */}
          <div 
            onClick={() => { window.location.hash = ''; setActiveCategory(null); }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#f8fafc] rounded-xl flex items-center justify-center overflow-hidden border border-slate-100 group-hover:scale-105 transition-transform">
              <img src={logoUrl} alt="Urbor Food Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-[20px] sm:text-[24px] font-black text-slate-800 leading-none tracking-tight">Urbor <span className="text-[#0B6B3A]">Food</span></span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-wide">শতভাগ ফ্রেশ</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link, index) => (
              <button 
                key={index}
                onClick={link.action}
                className={`px-4 py-2 rounded-full text-[15px] font-bold transition-all cursor-pointer ${
                  link.name === 'শপ' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:text-[#0B6B3A] hover:bg-emerald-50/50'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Cart Icon (Mobile & Desktop) */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-700 hover:text-[#0B6B3A] transition-colors cursor-pointer flex items-center justify-center"
            >
              <ShoppingBag size={24} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-[18px] h-[18px] bg-[#F68B1F] text-white text-[10px] rounded-full flex items-center justify-center font-black border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Order Now Button (Desktop) */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="hidden sm:flex items-center justify-center bg-[#0B6B3A] text-white px-7 py-2.5 rounded-full text-[15px] font-bold hover:bg-[#08552d] hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer shadow-sm tracking-wide"
            >
              Order Now
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 text-slate-700 hover:text-[#0B6B3A] cursor-pointer"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={26} strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] lg:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div 
        className={`fixed inset-y-0 right-0 w-[280px] bg-white z-[110] lg:hidden shadow-2xl flex flex-col transform transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-50">
              <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-[18px] font-black text-slate-800 tracking-tight">Urbor <span className="text-[#0B6B3A]">Food</span></span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 rounded-full cursor-pointer"
          >
            <X size={22} strokeWidth={2.5} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-5 px-4">
          <nav className="flex flex-col gap-2">
            <button
              onClick={() => { setIsMyOrdersOpen(true); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-[16px] font-bold text-slate-700 hover:text-[#0B6B3A] hover:bg-emerald-50/70 transition-colors cursor-pointer"
            >
              📦 আমার অর্ডার
            </button>
            <button
              onClick={() => { setIsPriceListOpen(true); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-[16px] font-bold text-slate-700 hover:text-[#0B6B3A] hover:bg-emerald-50/70 transition-colors cursor-pointer"
            >
              📋 মূল্য তালিকা
            </button>
            <button
              onClick={() => { setIsMobileMenuOpen(false); setTimeout(() => { document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-[16px] font-bold text-slate-700 hover:text-[#0B6B3A] hover:bg-emerald-50/70 transition-colors cursor-pointer"
            >
              ⭐ প্রোডাক্ট রিভিও
            </button>
            <button
              onClick={() => { window.location.hash = ''; setActiveCategory(null); setIsMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-3.5 rounded-xl text-[16px] font-bold text-slate-700 hover:text-[#0B6B3A] hover:bg-emerald-50/70 transition-colors cursor-pointer"
            >
              শপ
            </button>
            
            {/* Categories Section */}
            <div className="mt-2 mb-1 px-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">ক্যাটাগরি সমূহ</h3>
              <div className="flex flex-col gap-1 pl-2">
                {[
                  { id: 'beef', label: '🥩 গরুর মাংস' },
                  { id: 'chicken', label: '🍗 মুরগি' },
                  { id: 'fish', label: '🐟 তাজা মাছ' },
                  { id: 'egg', label: '🥚 ডিম' },
                  { id: 'dairy', label: '🥛 ডেইরি' },
                  { id: 'frozen', label: '🧊 ফ্রোজেন খাবার' },
                  { id: 'grocery', label: '🌾 গ্রোসারি' },
                  { id: 'vegetables', label: '🥬 শাকসবজি' },
                  { id: 'beverage', label: '🥤 বেভারেজ' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); window.location.hash = ''; setIsMobileMenuOpen(false); }}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-[15px] font-bold text-slate-600 hover:text-[#0B6B3A] hover:bg-emerald-50 transition-colors cursor-pointer"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>

        <div className="p-5 border-t border-gray-100 space-y-3 bg-[#f8fafc]">
          <button 
            onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }}
            className="w-full flex items-center justify-center bg-[#0B6B3A] text-white py-3.5 rounded-xl text-[15px] font-bold shadow-md hover:bg-[#08552d] transition-colors cursor-pointer"
          >
            Order Now
          </button>
          
          <button 
            onClick={() => { setIsOrderTrackingOpen(true); setIsMobileMenuOpen(false); }}
            className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl text-[15px] font-bold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Truck size={18} /> অর্ডার ট্র্যাক
          </button>

          <button 
            onClick={() => { 
              setIsMobileMenuOpen(false); 
              if (isAdmin) window.location.hash = '#admin';
              else window.location.hash = '#login';
            }}
            className="w-full flex items-center justify-center gap-2 text-slate-500 py-2 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors cursor-pointer mt-2"
          >
            <User size={16} /> 
            {isAdmin ? 'Admin Dashboard' : isCustomer ? customerName : 'Login'}
          </button>
        </div>
      </div>
    </>
  );
}
