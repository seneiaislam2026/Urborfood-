const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

// Remove isDownloadingPdf
code = code.replace(/const \[isDownloadingPdf, setIsDownloadingPdf\] = useState\(false\);\s*/, '');

// Remove handleDownloadPdf
const handlePdfRegex = /const handleDownloadPdf = async \(\) => \{[\s\S]*?\};\s*const handleA4Print/m;
code = code.replace(handlePdfRegex, 'const handleA4Print');

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done removing unused pdf");
