const fs = require('fs');
let code = fs.readFileSync('src/pages/LoginPage.tsx', 'utf-8');

code = code.replace(/import \{ motion, AnimatePresence \} from 'motion\/react';/g, '');
code = code.replace(/<motion\.div/g, '<div');
code = code.replace(/<\/motion\.div>/g, '</div>');
code = code.replace(/<AnimatePresence mode="wait">/g, '');
code = code.replace(/<\/AnimatePresence>/g, '');
code = code.replace(/initial=\{[^}]+\}/g, '');
code = code.replace(/animate=\{[^}]+\}/g, '');
code = code.replace(/transition=\{[^}]+\}/g, '');
code = code.replace(/exit=\{[^}]+\}/g, '');

fs.writeFileSync('src/pages/LoginPage.tsx', code);
console.log("Fixed login page motion issue");
