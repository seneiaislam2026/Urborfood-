const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf-8');

code = code.replace(
  /font-family: "Hind Siliguri", sans-serif !important;/g,
  `font-family: "Noto Sans Bengali", sans-serif !important;`
);

fs.writeFileSync('src/index.css', code);
console.log("Done fixing font");
