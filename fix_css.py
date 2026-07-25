import re
with open('src/index.css', 'r') as f:
    content = f.read()

# Make bn-safe even safer
content = content.replace("line-height: normal !important;", "line-height: 1.5 !important;\n    overflow: visible !important;")
content = content.replace("padding-top: 0.2em;", "padding-top: 0.25em;")

with open('src/index.css', 'w') as f:
    f.write(content)
print("Done")
