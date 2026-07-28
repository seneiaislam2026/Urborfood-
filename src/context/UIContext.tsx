import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';
import { safeGetItem, safeSetItem, safeRemoveItem } from '../utils/storage';


interface UIContextType {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isPriceListOpen: boolean;
  setIsPriceListOpen: (open: boolean) => void;
  isOrderTrackingOpen: boolean;
  setIsOrderTrackingOpen: (open: boolean) => void;
  isMyOrdersOpen: boolean;
  setIsMyOrdersOpen: (open: boolean) => void;
  heroBannerUrl: string;
  setHeroBannerUrl: (url: string) => void;
  logoUrl: string;
  setLogoUrl: (url: string) => void;
  categories: {id: string, name: string, image?: string}[];
  setCategories: (cats: {id: string, name: string, image?: string}[]) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPriceListOpen, setIsPriceListOpen] = useState<boolean>(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState<boolean>(false);
  const [isMyOrdersOpen, setIsMyOrdersOpen] = useState<boolean>(false);
  const [heroBannerUrl, setHeroBannerUrl] = useState<string>(safeGetItem('urbor_hero_banner') || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200');
  const [logoUrl, setLogoUrl] = useState<string>(safeGetItem('urbor_logo_url') || '/logo.svg');
  const [categories, setCategories] = useState<{id: string, name: string, image?: string}[]>(() => {
    const saved = safeGetItem('urbor_custom_categories');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'beef', name: '🥩 গরুর মাংস', image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?auto=format&fit=crop&q=80&w=200' },
      { id: 'chicken', name: '🍗 মুরগি', image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=200' },
      { id: 'fish', name: '🐟 তাজা মাছ', image: 'https://images.unsplash.com/photo-1534948216015-843149f72be3?auto=format&fit=crop&q=80&w=200' },
      { id: 'honey', name: '🍯 খাঁটি মধু', image: 'https://images.unsplash.com/photo-1587049352847-4d43640b3701?auto=format&fit=crop&q=80&w=200' },
      { id: 'pickle', name: '🥭 মজাদার আচার', image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&q=80&w=200' },
      { id: 'dairy', name: '🥛 ডেইরি ও মাখন', image: 'https://images.unsplash.com/photo-1585237833075-84724ff08b02?auto=format&fit=crop&q=80&w=200' }
    ];
  });
  
  return (
    <UIContext.Provider value={{ 
      selectedProduct, 
      setSelectedProduct, 
      activeCategory, 
      setActiveCategory,
      searchQuery,
      setSearchQuery,
      isPriceListOpen,
      setIsPriceListOpen,
      isOrderTrackingOpen,
      setIsOrderTrackingOpen,
      heroBannerUrl,
      setHeroBannerUrl,
      isMyOrdersOpen,
      setIsMyOrdersOpen,
      logoUrl,
      setLogoUrl,
      categories,
      setCategories
    }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}

