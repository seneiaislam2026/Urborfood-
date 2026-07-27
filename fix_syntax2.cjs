const fs = require('fs');
let code = fs.readFileSync('src/context/CartContext.tsx', 'utf-8');

const lines = code.split('\n');
// We need to delete lines 289 to 292
// Let's print out lines 285 to 295 first
console.log(lines.slice(285, 296).join('\n'));

// Remove the extra lines:
// 289:         });
// 290:       }
// 291:     });
// Or whatever it is
