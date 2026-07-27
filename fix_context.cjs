const fs = require('fs');
let code = fs.readFileSync('src/context/CartContext.tsx', 'utf-8');

code = code.replace(
  /const \[products, setProducts\] = useState<Product\[\]>\(\[\]\);/g,
  `const [products, setProducts] = useState<Product[]>(mockProducts.map(p => ({ ...p, stock: 20, lowStockAlert: 5 })));`
);

code = code.replace(
  /const \[isLoadingProducts, setIsLoadingProducts\] = useState\(true\);/g,
  `const [isLoadingProducts, setIsLoadingProducts] = useState(false);` // since we start with mock products
);

fs.writeFileSync('src/context/CartContext.tsx', code);
console.log("Context fixed to avoid loading");
