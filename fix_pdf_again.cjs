const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
  /const handleA4Print = useReactToPrint\(\{/,
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
  
  const handleA4Print = useReactToPrint({`
);

// Replace button onClick
code = code.replace(
  /onClick=\{\(\) => \{\s*try \{\s*window.print\(\);\s*\} catch\(e\) \{\s*alert\("প্রিন্ট করতে সমস্যা হলে, দয়া করে অ্যাপটি নতুন ট্যাবে \(New Tab\) ওপেন করে চেষ্টা করুন\。"\);\s*\}\s*\}\}/g,
  `onClick={() => handleDownloadPdf()}`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing PDF again");
