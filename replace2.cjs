const fs = require('fs');

const replacements = [
  { file: 'src/pages/AdminDashboard.tsx', from: 'Nirapod_Khaddo_Orders_', to: 'Urbor_Food_Orders_' },
  { file: 'src/pages/AdminDashboard.tsx', from: 'Nirapod_Khaddo_Shomvar_Orders_Report', to: 'Urbor_Food_Orders_Report' },
  { file: 'src/pages/AdminDashboard.tsx', from: 'Nirapod_Khaddo_Orders_Report_', to: 'Urbor_Food_Orders_Report_' },
  { file: 'src/components/ui/PriceListModal.tsx', from: 'Nirapod_Khaddo_Shomvar_Price_List_', to: 'Urbor_Food_Price_List_' },
];

for (const rep of replacements) {
  let content = fs.readFileSync(rep.file, 'utf8');
  content = content.replace(new RegExp(rep.from, 'g'), rep.to);
  fs.writeFileSync(rep.file, content);
}
