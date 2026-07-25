with open('src/index.css', 'r') as f:
    content = f.read()

content = content.replace('''  .font-noto {
    font-family: "Hind Siliguri", sans-serif !important;
  }''', '''  .font-noto {
    font-family: "Noto Sans Bengali", sans-serif !important;
  }''')

with open('src/index.css', 'w') as f:
    f.write(content)
print("Done")
