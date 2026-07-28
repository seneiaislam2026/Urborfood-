import { Product, Category, Review } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'খাঁটি মধু', icon: 'Hexagon', slug: 'honey' },
  { id: '2', name: 'মজাদার আচার', icon: 'Jar', slug: 'pickle' },
  { id: '3', name: 'ফ্রোজেন ফুড', icon: 'Snowflake', slug: 'frozen' },
  { id: '4', name: 'ঘি ও মাখন', icon: 'Milk', slug: 'dairy' },
  { id: '5', name: 'তেল ও মসলা', icon: 'Droplet', slug: 'oil-spice' },
  { id: '6', name: 'চাল ও ডাল', icon: 'Wheat', slug: 'grocery' },
];

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'সুন্দরবনের খাঁটি মধু (পদ্ম ফুল)',
    originalPrice: 850,
    image: 'https://images.unsplash.com/photo-1587049352847-4d43640b3701?auto=format&fit=crop&w=800&q=80',
    buyingPrice: 553,
    category: 'খাঁটি মধু',
    rating: 4.9,
    reviews: 420,
    weight: '১ কেজি',
    discountedPrice: 790
  },
  {
    id: 'p2',
    name: 'কালোজিরা ফুলের মধু',
    originalPrice: 1200,
    image: 'https://images.unsplash.com/photo-1558193139-f6ba9ab3b03f?auto=format&fit=crop&w=800&q=80',
    buyingPrice: 840,
    category: 'খাঁটি মধু',
    rating: 4.8,
    reviews: 310,
    weight: '১ কেজি',
  },
  {
    id: 'p3',
    name: 'রসুনের আচার (ঝাল)',
    originalPrice: 250,
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80',
    buyingPrice: 154,
    category: 'মজাদার আচার',
    rating: 4.7,
    reviews: 156,
    weight: '৫০০ গ্রাম',
    discountedPrice: 220
  },
  {
    id: 'p4',
    name: 'আমের টক-ঝাল-মিষ্টি আচার',
    originalPrice: 300,
    image: 'https://images.unsplash.com/photo-1628268909376-e8c568018e69?auto=format&fit=crop&w=800&q=80',
    buyingPrice: 210,
    category: 'মজাদার আচার',
    rating: 4.9,
    reviews: 512,
    weight: '৫০০ গ্রাম',
  },
  {
    id: 'p5',
    name: 'ফ্রোজেন চিকেন সিঙ্গারা',
    originalPrice: 280,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    buyingPrice: 175,
    category: 'ফ্রোজেন ফুড',
    rating: 4.6,
    reviews: 89,
    weight: '২০ পিস',
    discountedPrice: 250
  },
  {
    id: 'p6',
    name: 'ফ্রোজেন চিকেন স্প্রিং রোল',
    originalPrice: 350,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    buyingPrice: 244,
    category: 'ফ্রোজেন ফুড',
    rating: 4.8,
    reviews: 112,
    weight: '১৫ পিস',
  },
  {
    id: 'p7',
    name: 'ফ্রোজেন ফ্রেঞ্চ ফ্রাই',
    originalPrice: 220,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    buyingPrice: 154,
    category: 'ফ্রোজেন ফুড',
    rating: 4.5,
    reviews: 67,
    weight: '১ কেজি',
  },
  {
    id: 'p8',
    name: 'জলপাইয়ের আচার',
    originalPrice: 260,
    image: 'https://images.unsplash.com/photo-1582223847932-a5e1cc26c429?auto=format&fit=crop&w=800&q=80',
    buyingPrice: 182,
    category: 'মজাদার আচার',
    rating: 4.7,
    reviews: 210,
    weight: '৫০০ গ্রাম',
  }
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    customerName: 'আব্দুর রহমান',
    rating: 5,
    comment: 'মধু অনেক ভালো ছিল। প্যাকেজিং এবং ডেলিভারি নিয়ে আমি পুরোপুরি সন্তুষ্ট।',
    date: '২০ ফাল্গুন, ১৪৩০'
  },
  {
    id: 'r2',
    customerName: 'ফারহানা ইসলাম',
    rating: 4,
    comment: 'আচারটা মজাদার ছিল। তবে ডেলিভারিতে একটু দেরি হয়েছে। সব মিলিয়ে ভালো সার্ভিস।',
    date: '১৫ ফাল্গুন, ১৪৩০'
  },
  {
    id: 'r3',
    customerName: 'শরীফুল হক',
    rating: 5,
    comment: 'ফ্রোজেন ফুডগুলো একদম তাজা ছিল। যেমনটা ছবিতে দেখেছি, ঠিক তেমনই। ধন্যবাদ Urbor Food!',
    date: '১০ ফাল্গুন, ১৪৩০'
  }
];
