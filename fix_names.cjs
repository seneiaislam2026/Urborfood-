const fs = require('fs');

const replacements = [
  { file: 'src/pages/ProductLandingPage.tsx', from: 'nirapodkhaddoshomvar.com', to: 'urborfood.com' },
  { file: 'src/pages/LoginPage.tsx', from: "normalizedUser === 'nirapodkhaddo' && password === 'Nirapodkhaddo.com@@'", to: "normalizedUser === 'urborfood' && password === 'Urborfood.com@@'" },
  { file: 'src/pages/AdminDashboard.tsx', from: "normalizedUser === 'nirapodkhaddo' && password === 'Nirapodkhaddo.com@@'", to: "normalizedUser === 'urborfood' && password === 'Urborfood.com@@'" },
  { file: 'src/pages/AdminDashboard.tsx', from: 'nirapodkhaddoshomvar@gmail.com', to: 'hello@urborfood.com' },
];

for (const rep of replacements) {
  let content = fs.readFileSync(rep.file, 'utf8');
  content = content.replace(rep.from, rep.to);
  fs.writeFileSync(rep.file, content);
}
