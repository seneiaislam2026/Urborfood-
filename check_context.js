const fs = require('fs');
const lines = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8').split('\n');
let occ = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('manualProductSearch')) {
    occ.push(i);
  }
}
let prev = -1;
for (let num of occ) {
  if (num - prev < 50) continue; 
  console.log('--- Line ' + num + ' ---');
  for (let j = Math.max(0, num - 10); j <= Math.min(lines.length - 1, num); j++) {
    console.log(lines[j]);
  }
  prev = num;
}
