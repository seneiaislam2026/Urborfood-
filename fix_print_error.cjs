const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
    /useEffect\(\(\) => \{\s*if \(orderToPrint\) \{\s*handlePrint\(\);\s*\}\s*\}, \[orderToPrint, handlePrint\]\);/g,
    `useEffect(() => {
    if (orderToPrint) {
      // Use setTimeout to ensure the DOM has updated and ref is available
      const timer = setTimeout(() => {
        try {
          handlePrint();
        } catch (err) {
          console.error("Print failed", err);
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [orderToPrint, handlePrint]);`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing print error");
