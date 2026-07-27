const fs = require('fs');
let code = fs.readFileSync('src/components/layout/Layout.tsx', 'utf-8');

code = code.replace(
  /\/\/ Lazy loaded pages for performance\nimport HomePage from '\.\.\/\.\.\/pages\/HomePage';\nconst AdminDashboard = lazy\(\(\) => import\('\.\.\/\.\.\/pages\/AdminDashboard'\)\);\nimport ProductLandingPage from '\.\.\/\.\.\/pages\/ProductLandingPage';\nconst LoginPage = lazy\(\(\) => import\('\.\.\/\.\.\/pages\/LoginPage'\)\);/g,
  `import HomePage from '../../pages/HomePage';
import ProductLandingPage from '../../pages/ProductLandingPage';
// Lazy loaded pages for performance
const AdminDashboard = lazy(() => import('../../pages/AdminDashboard'));
const LoginPage = lazy(() => import('../../pages/LoginPage'));`
);

fs.writeFileSync('src/components/layout/Layout.tsx', code);
console.log("Fixed Layout imports");
