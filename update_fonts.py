import re
with open('src/index.css', 'r') as f:
    content = f.read()

content = content.replace(
    "@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');",
    "@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700;800;900&display=swap');"
)

content = content.replace(
    """  .bn-safe {
    line-height: 1.5 !important;
    overflow: visible !important;
    padding-top: 0.25em;
    padding-bottom: 0.1em;
  }""",
    """  .bn-safe {
    font-family: "Noto Sans Bengali", sans-serif !important;
    line-height: 1.5 !important;
    overflow: visible !important;
    padding-top: 0.25em;
    padding-bottom: 0.1em;
  }"""
)

with open('src/index.css', 'w') as f:
    f.write(content)
print("Done")
