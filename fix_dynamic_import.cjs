const fs = require('fs');
let code = fs.readFileSync('src/context/CartContext.tsx', 'utf-8');

code = code.replace(
  /\/\/ Init mock\n\s*import\('\.\.\/data\/mock'\)\.then\(\(\{ mockProducts \}\) => \{\n\s*const initial = mockProducts\.map\(p => \(\{ \.\.\.p, stock: 20, lowStockAlert: 5 \}\)\);\n\s*setProducts\(initial\);\n\s*setDoc\(doc\(db, 'appData', 'products'\), \{ data: initial \}\);\n\s*setIsLoadingProducts\(false\);\n\s*\}\);/g,
  `// Init mock
        const initial = mockProducts.map(p => ({ ...p, stock: 20, lowStockAlert: 5 }));
        setProducts(initial);
        setDoc(doc(db, 'appData', 'products'), { data: initial });
        setIsLoadingProducts(false);`
);

fs.writeFileSync('src/context/CartContext.tsx', code);
console.log("Fixed dynamic import in CartContext");
