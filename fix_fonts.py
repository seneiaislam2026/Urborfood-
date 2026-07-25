with open('src/index.css', 'r') as f:
    content = f.read()

# Make the global font Hind Siliguri again
content = content.replace(
    '''@layer base {  * {    font-family: "Noto Sans Bengali", sans-serif !important;  }''',
    '''@layer base {  * {    font-family: "Hind Siliguri", sans-serif !important;  }'''
)
content = content.replace('--font-sans: "Noto Sans Bengali"', '--font-sans: "Hind Siliguri"')
content = content.replace('--font-serif: "Noto Sans Bengali"', '--font-serif: "Hind Siliguri"')
content = content.replace('--font-mono: "Noto Sans Bengali"', '--font-mono: "Hind Siliguri"')

with open('src/index.css', 'w') as f:
    f.write(content)
print("CSS Updated")
