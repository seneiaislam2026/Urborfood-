const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf-8');

code = code.replace(
  /@import url\('https:\/\/fonts.googleapis.com\/css2\?family=Anek\+Bangla:wght@400;500;600;700;800&family=Hind\+Siliguri:wght@300;400;500;600;700&family=Noto\+Sans\+Bengali:wght@400;500;600;700&display=swap'\);/g,
  `@import url('https://fonts.googleapis.com/css2?family=Anek+Bangla:wght@400;500;600;700;800&family=Hind+Siliguri:wght@300;400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap');

@font-face {
  font-family: 'Bengali One';
  font-style: normal;
  font-weight: 400 800;
  src: url(https://fonts.gstatic.com/s/notosansbengali/v33/Cn-fJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mc4I3mYrtU3_I-n.woff2) format('woff2');
  unicode-range: U+09E7;
}`
);

// We also need to change body and * font-family back to include Bengali One then Hind Siliguri
code = code.replace(
  /font-family: "Hind Siliguri", sans-serif !important;/g,
  `font-family: "Bengali One", "Hind Siliguri", sans-serif !important;`
);

fs.writeFileSync('src/index.css', code);
console.log("Done");
