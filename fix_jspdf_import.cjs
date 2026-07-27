const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
  /import jsPDF from 'jspdf';/,
  `import { jsPDF } from 'jspdf';`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
