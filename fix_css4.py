with open('src/index.css', 'r') as f:
    content = f.read()

# Make sure all fonts imports are clean
import re
content = re.sub(
    r"@import url\('.*?'\);",
    "@import url('https://fonts.googleapis.com/css2?family=Anek+Bangla:wght@400;500;600;700;800&family=Hind+Siliguri:wght@300;400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap');",
    content,
    count=1
)

with open('src/index.css', 'w') as f:
    f.write(content)
