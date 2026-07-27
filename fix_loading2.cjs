const fs = require('fs');
let code = fs.readFileSync('src/context/CartContext.tsx', 'utf-8');

code = code.replace(
  /const unsubProducts = onSnapshot\(doc\(db, 'appData', 'products'\), \(docSnap\) => \{[\s\S]*?\}\);/g,
  `const unsubProducts = onSnapshot(doc(db, 'appData', 'products'), (docSnap) => {
      if (docSnap.exists()) {
        setProducts(docSnap.data().data);
        setIsLoadingProducts(false);
      } else {
        // Init mock
        import('../data/mock').then(({ mockProducts }) => {
            const initial = mockProducts.map(p => ({ ...p, stock: 20, lowStockAlert: 5 }));
            setProducts(initial);
            setDoc(doc(db, 'appData', 'products'), { data: initial });
            setIsLoadingProducts(false);
        });
      }
    });`
);

fs.writeFileSync('src/context/CartContext.tsx', code);
console.log("Done fixing loading 2");
