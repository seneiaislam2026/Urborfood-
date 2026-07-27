const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf-8');

code = code.replace(
  /@font-face \{[\s\S]*?unicode-range: U\+09E7;\n\}/g,
  `@font-face {
  font-family: 'Bengali One';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/notosansbengali/v33/Cn-fJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mc4I3mYrtU3_I-n.woff2) format('woff2');
  unicode-range: U+09E7;
}
@font-face {
  font-family: 'Bengali One';
  font-style: normal;
  font-weight: 500;
  src: url(https://fonts.gstatic.com/s/notosansbengali/v33/Cn-fJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mc4I3mYrtU3_I-n.woff2) format('woff2');
  unicode-range: U+09E7;
}
@font-face {
  font-family: 'Bengali One';
  font-style: normal;
  font-weight: 600;
  src: url(https://fonts.gstatic.com/s/notosansbengali/v33/Cn-fJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mc4I3mYrtU3_I-n.woff2) format('woff2');
  unicode-range: U+09E7;
}
@font-face {
  font-family: 'Bengali One';
  font-style: normal;
  font-weight: 700;
  src: url(https://fonts.gstatic.com/s/notosansbengali/v33/Cn-fJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mc4I3mYrtU3_I-n.woff2) format('woff2');
  unicode-range: U+09E7;
}`
);

fs.writeFileSync('src/index.css', code);
console.log("Done fixing font weights");
