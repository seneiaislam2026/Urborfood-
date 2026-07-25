with open('src/index.css', 'r') as f:
    content = f.read()

import re
content = re.sub(r'  \.font-quantity {[^}]+}\n', '', content)

with open('src/index.css', 'w') as f:
    f.write(content)
print("Done")
