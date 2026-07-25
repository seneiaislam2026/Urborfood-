const fs = require('fs');
let content = fs.readFileSync('src/context/CartContext.tsx', 'utf-8');

content = content.replace(
  "const updated = [newProduct, ...prev];\n      if (isClient) {\n        setDoc(doc(db, 'appData', 'products'), { data: updated });",
  "const current = prev || [];\n      const updated = [newProduct, ...current];\n      if (isClient) {\n        setDoc(doc(db, 'appData', 'products'), { data: JSON.parse(JSON.stringify(updated)) });"
);

content = content.replace(
  "const updated = prev.map(p => p.id === updatedProd.id ? updatedProd : p);\n      if (isClient) {\n        setDoc(doc(db, 'appData', 'products'), { data: updated });",
  "const current = prev || [];\n      const updated = current.map(p => p.id === updatedProd.id ? updatedProd : p);\n      if (isClient) {\n        setDoc(doc(db, 'appData', 'products'), { data: JSON.parse(JSON.stringify(updated)) });"
);

content = content.replace(
  "const updated = prev.filter(p => p.id !== id);\n      if (isClient) {\n        setDoc(doc(db, 'appData', 'products'), { data: updated });",
  "const current = prev || [];\n      const updated = current.filter(p => p.id !== id);\n      if (isClient) {\n        setDoc(doc(db, 'appData', 'products'), { data: JSON.parse(JSON.stringify(updated)) });"
);

fs.writeFileSync('src/context/CartContext.tsx', content);
