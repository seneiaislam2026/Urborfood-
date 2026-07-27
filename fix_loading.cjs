const fs = require('fs');
let code = fs.readFileSync('src/context/CartContext.tsx', 'utf-8');

code = code.replace(
  /const \[isLoadingProducts, setIsLoadingProducts\] = useState\(false\);/,
  `const [isLoadingProducts, setIsLoadingProducts] = useState(true);`
);

fs.writeFileSync('src/context/CartContext.tsx', code);
console.log("Fixed isLoadingProducts");
