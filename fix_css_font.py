with open('src/index.css', 'r') as f:
    content = f.read()

# Make the global font Noto Sans Bengali
content = content.replace(
    '''@layer base {  * {    font-family: "Hind Siliguri", sans-serif !important;  }''',
    '''@layer base {  * {    font-family: "Noto Sans Bengali", sans-serif !important;  }'''
)
content = content.replace('--font-sans: "Hind Siliguri"', '--font-sans: "Noto Sans Bengali"')
content = content.replace('--font-serif: "Hind Siliguri"', '--font-serif: "Noto Sans Bengali"')
content = content.replace('--font-mono: "Hind Siliguri"', '--font-mono: "Noto Sans Bengali"')

with open('src/index.css', 'w') as f:
    f.write(content)
print("CSS Updated")
