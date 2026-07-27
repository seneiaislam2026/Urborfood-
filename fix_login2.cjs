const fs = require('fs');
let code = fs.readFileSync('src/pages/LoginPage.tsx', 'utf-8');

code = code.replace(/<div \s*\}\s*\}\s*\}\s*className=/g, '<div className=');

fs.writeFileSync('src/pages/LoginPage.tsx', code);
console.log("Fixed trailing braces");
