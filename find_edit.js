const fs = require('fs');
const content = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');
const lines = content.split('\n');

const editStateLine = lines.findIndex(l => l.includes('editingProduct'));
console.log('Found editingProduct on line:', editStateLine);

const editModalIndex = lines.findIndex(l => l.includes('setEditingProduct(') && !l.includes('button'));
console.log('setEditingProduct found at lines:');
lines.forEach((l, i) => {
  if (l.includes('setEditingProduct')) console.log(i + 1, l.trim());
  if (l.includes('editingProduct')) console.log(i + 1, l.trim());
});
