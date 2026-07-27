const fs = require('fs');
let code = fs.readFileSync('src/context/CartContext.tsx', 'utf-8');

// Fix updateProduct
code = code.replace(
    /const updateProduct = \(updatedProd: Product\) => \{\s*setProducts\(prev => \{\s*const current = prev \|\| \[\];\s*const updated = current\.map\(p => p\.id === updatedProd\.id \? updatedProd : p\);\s*if \(isClient\) \{\s*setDoc\(doc\(db, 'appData', 'products'\), \{ data: JSON\.parse\(JSON\.stringify\(updated\)\) \}\);\s*\}\s*return updated;\s*\}\);\s*\};/,
    `const updateProduct = (updatedProd: Product) => {
    setProducts(prev => {
      const current = prev || [];
      const updated = current.map(p => p.id === updatedProd.id ? updatedProd : p);
      
      // Safe async side-effect outside the pure updater phase
      if (isClient) {
        setTimeout(() => {
          setDoc(doc(db, 'appData', 'products'), { data: JSON.parse(JSON.stringify(updated)) }).catch(console.error);
        }, 0);
      }
      return updated;
    });
  };`
);

// Fix addSimulatedOrder
code = code.replace(
    /const addSimulatedOrder = \(simulatedOrder: Order\) => \{\s*setOrders\(prev => \{\s*const updated = \[simulatedOrder, \.\.\.prev\];\s*if \(isClient\) \{\s*setDoc\(doc\(db, 'appData', 'orders'\), \{ data: JSON\.parse\(JSON\.stringify\(updated\)\) \}\);\s*\}\s*return updated;\s*\}\);\s*triggerOrderNotification\(simulatedOrder\);\s*\};/,
    `const addSimulatedOrder = (simulatedOrder: Order) => {
    setOrders(prev => {
      const updated = [simulatedOrder, ...prev];
      if (isClient) {
        setTimeout(() => {
          setDoc(doc(db, 'appData', 'orders'), { data: JSON.parse(JSON.stringify(updated)) }).catch(console.error);
        }, 0);
      }
      return updated;
    });
    triggerOrderNotification(simulatedOrder);
  };`
);

fs.writeFileSync('src/context/CartContext.tsx', code);
console.log("Done fixing side-effects in state updaters");
