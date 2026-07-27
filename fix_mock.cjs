const fs = require('fs');
let code = fs.readFileSync('src/context/CartContext.tsx', 'utf-8');

code = code.replace(
  /import\("\.\.\/data\/mock"\)\.then\(\(\{ mockReviews \}\) => \{\n\s*setReviews\(mockReviews\);\n\s*setDoc\(doc\(db, "appData", "reviews"\), \{ data: mockReviews \}\);\n\s*\}\);/g,
  `setReviews(mockReviews);\n        setDoc(doc(db, "appData", "reviews"), { data: mockReviews });`
);

fs.writeFileSync('src/context/CartContext.tsx', code);
console.log("Fixed mockReviews dynamic import");
