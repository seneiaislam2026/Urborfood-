const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

// Add imports
code = code.replace(
  /import \{ useReactToPrint \} from 'react-to-print';/,
  `import { useReactToPrint } from 'react-to-print';\nimport html2canvas from 'html2canvas';\nimport jsPDF from 'jspdf';`
);

// Add the download function inside AdminDashboard component
code = code.replace(
  /const triggerPrint = \(\) => \{/,
  `const handleDownloadPdf = async () => {
    const element = document.getElementById('printable-invoice');
    if (!element) return;
    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(\`Invoice_\${invoiceToPrint?.id}.pdf\`);
    } catch(e) {
      alert("পিডিএফ সেভ করতে সমস্যা হয়েছে।");
    }
  };
  
  const triggerPrint = () => {`
);

// Replace button onClick with PDF function
code = code.replace(
  /onClick=\{\(\) => \{\s*try \{\s*window.print\(\);\s*\} catch\(e\) \{\s*alert\("প্রিন্ট করতে সমস্যা হলে, দয়া করে অ্যাপটি নতুন ট্যাবে \(New Tab\) ওপেন করে চেষ্টা করুন\。"\);\s*\}\s*\}\}/g,
  `onClick={() => handleDownloadPdf()}`
);

// Replace button text
code = code.replace(
  /<Printer size=\{14\} \/> প্রিন্ট \/ সেভ পিডিএফ/g,
  `<Printer size={14} /> পিডিএফ ডাউনলোড (PDF)`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done adding PDF logic");
