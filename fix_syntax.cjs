const fs = require('fs');
let code = fs.readFileSync('src/context/CartContext.tsx', 'utf-8');

const target = `    const unsubProducts = onSnapshot(doc(db, 'appData', 'products'), (docSnap) => {
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
    });        });      }    });`;

const replacement = `    const unsubProducts = onSnapshot(doc(db, 'appData', 'products'), (docSnap) => {
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
    });`;

code = code.replace(target, replacement);
fs.writeFileSync('src/context/CartContext.tsx', code);
console.log("Done fixing syntax");
