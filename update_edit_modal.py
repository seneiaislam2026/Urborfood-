import sys
import re

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

target_submit_reset = """    setProductFormData({
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

replacement_submit_reset = """    setProductFormData({
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
if target_submit_reset in content:
    content = content.replace(target_submit_reset, replacement_submit_reset)
    print("Updated submit reset")

target_edit = """  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setProductFormData({
      name: product.name,
      originalPrice: product.originalPrice.toString(),
      discountedPrice: product.discountedPrice ? product.discountedPrice.toString() : '',
      category: product.category,
      weight: product.weight,
      image: product.image,
      isNew: !!product.isNew,
      isFlashSale: !!product.isFlashSale,
      description: product.description || ''
    });
    setIsProductModalOpen(true);
  };"""

replacement_edit = """  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setProductFormData({
      name: product.name,
      originalPrice: product.originalPrice.toString(),
      discountedPrice: product.discountedPrice ? product.discountedPrice.toString() : '',
      buyingPrice: product.buyingPrice ? product.buyingPrice.toString() : '',
      category: product.category,
      weight: product.weight,
      image: product.image,
      isNew: !!product.isNew,
      isFlashSale: !!product.isFlashSale,
      description: product.description || ''
    });
    setIsProductModalOpen(true);
  };"""
if target_edit in content:
    content = content.replace(target_edit, replacement_edit)
    print("Updated openEditProductModal")

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
