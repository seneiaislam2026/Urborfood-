import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Truck, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { setActiveCategory, setIsOrderTrackingOpen, setIsPriceListOpen } = useUI();
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
    { name: '📦 আমার অর্ডার', action: () => { setIsOrderTrackingOpen(true); setIsMobileMenuOpen(false); } },
    { name: '📋 মূল্য তালিকা', action: () => { setIsPriceListOpen(true); setIsMobileMenuOpen(false); } },
    { name: 'শপ', action: () => { window.location.hash = ''; setActiveCategory(null); setIsMobileMenuOpen(false); } },
    { name: 'ক্যাটাগরি', action: () => { window.location.hash = ''; setIsMobileMenuOpen(false); } },
    { name: 'আমাদের সম্পর্কে', action: () => setIsMobileMenuOpen(false) },
  ];

  return (
    <>
      <header className="w-full bg-white relative z-50 shadow-[0_2px_15px_rgba(0,0,0,0.04)] ">
        <div className="container mx-auto px-4 lg:px-6 h-[72px] sm:h-[80px] flex items-center justify-between max-w-[1400px]">
          
          {/* Logo & Brand Name */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer select-none" 
            onClick={() => window.location.hash = ''}
          >
            <img 
              src={logoUrl} 
              alt="Urbor Food Logo" 
              className="h-10 w-10 sm:h-[50px] sm:w-[50px] object-contain mix-blend-multiply" 
            />
            <div className="flex items-center text-xl sm:text-[24px] font-black tracking-tight mt-0.5 ">
              <span className="text-[#F68B1F]">Urbor</span>
              <span className="text-[#0B6B3A] ml-1.5">Food</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={link.action}
                className="text-[15px] font-bold text-slate-700 hover:text-[#0B6B3A] transition-colors cursor-pointer tracking-wide"
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
              onClick={() => setIsMobileMenuOpen(true)} 
              className="lg:hidden p-2 text-slate-700 hover:text-[#0B6B3A] transition-colors cursor-pointer flex items-center justify-center"
            >
              <Menu size={28} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden ">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-white shadow-2xl flex flex-col translate-x-0 animate-in slide-in-from-right duration-300">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={logoUrl} alt="Urbor Food Logo" className="h-9 w-9 object-contain mix-blend-multiply" />
                <div className="flex items-center text-xl font-black tracking-tight mt-0.5 ">
                  <span className="text-[#F68B1F]">Urbor</span>
                  <span className="text-[#0B6B3A] ml-1.5">Food</span>
                </div>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-slate-800 p-1.5 bg-slate-50 rounded-full transition-colors">
                <X size={22} strokeWidth={2.5} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-5 px-4">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={link.action}
                    className="w-full text-left px-4 py-3.5 rounded-xl text-[16px] font-bold text-slate-700 hover:text-[#0B6B3A] hover:bg-emerald-50/70 transition-colors cursor-pointer"
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-5 border-t border-gray-100 bg-slate-50/50 space-y-3">
              <button 
                onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center bg-[#0B6B3A] text-white py-4 rounded-xl text-[16px] font-black hover:bg-[#08552d] shadow-sm transition-all cursor-pointer"
              >
                Order Now
              </button>
              
              <button 
                onClick={() => { setIsOrderTrackingOpen(true); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 text-slate-600 py-3.5 rounded-xl text-[15px] font-bold hover:text-[#0B6B3A] hover:bg-emerald-50/70 transition-colors cursor-pointer border border-slate-200 bg-white"
              >
                <Truck size={18} strokeWidth={2} />
                <span>অর্ডার ট্র্যাক</span>
              </button>
              
              {/* Keep Auth visible in mobile drawer to not break previous app flow */}
              <div className="pt-2">
                {isAdmin ? (
                  <button 
                    onClick={() => { window.location.hash = '#admin'; setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 text-[#0B6B3A] py-3 rounded-xl text-sm font-bold bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
                  >
                    <User size={16} /> এডমিন প্যানেল
                  </button>
                ) : isCustomer ? (
                  <div className="flex items-center justify-between px-2 text-sm">
                    <span className="font-bold text-slate-600 truncate mr-2">{customerName}</span>
                    <button 
                      onClick={() => {
                        localStorage.removeItem('urbor_customer_auth');
                        localStorage.removeItem('urbor_customer_name');
                        setIsCustomer(false);
                      }}
                      className="text-rose-500 font-bold hover:underline"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => { window.location.hash = '#login'; setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-[#0B6B3A] py-2 text-sm font-bold transition-colors cursor-pointer"
                  >
                    <User size={16} /> Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
