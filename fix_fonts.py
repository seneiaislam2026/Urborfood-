import re

with open('src/index.css', 'r') as f:
    content = f.read()

# Replace import URL
content = re.sub(
    r"@import url\('https://fonts\.googleapis\.com/css2[^']+'\);",
    "@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap');",
    content
)

# Remove Noto Sans Bengali
content = content.replace('"Noto Sans Bengali", ', '')

with open('src/index.css', 'w') as f:
    f.write(content)
