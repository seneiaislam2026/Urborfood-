import re

with open('src/index.css', 'r') as f:
    content = f.read()

content = content.replace('--font-bangla-num: "Hind Siliguri", sans-serif;', '')
content = content.replace('--font-sans: "Hind Siliguri", "Noto Sans Bengali", ui-sans-serif, system-ui, sans-serif;', '--font-sans: "Noto Sans Bengali", ui-sans-serif, system-ui, sans-serif;')
content = content.replace('@import url(\'https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@300;400;500;600;700;800;900&family=Hind+Siliguri:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap\');', '@import url(\'https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@300;400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap\');')

with open('src/index.css', 'w') as f:
    f.write(content)
