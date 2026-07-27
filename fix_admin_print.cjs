const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
  /const handlePrint = useReactToPrint\(\{/g,
  `const a4PrintRef = useRef<HTMLDivElement>(null);
  const handleA4Print = useReactToPrint({
    contentRef: a4PrintRef,
    documentTitle: 'Invoice',
  });
  
  const handlePrint = useReactToPrint({`
);

code = code.replace(
  /id="printable-invoice"/g,
  `id="printable-invoice" ref={a4PrintRef}`
);

code = code.replace(
  /onClick=\{\(\) => window\.print\(\)\}/g,
  `onClick={() => handleA4Print()}`
);

code = code.replace(
  /\{invoiceToPrint\.source === 'facebook' \? 'Facebook' : invoiceToPrint\.source === 'whatsapp' \? 'WhatsApp' : 'Website'\}/g,
  `{invoiceToPrint.source === 'facebook' ? 'Facebook' : invoiceToPrint.source === 'whatsapp' ? 'WhatsApp' : invoiceToPrint.source === 'shop' ? 'Shop' : 'Website'}`
);

code = code.replace(
  /\{invoiceToPrint\.source === 'website' && <Globe size=\{12\} \/>\}/g,
  `{invoiceToPrint.source === 'website' && <Globe size={12} />}
                      {invoiceToPrint.source === 'shop' && <Store size={12} />}`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing AdminDashboard print");
