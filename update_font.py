with open('src/index.css', 'r') as f:
    content = f.read()

content = content.replace(
    "@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap');",
    "@import url('https://fonts.googleapis.com/css2?family=Anek+Bangla:wght@400;500;600;700;800&family=Hind+Siliguri:wght@300;400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap');"
)

if '.font-quantity' not in content:
    content = content.replace(
        '.font-noto {',
        '.font-quantity {\n    font-family: "Anek Bangla", sans-serif !important;\n  }\n  .font-noto {'
    )

with open('src/index.css', 'w') as f:
    f.write(content)
print("Updated fonts")
