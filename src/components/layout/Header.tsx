import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Truck, User, MapPin } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { safeGetItem, safeSetItem, safeRemoveItem } from '../../utils/storage';


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { setActiveCategory, setIsOrderTrackingOpen, setIsPriceListOpen, setIsMyOrdersOpen, logoUrl: ctxLogo, categories } = useUI();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [customerName, setCustomerName] = useState('');
  

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkAuth = () => {
      setIsAdmin(safeGetItem('urbor_admin_auth') === 'true');
      setIsCustomer(safeGetItem('urbor_customer_auth') === 'true');
      setCustomerName(safeGetItem('urbor_customer_name') || 'গ্রাহক');
      
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
    { name: '📍 শপ লোকেশন', action: () => { window.open("https://maps.app.goo.gl/eb9E5JaFmemKiPE39", "_blank"); setIsMobileMenuOpen(false); } },
    { name: 'আমাদের সম্পর্কে', action: () => setIsMobileMenuOpen(false) },
  ];

  return (
    <>
      <header className="w-full bg-white relative z-50 border-b border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
        <div className="container mx-auto px-4 lg:px-6 h-[72px] sm:h-[80px] flex items-center justify-between max-w-[1400px]">
          {/* Logo & Branding */}
          <div 
            onClick={() => { window.location.hash = ''; setActiveCategory(null); }}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#f8fafc] rounded-xl flex items-center justify-center overflow-hidden border border-slate-100 group-hover:scale-105 transition-transform shadow-xs">
              <img src={ctxLogo} alt="Urbor Food Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-[20px] sm:text-[22px] font-black text-[#f58321] leading-none tracking-tight">Urbor <span className="text-[#0b6132]">Food</span></span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-bold tracking-wider mt-0.5">শতভাগ ফ্রেশ</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link, index) => (
              <button 
                key={index}
                onClick={link.action}
                className={'px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ' + (
                  link.name === 'শপ' 
                    ? 'bg-[#0b6132] text-white shadow-sm' 
                    : 'text-slate-700 hover:text-[#0b6132] hover:bg-emerald-50/70'
                )}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5 xl:gap-4 shrink-0">
            {/* Map Icon */}
            <a 
              href="https://maps.app.goo.gl/eb9E5JaFmemKiPE39" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer flex items-center justify-center"
              title="শপ লোকেশন"
            >
              <MapPin size={22} strokeWidth={2} />
            </a>
            {/* Cart Icon (Mobile & Desktop) */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-700 hover:text-[#0b6132] hover:bg-slate-50 rounded-xl transition-all cursor-pointer flex items-center justify-center"
              title="শপিং ব্যাগ"
            >
              <ShoppingBag size={22} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#f58321] text-white text-[9px] rounded-full flex items-center justify-center font-black border-2 border-white shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Order Now Button (Desktop) */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="hidden sm:flex items-center justify-center bg-[#f58321] text-white px-5 py-2.5 rounded-xl text-xs xl:text-sm font-extrabold hover:bg-[#d86a10] hover:shadow-md active:scale-95 transition-all cursor-pointer shadow-xs tracking-wide whitespace-nowrap"
            >
              Order Now
            </button>

            {/* Login / Profile Button */}
            <button 
              onClick={() => {
                if (isAdmin) window.location.hash = '#admin';
                else if (isCustomer) {
                  if(confirm('লগআউট করতে চান?')) {
                    safeRemoveItem('urbor_customer_auth');
                    safeRemoveItem('urbor_customer_phone');
                    safeRemoveItem('urbor_customer_name');
                    window.location.hash = '';
                    window.location.reload();
                  }
                }
                else window.location.hash = '#login';
              }}
              className="hidden lg:flex items-center gap-1.5 text-slate-700 hover:text-[#0b6132] hover:bg-slate-50 border border-slate-200/80 hover:border-emerald-300 px-3 py-2 rounded-xl text-xs xl:text-sm font-bold cursor-pointer transition-all whitespace-nowrap"
            >
              <User size={18} />
              <span>{isAdmin ? 'Admin' : isCustomer ? customerName : 'লগইন'}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 text-[#0b6132] hover:text-[#f58321] cursor-pointer"
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
              <img src={ctxLogo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-[18px] font-black text-[#f58321] tracking-tight">Urbor <span className="text-[#0b6132]">Food</span></span>
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
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-[16px] font-bold text-slate-700 hover:text-[#0b6132] hover:bg-emerald-50/70 transition-colors cursor-pointer"
            >
              📦 আমার অর্ডার
            </button>
            <button
              onClick={() => { setIsPriceListOpen(true); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-[16px] font-bold text-slate-700 hover:text-[#0b6132] hover:bg-emerald-50/70 transition-colors cursor-pointer"
            >
              📋 মূল্য তালিকা
            </button>
            <button
              onClick={() => { setIsMobileMenuOpen(false); setTimeout(() => { document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-[16px] font-bold text-slate-700 hover:text-[#0b6132] hover:bg-emerald-50/70 transition-colors cursor-pointer"
            >
              ⭐ প্রোডাক্ট রিভিও
            </button>
            <button
              onClick={() => { window.open("https://maps.app.goo.gl/eb9E5JaFmemKiPE39", "_blank"); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-[16px] font-bold text-slate-700 hover:text-[#0b6132] hover:bg-emerald-50/70 transition-colors cursor-pointer"
            >
              📍 শপ লোকেশন
            </button>
            
            {/* Categories Section */}
            <div className="mt-2 mb-1 px-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">ক্যাটাগরি সমূহ</h3>
              <div className="flex flex-col gap-1 pl-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); window.location.hash = ''; setIsMobileMenuOpen(false); }}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-[15px] font-bold text-slate-600 hover:text-[#0b6132] hover:bg-emerald-50 transition-colors cursor-pointer flex items-center gap-2"
                  >
                    {cat.image && <img src={cat.image} alt="icon" className="w-5 h-5 object-cover rounded" />}
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>

        <div className="p-5 border-t border-gray-100 space-y-3 bg-[#f8fafc]">
          <button 
            onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }}
            className="w-full flex items-center justify-center bg-[#f58321] text-white hover:bg-[#d86a10] py-3.5 rounded-xl text-[15px] font-bold shadow-md hover:bg-[#08552d] transition-colors cursor-pointer"
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
              else if (isCustomer) {
                  if(confirm('লগআউট করতে চান?')) {
                    safeRemoveItem('urbor_customer_auth');
                    safeRemoveItem('urbor_customer_phone');
                    safeRemoveItem('urbor_customer_name');
                    window.location.hash = '';
                    window.location.reload();
                  }
              }
              else window.location.hash = '#login';
            }}
            className="w-full flex items-center justify-center gap-2 text-slate-500 py-2 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors cursor-pointer mt-2"
          >
            <User size={16} /> 
            {isAdmin ? 'Admin Dashboard' : isCustomer ? customerName + ' (Logout)' : 'লগইন'}
          </button>

        </div>
      </div>
    </>
  );
}
