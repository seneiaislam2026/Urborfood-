const fs = require('fs');

const files = [
  'src/components/layout/Header.tsx',
  'src/components/layout/Footer.tsx',
  'src/pages/LoginPage.tsx',
  'src/pages/AdminDashboard.tsx',
  'src/context/CartContext.tsx',
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/https:\/\/i\.ibb\.co\/Ng7bbymC\/Urbor-Food-eng-1\.jpg/g, '/logo.jpg');
  fs.writeFileSync(file, content);
}
console.log('All local logos updated');
