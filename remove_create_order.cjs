const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');

// Use regex to remove the desktop create-order button block
content = content.replace(/<button \s*onClick=\{\(\) => setActiveTab\('create-order'\)\} \s*className=\{`w-full flex items-center gap-3 px-3 py-2\.5 rounded-lg text-\[13px\] transition-all text-left \$\{activeTab === 'create-order' \? [^>]+>\s*<PlusCircle[^>]+> \{t\.createOrder\}\s*<\/button>/g, '');

// Use regex to remove the mobile create-order button block
content = content.replace(/<button \s*onClick=\{\(\) => \{ setActiveTab\('create-order'\); setIsMobileMenuOpen\(false\); \}\} \s*className=\{`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-\[13px\] transition-all text-left \$\{activeTab === 'create-order' \? [^>]+>\s*<PlusCircle[^>]+> \{t\.createOrder\}\s*<\/button>/g, '');

fs.writeFileSync('src/pages/AdminDashboard.tsx', content);
console.log("Done");
