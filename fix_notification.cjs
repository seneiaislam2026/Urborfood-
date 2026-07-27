const fs = require('fs');
let code = fs.readFileSync('src/context/CartContext.tsx', 'utf-8');

code = code.replace(
    /useEffect\(\(\) => \{\s*if \(isClient\) \{\s*setDoc\(doc\(db, 'appData', 'notifications'\), \{ data: notifications \}\);\s*\}\s*\}, \[notifications\]\);/g,
    `useEffect(() => {
    if (isClient) {
      // Use setTimeout to run this outside the pure render/update phase and stringify to remove undefined
      setTimeout(() => {
        setDoc(doc(db, 'appData', 'notifications'), { data: JSON.parse(JSON.stringify(notifications)) }).catch(console.error);
      }, 0);
    }
  }, [notifications]);`
);

fs.writeFileSync('src/context/CartContext.tsx', code);
console.log("Done fixing notification save");
