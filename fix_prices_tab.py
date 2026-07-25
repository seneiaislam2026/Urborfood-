import sys

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

target = """                              onClick={() => {
                                setProductFormData({
                                  id: p.id,
                                  name: p.name,
                                  category: p.category,
                                  originalPrice: p.originalPrice.toString(),
                                  discountedPrice: p.discountedPrice ? p.discountedPrice.toString() : '',
                                  buyingPrice: p.buyingPrice ? p.buyingPrice.toString() : '',
                                  weight: p.weight,
                                  image: p.image,
                                  description: p.description || '',
                                  stock: p.stock?.toString() || '',
                                  lowStockAlert: p.lowStockAlert?.toString() || '5'
                                });
                                setIsProductModalOpen(true);
                              }}"""
replacement = """                              onClick={() => openEditProductModal(p)}"""
content = content.replace(target, replacement)

target2 = """                          onClick={() => {
                            setProductFormData({
                              id: p.id,
                              name: p.name,
                              category: p.category,
                              originalPrice: p.originalPrice.toString(),
                              discountedPrice: p.discountedPrice ? p.discountedPrice.toString() : '',
                              buyingPrice: p.buyingPrice ? p.buyingPrice.toString() : '',
                              weight: p.weight,
                              image: p.image,
                              description: p.description || '',
                              stock: p.stock?.toString() || '',
                              lowStockAlert: p.lowStockAlert?.toString() || '5'
                            });
                            setIsProductModalOpen(true);
                          }}"""
replacement2 = """                          onClick={() => openEditProductModal(p)}"""
content = content.replace(target2, replacement2)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Fixed prices tab button onClick")
