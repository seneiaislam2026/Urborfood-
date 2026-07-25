import re

with open('src/index.css', 'r') as f:
    content = f.read()

# Replace the imports
content = re.sub(r"@import url\('https://fonts.googleapis.com/css2[^']+'\);", "", content)

new_imports = """@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700;800;900&text=০১২৩৪৫৬৭৮৯৳&display=swap');
"""

content = new_imports + content.strip()

# Update base layer
content = content.replace(
    """  * {
    font-family: "Hind Siliguri", sans-serif !important;
  }""",
    """  * {
    font-family: "Noto Sans Bengali", "Hind Siliguri", sans-serif !important;
  }"""
)

# Also update the theme variables
content = content.replace(
    '--font-sans: "Hind Siliguri", ui-sans-serif, system-ui, sans-serif;',
    '--font-sans: "Noto Sans Bengali", "Hind Siliguri", ui-sans-serif, system-ui, sans-serif;'
)
content = content.replace(
    '--font-serif: "Hind Siliguri", ui-serif, Georgia, serif;',
    '--font-serif: "Noto Sans Bengali", "Hind Siliguri", ui-serif, Georgia, serif;'
)
content = content.replace(
    '--font-mono: "Hind Siliguri", ui-monospace, SFMono-Regular, monospace;',
    '--font-mono: "Noto Sans Bengali", "Hind Siliguri", ui-monospace, SFMono-Regular, monospace;'
)

with open('src/index.css', 'w') as f:
    f.write(content)
print("Done")
