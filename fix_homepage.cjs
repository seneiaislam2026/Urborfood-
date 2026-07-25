const fs = require('fs');
let code = fs.readFileSync('src/pages/HomePage.tsx', 'utf-8');

code = code.replace(/if \(activeCategory && activeCategory !== 'all'\) \{[\s\S]*?return true;\n  \}\);/, `if (activeCategory && activeCategory !== 'all') {
      const cat = activeCategory.toLowerCase();
      if (cat === 'honey') return product.category.includes('মধু');
      if (cat === 'pickle') return product.category.includes('আচার');
      if (cat === 'frozen') return product.category.includes('ফ্রোজেন');
      if (cat === 'dairy') return product.category.includes('দুধ') || product.category.includes('ঘি') || product.category.includes('মাখন');
      if (cat === 'oil-spice') return product.category.includes('তেল') || product.category.includes('মসলা');
      if (cat === 'grocery') return product.category.includes('চাল') || product.category.includes('ডাল') || product.category.includes('প্রয়োজনীয়');
      
      // Fallback exact match or category includes slug
      return product.category.toLowerCase().includes(cat);
    }
    return true;
  });`);
  
code = code.replace(
`{[
                      { name: 'মাছ', slug: 'fish' },
                      { name: 'মাংস', slug: 'beef' },
                      { name: 'চিকেন', slug: 'chicken' },
                      { name: 'ডিম', slug: 'egg' }
                    ].map(tag => (`,
`{[
                      { name: 'খাঁটি মধু', slug: 'honey' },
                      { name: 'মজাদার আচার', slug: 'pickle' },
                      { name: 'ফ্রোজেন ফুড', slug: 'frozen' },
                      { name: 'ঘি ও মাখন', slug: 'dairy' }
                    ].map(tag => (`
);

fs.writeFileSync('src/pages/HomePage.tsx', code);
