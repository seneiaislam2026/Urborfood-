import React, { forwardRef } from 'react';
import { Product } from '../../types';

interface ProductListPrintProps {
  products: Product[];
}

export const ProductListPrint = forwardRef<HTMLDivElement, ProductListPrintProps>(({ products }, ref) => {
  const dateStr = new Date().toLocaleDateString('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div ref={ref} className="bg-white p-8 text-black mx-auto" style={{ width: '210mm', minHeight: '297mm' }}>
      <div className="text-center mb-8 border-b-2 border-emerald-600 pb-6">
        <div className="flex justify-center mb-4">
          <img src="/logo.jpg" alt="Logo" className="w-20 h-20 object-contain" />
        </div>
        <h1 className="font-black text-3xl text-emerald-700 mb-2">উর্বর ফুড</h1>
        <h2 className="text-xl font-bold text-slate-800">পণ্য ও মূল্য তালিকা</h2>
        <p className="text-sm text-slate-500 mt-2">তারিখ: {dateStr}</p>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-emerald-50 text-emerald-800 border-y-2 border-emerald-200">
            <th className="py-3 px-4 font-bold text-sm">#</th>
            <th className="py-3 px-4 font-bold text-sm">ক্যাটাগরি</th>
            <th className="py-3 px-4 font-bold text-sm">পণ্যের নাম</th>
            <th className="py-3 px-4 font-bold text-sm text-right">ওজন/পরিমাপ</th>
            <th className="py-3 px-4 font-bold text-sm text-right">খুচরা মূল্য</th>
            <th className="py-3 px-4 font-bold text-sm text-right">অফার মূল্য</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} className="border-b border-slate-200 hover:bg-slate-50">
              <td className="py-3 px-4 text-sm font-medium text-slate-500">{index + 1}</td>
              <td className="py-3 px-4 text-sm font-bold text-slate-600">
                <span className="bg-slate-100 px-2 py-1 rounded-md text-xs">{product.category}</span>
              </td>
              <td className="py-3 px-4 text-sm font-bold text-slate-800">{product.name}</td>
              <td className="py-3 px-4 text-sm font-medium text-slate-600 text-right">{product.weight}</td>
              <td className="py-3 px-4 text-sm font-bold text-slate-800 text-right">৳{product.originalPrice.toLocaleString('bn-BD')}</td>
              <td className="py-3 px-4 text-sm font-black text-emerald-600 text-right">
                {product.discountedPrice ? `৳${product.discountedPrice.toLocaleString('bn-BD')}` : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-12 text-center text-slate-500 text-sm">
        <p>ঠিকানা: সেক্টর ৪, উত্তরা, ঢাকা | মোবাইল: +880 1795-973932</p>
        <p className="mt-1">© {new Date().getFullYear()} Urbor Food. All rights reserved.</p>
      </div>
    </div>
  );
});

ProductListPrint.displayName = 'ProductListPrint';
