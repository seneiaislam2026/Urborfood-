import sys
import re

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

# Update productFormData initial state
target1 = """  const [productFormData, setProductFormData] = useState({
    name: '',
    originalPrice: '',
    discountedPrice: '',
    category: 'গরুর মাংস',
    weight: '১ কেজি',
    image: '',
    isNew: false,
    isFlashSale: false,
    description: ''
  });"""
replacement1 = """  const [productFormData, setProductFormData] = useState({
    name: '',
    originalPrice: '',
    discountedPrice: '',
    buyingPrice: '',
    category: 'গরুর মাংস',
    weight: '১ কেজি',
    image: '',
    isNew: false,
    isFlashSale: false,
    description: ''
  });"""
if target1 in content:
    content = content.replace(target1, replacement1)
    print("Updated productFormData initial state")
else:
    print("Failed to update productFormData initial state")
    
# Update openAddProductModal
target2 = """  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductFormData({
      name: '',
      originalPrice: '',
      discountedPrice: '',
      category: 'গরুর মাংস',
      weight: '১ কেজি',
      image: '',
      isNew: false,
      isFlashSale: false,
      description: ''
    });
    setIsProductModalOpen(true);
  };"""
replacement2 = """  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductFormData({
      name: '',
      originalPrice: '',
      discountedPrice: '',
      buyingPrice: '',
      category: 'গরুর মাংস',
      weight: '১ কেজি',
      image: '',
      isNew: false,
      isFlashSale: false,
      description: ''
    });
    setIsProductModalOpen(true);
  };"""
if target2 in content:
    content = content.replace(target2, replacement2)
    print("Updated openAddProductModal")

# Update payload inside handleProductSubmit
target3 = """    const payload = {
      name: productFormData.name,
      originalPrice: parseFloat(productFormData.originalPrice),
      discountedPrice: productFormData.discountedPrice ? parseFloat(productFormData.discountedPrice) : undefined,
      category: productFormData.category,
      weight: productFormData.weight,
      image: finalImage,
      isNew: productFormData.isNew,
      isFlashSale: productFormData.isFlashSale,
      description: productFormData.description
    };"""
replacement3 = """    const payload = {
      name: productFormData.name,
      originalPrice: parseFloat(productFormData.originalPrice),
      discountedPrice: productFormData.discountedPrice ? parseFloat(productFormData.discountedPrice) : undefined,
      buyingPrice: productFormData.buyingPrice ? parseFloat(productFormData.buyingPrice) : undefined,
      category: productFormData.category,
      weight: productFormData.weight,
      image: finalImage,
      isNew: productFormData.isNew,
      isFlashSale: productFormData.isFlashSale,
      description: productFormData.description
    };"""
if target3 in content:
    content = content.replace(target3, replacement3)
    print("Updated handleProductSubmit payload")

# Now update setProductFormData instances inside edit click handlers (if any)
# I'll just use regex for this if needed, or I can manually check them

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)

