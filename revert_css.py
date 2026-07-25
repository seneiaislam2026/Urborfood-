with open('src/index.css', 'r') as f:
    content = f.read()

content = content.replace("@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap');\n", "")
content = content.replace("  .font-noto {\n    font-family: \"Noto Sans Bengali\", sans-serif !important;\n  }\n", "")

with open('src/index.css', 'w') as f:
    f.write(content)
print("Done")
