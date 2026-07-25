const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');

// Replace the stats array
const oldStatsArray = `[
                  { label: 'মোট বিক্রি', value: \`৳\${totalSales.toLocaleString('bn-BD')}\`, countDesc: 'টাকা', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', dotColor: 'bg-emerald-500', icon: BarChart3 },
                  { label: 'নতুন অর্ডার', value: pendingOrdersCount.toLocaleString('bn-BD'), countDesc: 'টি পেন্ডিং', iconBg: 'bg-orange-50', iconColor: 'text-orange-600', dotColor: 'bg-orange-500', icon: ShoppingBag },
                  { label: 'মোট প্রোটিন পণ্য', value: products.length.toLocaleString('bn-BD'), countDesc: 'টি লাইভ', iconBg: 'bg-blue-50', iconColor: 'text-blue-600', dotColor: 'bg-blue-500', icon: Package },
                  { label: 'মোট কাস্টমার', value: totalCustomersCount.toLocaleString('bn-BD'), countDesc: 'জন নিবন্ধিত', iconBg: 'bg-purple-50', iconColor: 'text-purple-600', dotColor: 'bg-purple-500', icon: Users },
                ]`;
const newStatsArray = `[
                  { label: 'মোট বিক্রি', value: \`৳\${totalSales.toLocaleString('bn-BD')}\`, countDesc: 'টাকা', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', dotColor: 'bg-emerald-500', glowColor: 'bg-emerald-400', icon: BarChart3 },
                  { label: 'নতুন অর্ডার', value: pendingOrdersCount.toLocaleString('bn-BD'), countDesc: 'টি পেন্ডিং', iconBg: 'bg-orange-50', iconColor: 'text-orange-600', dotColor: 'bg-orange-500', glowColor: 'bg-orange-400', icon: ShoppingBag },
                  { label: 'মোট প্রোটিন পণ্য', value: products.length.toLocaleString('bn-BD'), countDesc: 'টি লাইভ', iconBg: 'bg-blue-50', iconColor: 'text-blue-600', dotColor: 'bg-blue-500', glowColor: 'bg-blue-400', icon: Package },
                  { label: 'মোট কাস্টমার', value: totalCustomersCount.toLocaleString('bn-BD'), countDesc: 'জন নিবন্ধিত', iconBg: 'bg-purple-50', iconColor: 'text-purple-600', dotColor: 'bg-purple-500', glowColor: 'bg-purple-400', icon: Users },
                ]`;
content = content.replace(oldStatsArray, newStatsArray);

const oldOrb = "<div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${stat.iconBg} opacity-50 blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>";
const newOrb = "<div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full ${stat.glowColor} opacity-[0.15] blur-2xl group-hover:scale-150 group-hover:opacity-[0.25] transition-all duration-700`}></div>";
content = content.replace(oldOrb, newOrb);

fs.writeFileSync('src/pages/AdminDashboard.tsx', content);
console.log("Done");
