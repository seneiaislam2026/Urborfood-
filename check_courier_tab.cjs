const fs = require('fs');

const content = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');
const startIndex = content.indexOf('{/* TAB: COURIER DASHBOARD (কুরিয়ার ড্যাশবোর্ড) */}');
if (startIndex !== -1) {
  const substr = content.slice(startIndex, startIndex + 5000);
  console.log(substr);
}
