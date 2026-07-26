const fs = require('fs');
const content = fs.readFileSync('src/data/mock.ts', 'utf-8');
const match = content.match(/weight: '(.*?)'/);
if (match) {
  const str = match[1];
  console.log("String:", str);
  for(let i=0; i<str.length; i++) {
    console.log(str[i], str.charCodeAt(i).toString(16));
  }
}
