import React from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import ImageLoader from './ImageLoader';
import { ShoppingCart, Eye } from 'lucide-react';
import { toBanglaNumber } from '../../utils/banglaHelpers';

interface ProductCardProps {
  key?: string | number;
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { setSelectedProduct } = useUI();
  
  const hasDiscount = product.discountedPrice && product.discountedPrice < product.originalPrice;
    
  return (
    <div 
      onClick={() => setSelectedProduct(product)}
      className="group bg-white rounded-3xl overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 border border-slate-100 flex flex-col h-full transform hover:-translate-y-1"
    >
      <div className="relative p-2.5">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-50">
          <ImageLoader 
            src={product.image} 
            alt={product.name} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
              সাশ্রয়
            </div>
          )}
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            ইন স্টক
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
            {product.category}
          </span>
          <span className="text-[11px] font-medium text-slate-500  leading-relaxed">
            • {product.weight || '১ কেজি'}
          </span>
        </div>

        <h3 className="text-[14px] sm:text-[15px] font-bold text-slate-800 leading-[1.6] mb-3 pb-1 line-clamp-2 group-hover:text-emerald-600 transition-colors">
          {product.name}
        </h3>

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex flex-col">
            {hasDiscount ? (
              <div className="flex items-center gap-1.5">
                <span className="text-[16px] sm:text-[18px] font-black text-slate-900 ">
                  &nbsp;৳{toBanglaNumber(product.discountedPrice || 0)}
                </span>
                <span className="text-[11px] text-rose-500 line-through font-medium ">
                  &nbsp;৳{toBanglaNumber(product.originalPrice)}
                </span>
              </div>
            ) : (
              <span className="text-[16px] sm:text-[18px] font-black text-slate-900 ">
                &nbsp;৳{toBanglaNumber(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between w-full">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-10 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-colors shadow-sm"
            >
              <ShoppingCart size={16} strokeWidth={2.5} />
              <span>অর্ডার করুন</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
