with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace("import { Product } from;\nimport ImageLoader from \"../components/ui/ImageLoader\";\nimport { Product as _Product } from '../types';", "import { Product } from '../types';\nimport ImageLoader from '../components/ui/ImageLoader';")

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
