const fs = require('fs');
let content = fs.readFileSync('src/data/mock.ts', 'utf8');
content = content.replace("}\n\n  {\n    id: 'p9'", "},\n  {\n    id: 'p9'");
fs.writeFileSync('src/data/mock.ts', content);
