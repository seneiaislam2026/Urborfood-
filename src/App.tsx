import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import { CartProvider } from './context/CartContext';
import { UIProvider } from './context/UIContext';
import ErrorBoundary from './components/ErrorBoundary';
import { useEffect, useState } from 'react';
import { syncFromFirebase } from './utils/storage';

export default function App() {
  const [isSynced, setIsSynced] = useState(false);

  useEffect(() => {
    syncFromFirebase().then(() => {
      setIsSynced(true);
    });
  }, []);

  if (!isSynced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <UIProvider>
          <CartProvider>
            <Layout />
          </CartProvider>
        </UIProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
