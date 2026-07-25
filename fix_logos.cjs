const fs = require('fs');

const files = [
  'src/components/layout/Header.tsx',
  'src/components/layout/Footer.tsx',
  'src/pages/LoginPage.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Header desktop
  content = content.replace(
    /<div className="flex items-center gap-1\.5 sm:gap-2 cursor-pointer" onClick=\{\(\) => window\.location\.hash = ''\}>\s*<img src="\/logo\.jpg" alt="Urbor Food" className="h-8 sm:h-10 w-auto rounded-lg shadow-sm" \/>\s*<\/div>/g,
    `<div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => window.location.hash = ''}>
            <img src="/logo.jpg" alt="Urbor Food Logo" className="h-8 sm:h-11 w-auto mix-blend-multiply" />
            <span className="text-xl sm:text-[26px] font-black text-[#0a4d46] tracking-tight">উর্বর ফুড</span>
          </div>`
  );

  // Header mobile
  content = content.replace(
    /<div className="flex items-center gap-2">\s*<img src="\/logo\.jpg" alt="Urbor Food" className="h-8 w-auto rounded-lg shadow-sm" \/>\s*<\/div>/g,
    `<div className="flex items-center gap-2">
                <img src="/logo.jpg" alt="Urbor Food Logo" className="h-8 w-auto mix-blend-multiply" />
                <span className="text-lg font-black text-[#0a4d46] tracking-tight">উর্বর ফুড</span>
              </div>`
  );

  // Footer
  content = content.replace(
    /<div className="flex items-center gap-1\.5 mb-4">\s*<img src="\/logo\.jpg" alt="Urbor Food" className="h-10 w-auto rounded-lg shadow-sm" \/>\s*<\/div>/g,
    `<div className="flex items-center gap-2 mb-4">
                <img src="/logo.jpg" alt="Urbor Food Logo" className="h-10 w-auto mix-blend-multiply" />
                <span className="text-[22px] font-black text-[#0a4d46] tracking-tight">উর্বর ফুড</span>
            </div>`
  );

  // Login Desktop
  content = content.replace(
    /<div className="flex items-center gap-2 mb-4">\s*<img src="\/logo\.jpg" alt="Urbor Food" className="h-12 w-auto rounded-lg shadow-sm" \/>\s*<\/div>/g,
    `<div className="flex items-center gap-3 mb-4">
                      <img src="/logo.jpg" alt="Urbor Food Logo" className="h-12 w-auto mix-blend-multiply" />
                      <span className="text-3xl font-black text-[#0a4d46] tracking-tight">উর্বর ফুড</span>
                  </div>`
  );

  // Login Mobile
  content = content.replace(
    /<div className="flex items-center gap-1\.5 mb-2">\s*<img src="\/logo\.jpg" alt="Urbor Food" className="h-10 w-auto rounded-lg shadow-sm" \/>\s*<\/div>/g,
    `<div className="flex items-center gap-2 mb-2">
                        <img src="/logo.jpg" alt="Urbor Food Logo" className="h-10 w-auto mix-blend-multiply" />
                        <span className="text-xl font-black text-[#0a4d46] tracking-tight">উর্বর ফুড</span>
                    </div>`
  );

  fs.writeFileSync(file, content);
}

// Admin
let admin = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');
admin = admin.replace(
  /<div className="flex flex-col items-center text-center mb-6">\s*<img loading="lazy"\s*src="\/logo\.jpg"\s*alt="উর্বর ফুড লোগো"\s*className="w-16 h-16 rounded-full object-cover border border-emerald-700\/20 shadow-lg mb-4 transform hover:scale-105 transition-transform duration-300"\s*referrerPolicy="no-referrer"\s*\/>\s*<h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">উর্বর ফুড<\/h2>/g,
  `<div className="flex flex-col items-center text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img loading="lazy" 
                src="/logo.jpg" 
                alt="উর্বর ফুড লোগো" 
                className="h-14 w-auto mix-blend-multiply transform hover:scale-105 transition-transform duration-300" 
                referrerPolicy="no-referrer"
              />
              <h2 className="text-2xl sm:text-3xl font-black text-[#0a4d46] tracking-tight">উর্বর ফুড</h2>
            </div>`
);

admin = admin.replace(
  /<div className="w-8 h-8 rounded-full overflow-hidden border border-emerald-600\/20 shadow-sm shrink-0 bg-white">\s*<img loading="lazy"\s*src="\/logo\.jpg"\s*alt="উর্বর ফুড"\s*className="w-full h-full object-cover"\s*referrerPolicy="no-referrer"\s*\/>\s*<\/div>/g,
  `<div className="h-8 w-auto shrink-0 bg-transparent flex items-center">
                  <img loading="lazy" 
                    src="/logo.jpg" 
                    alt="উর্বর ফুড" 
                    className="h-full w-auto mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                </div>`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', admin);

console.log('Logos replaced!');
