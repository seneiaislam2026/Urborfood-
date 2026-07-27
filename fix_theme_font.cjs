const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf-8');

code = code.replace(
  /--font-sans: "Hind Siliguri"/g,
  `--font-sans: "Noto Sans Bengali"`
);

code = code.replace(
  /--font-serif: "Hind Siliguri"/g,
  `--font-serif: "Noto Sans Bengali"`
);

code = code.replace(
  /--font-mono: "Hind Siliguri"/g,
  `--font-mono: "Noto Sans Bengali"`
);

code = code.replace(
  /\.font-hind \{[\s\S]*?\}/g,
  `.font-hind {\n    font-family: "Noto Sans Bengali", sans-serif !important;\n  }`
);

fs.writeFileSync('src/index.css', code);
console.log("Done fixing theme font");
