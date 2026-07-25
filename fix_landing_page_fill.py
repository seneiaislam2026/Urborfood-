import re
with open('src/pages/ProductLandingPage.tsx', 'r') as f:
    content = f.read()

content = content.replace('const { products, addToCart, placeOrder, clearCart } = useCart();', 'const { products, addToCart, placeOrder, clearCart, orders } = useCart();')

# We need to auto-fill when `phone` changes
auto_fill_effect = """
  // Auto-fill existing customer details if phone matches
  useEffect(() => {
    if (phone.length >= 11) {
      const existingOrder = orders.find(o => o.phone === phone);
      if (existingOrder) {
        if (!customerName) setCustomerName(existingOrder.customerName);
        if (!address) setAddress(existingOrder.address);
      }
    }
  }, [phone, orders]);
"""

content = content.replace("  useEffect(() => {\n    window.scrollTo(0, 0);\n  }, [selectedProduct]);", auto_fill_effect + "\n  useEffect(() => {\n    window.scrollTo(0, 0);\n  }, [selectedProduct]);")

with open('src/pages/ProductLandingPage.tsx', 'w') as f:
    f.write(content)
print("Done")
