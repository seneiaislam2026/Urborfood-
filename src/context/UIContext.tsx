import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';

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
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPriceListOpen, setIsPriceListOpen] = useState<boolean>(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState<boolean>(false);
  const [isMyOrdersOpen, setIsMyOrdersOpen] = useState<boolean>(false);
  const [heroBannerUrl, setHeroBannerUrl] = useState<string>(localStorage.getItem('urbor_hero_banner') || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200');
  
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
      setIsMyOrdersOpen
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

