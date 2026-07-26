import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from '../ui/CartDrawer';
import ProductDetailsModal from '../ui/ProductDetailsModal';
import PriceListModal from '../ui/PriceListModal';
import OrderTrackingModal from '../ui/OrderTrackingModal';
import TopBannerNotification from '../ui/TopBannerNotification';
import MyOrdersModal from '../ui/MyOrdersModal';
import { MessageCircle, Loader2 } from 'lucide-react';

// Lazy loaded pages for performance
const HomePage = lazy(() => import('../../pages/HomePage'));
const AdminDashboard = lazy(() => import('../../pages/AdminDashboard'));
const ProductLandingPage = lazy(() => import('../../pages/ProductLandingPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage'));

export default function Layout() {
  // Helper to extract product ID from hash or query parameters
  const getProductIdFromUrl = (): string | null => {
    if (typeof window === 'undefined') return null;
    
    const hash = window.location.hash;
    if (hash.startsWith('#product=')) return hash.replace('#product=', '');
    if (hash.startsWith('#product-')) return hash.replace('#product-', '');
    if (hash.startsWith('#p') && hash.length > 2 && hash !== '#pending' && hash !== '#products' && hash !== '#customers') {
      return hash.replace('#', '');
    }
    
    const searchParams = new URLSearchParams(window.location.search);
    const prodParam = searchParams.get('product') || searchParams.get('id');
    if (prodParam) return prodParam;
    
    return null;
  };

  // Simple state-based routing router for demonstration since we want 
  // both storefront and admin in one app without complex routing setup
  const [currentView, setCurrentView] = useState<'store' | 'admin' | 'landing' | 'login'>(() => {
    if (typeof window === 'undefined') return 'store';
    if (window.location.hash === '#login') return 'login';
    if (window.location.hash === '#admin') return 'admin';
    if (getProductIdFromUrl()) return 'landing';
    return 'store';
  });

  const [landingProductId, setLandingProductId] = useState<string | null>(() => getProductIdFromUrl());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // To ensure home page opens first on fresh load (dhuklei home page ashbe, login page na)
    // Removed automatic hash clearing so #login works

    const handleHashAndUrlChange = () => {
      const prodId = getProductIdFromUrl();
      if (window.location.hash === '#login') {
        setCurrentView('login');
        setLandingProductId(null);
      } else if (window.location.hash === '#admin') {
        setCurrentView('admin');
        setLandingProductId(null);
      } else if (prodId) {
        setCurrentView('landing');
        setLandingProductId(prodId);
      } else {
        setCurrentView('store');
        setLandingProductId(null);
      }
    };
    
    window.addEventListener('hashchange', handleHashAndUrlChange);
    window.addEventListener('popstate', handleHashAndUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleHashAndUrlChange);
      window.removeEventListener('popstate', handleHashAndUrlChange);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      <Helmet>
        <title>Urbor Food - শতভাগ ফ্রেশ সামুদ্রিক মাছ, দেশি খাসি, গরু, মুরগি ও দুগ্ধজাত সামগ্রী</title>
        <meta name="description" content="ক্ষতিকর কেমিক্যালমুক্ত শতভাগ ফ্রেশ সামুদ্রিক মাছ, খাসি, গরু, মুরগি, খাঁটি দুধ ও উন্নতমানের ডিম ঢাকার যেকোনো প্রান্তে ক্যাশ অন ডেলিভারিতে দ্রুত হোম ডেলিভারি। Urbor Food." />
        <meta name="keywords" content="Urbor Food, উর্বর ফুড, নিরাপদ খাদ্য, সামুদ্রিক মাছ, খাসির মাংস, গরুর মাংস, দেশি মুরগি, খাঁটি দুধ, ডিম, অনলাইন বাজার ঢাকা" />
        <link rel="canonical" href="https://www.urborfood.com/" />
        <meta property="og:title" content="Urbor Food - শতভাগ ফ্রেশ সামুদ্রিক মাছ, দেশি খাসি, গরু, মুরগি ও দুগ্ধজাত সামগ্রী" />
        <meta property="og:description" content="ক্ষতিকর কেমিক্যালমুক্ত শতভাগ ফ্রেশ সামুদ্রিক মাছ, খাসি, গরু, মুরগি, খাঁটি দুধ ও উন্নতমানের ডিম ঢাকার যেকোনো প্রান্তে ক্যাশ অন ডেলিভারিতে দ্রুত হোম ডেলিভারি।" />
        <meta property="og:url" content="https://www.urborfood.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Urbor Food - শতভাগ ফ্রেশ সামুদ্রিক মাছ, দেশি খাসি, গরু, মুরগি ও দুগ্ধজাত সামগ্রী" />
        <meta name="twitter:description" content="ক্ষতিকর কেমিক্যালমুক্ত শতভাগ ফ্রেশ সামুদ্রিক মাছ, খাসি, গরু, মুরগি, খাঁটি দুধ ও উন্নতমানের ডিম ঢাকার যেকোনো প্রান্তে ক্যাশ অন ডেলিভারিতে দ্রুত হোম ডেলিভারি।" />
      </Helmet>
      {/* Global PWA download banner & real-time order alert pop-ups */}
      <TopBannerNotification isAdminView={currentView === 'admin'} />

      {currentView === 'admin' ? (
        <>
          <Helmet>
            <title>অ্যাডমিন প্যানেল | Urbor Food</title>
            <meta name="robots" content="noindex, nofollow" />
          </Helmet>
          <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-slate-50"><Loader2 className="w-8 h-8 text-emerald-600 animate-spin" /></div>}>
            <AdminDashboard onLogout={() => { window.location.hash = ''; }} />
          </Suspense>
        </>
      ) : currentView === 'login' ? (
        <>
          <Helmet>
            <title>লগইন | Urbor Food</title>
          </Helmet>
          <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-slate-50"><Loader2 className="w-8 h-8 text-emerald-600 animate-spin" /></div>}>
            <LoginPage />
          </Suspense>
        </>
      ) : currentView === 'landing' && landingProductId ? (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-white"><Loader2 className="w-8 h-8 text-emerald-600 animate-spin" /></div>}>
          <ProductLandingPage 
            productId={landingProductId} 
            onBack={() => { window.location.hash = ''; }} 
          />
        </Suspense>
      ) : (
        <>
          <Header />
          <main className="flex-1">
            <Suspense fallback={<div className="min-h-screen w-full flex items-center justify-center bg-white"><Loader2 className="w-8 h-8 text-emerald-600 animate-spin" /></div>}>
              <HomePage />
            </Suspense>
          </main>
          <Footer />
          <CartDrawer />
          <ProductDetailsModal />
          <PriceListModal />
          <MyOrdersModal />
          <OrderTrackingModal />

          {/* Floating WhatsApp Contact Button */}
          <a 
            href="https://wa.me/8801335273946?text=আসসালামু%20আলাইকুম!%20আমি%20Urbor%20Food%20সম্পর্কে%20জানতে%20চাই।" 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_24px_rgba(37,211,102,0.5)] hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center group"
            title="হোয়াটসঅ্যাপে যোগাযোগ করুন"
          >
            <span className="max-w-0 overflow-hidden group-hover:max-w-[12rem] transition-all duration-500 ease-out font-semibold text-xs whitespace-nowrap flex leading-tight">
              হোয়াটসঅ্যাপ চ্যাট &nbsp;
            </span>
            <MessageCircle size={22} className="fill-white/10" strokeWidth={2.5} />
            {/* Pulsing indicator */}
            <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-30 pointer-events-none"></span>
          </a>
        </>
      )}
    </div>
  );
}
