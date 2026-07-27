const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

const target = `    } catch(e) {
      alert("পিডিএফ সেভ করতে সমস্যা হয়েছে।");
    }
  };`;
  
const replacement = `    } catch(e) {
      alert("পিডিএফ সেভ করতে সমস্যা হয়েছে।");
    } finally {
      element.style.height = originalHeight;
      element.style.overflow = originalOverflow;
    }
  };`;

code = code.replace(target, replacement);
fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing PDF finally");
