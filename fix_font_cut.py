with open('src/index.css', 'r') as f:
    content = f.read()

content = content.replace(
    '''  .font-quantity {
    font-family: "Anek Bangla", sans-serif !important;
  }''',
    '''  .font-quantity {
    font-family: "Noto Sans Bengali", sans-serif !important;
    padding-left: 0.1em;
  }'''
)

with open('src/index.css', 'w') as f:
    f.write(content)
print("Updated font to Noto Sans Bengali")
