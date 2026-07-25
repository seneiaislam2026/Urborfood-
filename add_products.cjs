const fs = require('fs');

const newProducts = `
  {
    id: 'p9',
    name: 'খাঁটি মধু',
    originalPrice: 800,
    image: 'https://images.unsplash.com/photo-1587049352847-4d43640b3701?auto=format&fit=crop&w=800&q=80',
    category: 'নিত্য প্রয়োজনীয়',
    rating: 4.9,
    reviews: 420,
    weight: 'কেজি'
  },
  {
    id: 'p10',
    name: 'গাওয়া ঘি',
    originalPrice: 1200,
    image: 'https://images.unsplash.com/photo-1585237833075-84724ff08b02?auto=format&fit=crop&w=800&q=80',
    category: 'নিত্য প্রয়োজনীয়',
    rating: 4.8,
    reviews: 310,
    weight: 'কেজি'
  },
  {
    id: 'p11',
    name: 'লাল চাল',
    originalPrice: 110,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?auto=format&fit=crop&w=800&q=80',
    category: 'চাল ও ডাল',
    rating: 4.7,
    reviews: 150,
    weight: 'কেজি'
  },
  {
    id: 'p12',
    name: 'রসুনের আচার',
    originalPrice: 250,
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80',
    category: 'নিত্য প্রয়োজনীয়',
    rating: 4.6,
    reviews: 125,
    weight: 'জার'
  }
`;

let content = fs.readFileSync('src/data/mock.ts', 'utf8');
content = content.replace('];\n\nexport const mockReviews', newProducts + '];\n\nexport const mockReviews');
fs.writeFileSync('src/data/mock.ts', content);
