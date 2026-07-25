const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');

content = content.replace(
  /https:\/\/i\.ibb\.co\/nsVSmCNP\/1783595306658\.jpg/g,
  'https://i.ibb.co/Ng7bbymC/Urbor-Food-eng-1.jpg'
);

// We should also look out for index.html or manifest.json if there are logos there.
fs.writeFileSync('src/pages/AdminDashboard.tsx', content);
console.log('Done!');
