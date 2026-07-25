const fs = require('fs');

let content = fs.readFileSync('src/context/CartContext.tsx', 'utf8');
content = content.replace(
`      if (modified) {
        localStorage.setItem('mega_products', JSON.stringify(migrated));
      }
      return migrated;`,
`      // Merge new mock products if they don't exist in local storage
      const existingIds = new Set(migrated.map(p => p.id));
      let hasNew = false;
      const merged = [...migrated];
      for (const mp of mockProducts) {
        if (!existingIds.has(mp.id)) {
          hasNew = true;
          merged.push({
            ...mp,
            stock: mp.stock !== undefined ? mp.stock : Math.floor(15 + Math.random() * 35),
            lowStockAlert: mp.lowStockAlert !== undefined ? mp.lowStockAlert : 5
          });
        }
      }
      
      if (modified || hasNew) {
        localStorage.setItem('mega_products', JSON.stringify(merged));
      }
      return merged;`
);
fs.writeFileSync('src/context/CartContext.tsx', content);
