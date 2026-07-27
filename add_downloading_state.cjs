const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

// Add state
code = code.replace(
  /const \[invoiceToPrint, setInvoiceToPrint\] = useState<any>\(null\);/,
  `const [invoiceToPrint, setInvoiceToPrint] = useState<any>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);`
);

// Update handleDownloadPdf
code = code.replace(
  /const handleDownloadPdf = async \(\) => \{/,
  `const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);`
);

code = code.replace(
  /element\.style\.overflow = originalOverflow;\s*\}/g,
  `element.style.overflow = originalOverflow;
      setIsDownloadingPdf(false);
    }`
);

// Update button
code = code.replace(
  /<button \s*onClick=\{handleDownloadPdf\}\s*className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-md flex items-center gap-2"\s*>/g,
  `<button 
                  onClick={handleDownloadPdf} 
                  disabled={isDownloadingPdf}
                  className={\`\${isDownloadingPdf ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-md flex items-center gap-2\`}
                >`
);

code = code.replace(
  /<Printer size=\{14\} \/> পিডিএফ ডাউনলোড \(PDF\)/g,
  `{isDownloadingPdf ? <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Printer size={14} />} 
                  {isDownloadingPdf ? 'ডাউনলোড হচ্ছে...' : 'পিডিএফ ডাউনলোড (PDF)'}`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done adding downloading state");
