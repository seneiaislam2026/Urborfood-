with open('src/index.css', 'r') as f:
    content = f.read()

content = content.replace(
    '''  .font-quantity {
    font-family: "Noto Sans Bengali", sans-serif !important;
    padding-left: 0.1em;
  }''',
    '''  .font-quantity {
    font-family: "Noto Sans Bengali", sans-serif !important;
    padding-left: 0.15em;
    padding-right: 0.15em;
  }'''
)

with open('src/index.css', 'w') as f:
    f.write(content)
print("Updated font padding")
