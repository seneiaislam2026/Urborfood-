const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

const target = `<button 
                  onClick={() => handleA4Print()} 
                  disabled={isDownloadingPdf}
                  className={\`\${isDownloadingPdf ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-md flex items-center gap-2\`}
                >
                  {isDownloadingPdf ? <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Printer size={14} />} 
                  {isDownloadingPdf ? 'ডাউনলোড হচ্ছে...' : 'পিডিএফ ডাউনলোড (PDF)'}
                </button>`;
                
const replacement = `<button 
                  onClick={() => handleA4Print()} 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-md flex items-center gap-2"
                >
                  <Printer size={14} /> প্রিন্ট / সেভ পিডিএফ
                </button>`;

code = code.replace(target, replacement);
fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing button exactly");
