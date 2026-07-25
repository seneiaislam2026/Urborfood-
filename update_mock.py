import sys

with open('src/data/mock.ts', 'r') as f:
    content = f.read()

target = """    id: 'p1',
    name: 'সুন্দরবনের খাঁটি মধু (পদ্ম ফুল)',
    originalPrice: 850,
    image: 'https://images.unsplash.com/photo-1587049352847-4d43640b3701?auto=format&fit=crop&w=800&q=80',
    category: 'খাঁটি মধু',
    rating: 4.9,
    reviews: 420,
    weight: '১ কেজি',
    discountedPrice: 790
  },
  {
    id: 'p2',
    name: 'অর্গানিক সরিষার তেল',
    originalPrice: 220,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    category: 'তেল ও মসলা',
    rating: 4.8,
    reviews: 156,
    weight: '১ লিটার',
  },
  {
    id: 'p3',
    name: 'প্রিমিয়াম গাওয়া ঘি',
    originalPrice: 1250,
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
    category: 'ঘি ও মাখন',
    rating: 5.0,
    reviews: 89,
    weight: '৫০০ গ্রাম',
    discountedPrice: 1150,
    isFlashSale: true
  },"""

replacement = """    id: 'p1',
    name: 'সুন্দরবনের খাঁটি মধু (পদ্ম ফুল)',
    originalPrice: 850,
    image: 'https://images.unsplash.com/photo-1587049352847-4d43640b3701?auto=format&fit=crop&w=800&q=80',
    category: 'খাঁটি মধু',
    rating: 4.9,
    reviews: 420,
    weight: '১ কেজি',
    discountedPrice: 790,
    buyingPrice: 500
  },
  {
    id: 'p2',
    name: 'অর্গানিক সরিষার তেল',
    originalPrice: 220,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    category: 'তেল ও মসলা',
    rating: 4.8,
    reviews: 156,
    weight: '১ লিটার',
    buyingPrice: 150
  },
  {
    id: 'p3',
    name: 'প্রিমিয়াম গাওয়া ঘি',
    originalPrice: 1250,
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
    category: 'ঘি ও মাখন',
    rating: 5.0,
    reviews: 89,
    weight: '৫০০ গ্রাম',
    discountedPrice: 1150,
    buyingPrice: 800,
    isFlashSale: true
  },"""

if target in content:
    content = content.replace(target, replacement)
    print("Updated mock data successfully")
else:
    print("Could not find mock data")

with open('src/data/mock.ts', 'w') as f:
    f.write(content)
