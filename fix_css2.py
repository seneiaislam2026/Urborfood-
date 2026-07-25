with open('src/index.css', 'r') as f:
    content = f.read()

import re
content = re.sub(r'font-family:\s*"Hind Siliguri",\s*sans-serif\s*!important;', 'font-family: "Noto Sans Bengali", sans-serif !important;', content, count=1)

with open('src/index.css', 'w') as f:
    f.write(content)
print("Done")
