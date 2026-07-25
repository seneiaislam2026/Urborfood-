import sys

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

target = """  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductFormData({
      name: '',
      originalPrice: '',
      discountedPrice: '',
      category: 'গরুর মাংস',
      weight: '১ কেজি',
      image: '',
      isNew: true,
      isFlashSale: false,
      description: ''
    });
    setIsProductModalOpen(true);
  };"""

replacement = """  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductFormData({
      name: '',
      originalPrice: '',
      discountedPrice: '',
      buyingPrice: '',
      category: 'গরুর মাংস',
      weight: '১ কেজি',
      image: '',
      isNew: true,
      isFlashSale: false,
      description: ''
    });
    setIsProductModalOpen(true);
  };"""

if target in content:
    content = content.replace(target, replacement)
    print("Updated openAddProductModal")
else:
    print("Could not find openAddProductModal")

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
