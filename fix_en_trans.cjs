const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');

content = content.replace("createOrder: 'Create Order ➕'", "createOrder: 'Create Order'");
content = content.replace("inventoryControl: 'Inventory Control 📦'", "inventoryControl: 'Inventory Control'");
content = content.replace("courierDashboard: 'Courier Dashboard 🚚'", "courierDashboard: 'Courier Dashboard'");
content = content.replace("landingPage: 'Landing Page 🌐'", "landingPage: 'Landing Page'");

fs.writeFileSync('src/pages/AdminDashboard.tsx', content);
console.log("Done");
