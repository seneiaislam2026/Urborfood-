const fs = require('fs');
let content = fs.readFileSync('src/context/CartContext.tsx', 'utf-8');

content = content.replace(
  /setDoc\(doc\(db, 'appData', 'orders'\), \{ data: updated \}\);/g,
  "setDoc(doc(db, 'appData', 'orders'), { data: JSON.parse(JSON.stringify(updated)) });"
);

fs.writeFileSync('src/context/CartContext.tsx', content);
