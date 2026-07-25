with open('src/components/ui/ProductCard.tsx', 'w') as f:
    f.write('''import React from 'react';
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
      className="group bg-white rounded-[24px] overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 border border-slate-100 flex flex-col h-full transform hover:-translate-y-1 p-3"
    >
      <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-slate-50 mb-4">
        <ImageLoader 
          src={product.image} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {hasDiscount && (
          <div className="absolute top-2.5 left-2.5 bg-[#f04b4b] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm leading-none z-10">
            সাশ্রয়
          </div>
        )}
        <div className="absolute top-2.5 right-2.5 bg-white text-emerald-700 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm leading-none z-10">
          ইন স্টক
        </div>
      </div>
      
      <div className="px-1 flex flex-col flex-1">
        <div className="flex items-center mb-3">
          <div className="bg-slate-100/70 px-2.5 py-1 rounded-md flex items-center gap-1.5 text-[12px]">
            <span className="font-semibold text-slate-500">{product.category}</span>
            <span className="text-slate-400 font-black text-[10px]">•</span>
            <span className="font-medium text-slate-500 font-noto bn-safe">{product.weight || '১ কেজি'}</span>
          </div>
        </div>
        
        <h3 className="text-[17px] font-black text-slate-900 leading-[1.4] mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-auto flex flex-col">
          <div className="flex items-center gap-2.5 mb-5 font-hind">
            {hasDiscount ? (
              <>
                <span className="text-[20px] font-bold text-slate-900">
                  ৳{toBanglaNumber(product.discountedPrice || 0)}
                </span>
                <span className="text-[14px] font-bold text-slate-400 line-through">
                  ৳{toBanglaNumber(product.originalPrice)}
                </span>
              </>
            ) : (
              <span className="text-[20px] font-bold text-slate-900">
                ৳{toBanglaNumber(product.originalPrice)}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between w-full gap-2 mt-auto">
            <button 
              className="flex-[0.45] py-2.5 text-slate-700 font-bold flex items-center justify-center gap-1.5 hover:bg-slate-50 rounded-xl transition-colors bg-transparent text-[13px] sm:text-[14px]"
            >
              <Eye size={18} strokeWidth={2.5} />
              <span>বিস্তারিত দেখুন</span>
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="flex-[0.55] py-2.5 rounded-xl bg-[#e8f5e9] text-emerald-700 font-bold flex items-center justify-center gap-1.5 hover:bg-[#dcfce7] transition-colors text-[13px] sm:text-[14px]"
            >
              <ShoppingCart size={18} strokeWidth={2.5} />
              <span>কার্টে যোগ করুন</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
''')
print("Card updated")
