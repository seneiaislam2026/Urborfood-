const fs = require('fs');
let code = fs.readFileSync('src/context/CartContext.tsx', 'utf-8');

code = code.replace(
  /import \{ mockProducts \} from '\.\.\/data\/mock';/,
  `import { mockProducts, mockReviews } from '../data/mock';`
);

fs.writeFileSync('src/context/CartContext.tsx', code);
console.log("Fixed mockReviews import");
