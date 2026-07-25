import React from 'react';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../ui/ProductCard';

const bestSellerProducts = [
  {
    id: 'bs-1',
    name: 'কই মাছ (প্রতি কেজি)',
    originalPrice: 360,
    discountedPrice: 320,
    discountLabel: '10% ছাড়',
    weight: '১ কেজি',
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=400&q=80',
    category: 'মাছ',
    rating: 4.8,
    reviews: 140,
  },
  {
    id: 'bs-2',
    name: 'চিকেন ব্রেস্ট (প্রতি কেজি)',
    originalPrice: 480,
    discountedPrice: 420,
    discountLabel: '12% ছাড়',
    weight: '১ কেজি',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=400&q=80',
    category: 'মুরগি',
    rating: 4.9,
    reviews: 210,
  },
  {
    id: 'bs-3',
    name: 'গরুর লাল মাংস (প্রতি কেজি)',
    originalPrice: 800,
    discountedPrice: 680,
    discountLabel: '15% ছাড়',
    weight: '১ কেজি',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80',
    category: 'মাংস',
    rating: 4.7,
    reviews: 88,
  },
  {
    id: 'bs-4',
    name: 'দেশি ডিম (হাফ ডজন)',
    originalPrice: 78,
    discountedPrice: 70,
    discountLabel: '10% ছাড়',
    weight: '৬ পিস',
    image: 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=400&q=80',
    category: 'ডিম',
    rating: 4.9,
    reviews: 350,
  },
  {
    id: 'bs-5',
    name: 'সালমন ফিলেট (প্রতি কেজি)',
    originalPrice: 1030,
    discountedPrice: 950,
    discountLabel: '8% ছাড়',
    weight: '১ কেজি',
    image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=400&q=80',
    category: 'মাছ',
    rating: 4.8,
    reviews: 175,
  }
];

export default function BestSellers() {
  return (
    <section className="py-6 bg-transparent select-none pb-12 border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-200/60">
          <h2 className="text-2xl font-black text-gray-900 leading-tight">সেরা সেলার</h2>
          <button onClick={() => window.scrollTo(0,0)} className="flex items-center gap-2 text-sm font-bold text-[#0b3d18] hover:text-[#072a10] hover:underline cursor-pointer">
            সব পণ্য দেখুন <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {bestSellerProducts.map(product => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      </div>
    </section>
  );
}
