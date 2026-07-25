import re
with open('src/context/CartContext.tsx', 'r') as f:
    content = f.read()

# Replace getStoredProducts and getStoredOrders with simple initializers, we will fetch from Firebase.
content = re.sub(r'const getStoredProducts = \(\): Product\[\] => \{.*?\};', '', content, flags=re.DOTALL)
content = re.sub(r'const getStoredOrders = \(\): Order\[\] => \{.*?\};', '', content, flags=re.DOTALL)

content = content.replace("const [products, setProducts] = useState<Product[]>(getStoredProducts);", "const [products, setProducts] = useState<Product[]>([]);")
content = content.replace("const [orders, setOrders] = useState<Order[]>(getStoredOrders);", "const [orders, setOrders] = useState<Order[]>([]);")
content = content.replace("const [notifications, setNotifications] = useState<AppNotification[]>(() => {", "const [notifications, setNotifications] = useState<AppNotification[]>([]); /* ")
content = content.replace("  });\n\n  const [soundEnabled", " */\n  const [soundEnabled")

# We need to insert the Firebase sync effect.
sync_effect = """
  useEffect(() => {
    if (!isClient) return;
    const unsubProducts = onSnapshot(doc(db, 'appData', 'products'), (docSnap) => {
      if (docSnap.exists()) {
        setProducts(docSnap.data().data);
      } else {
        // Init mock
        import('../data/mock').then(({ mockProducts }) => {
            const initial = mockProducts.map(p => ({ ...p, stock: 20, lowStockAlert: 5 }));
            setProducts(initial);
            setDoc(doc(db, 'appData', 'products'), { data: initial });
        });
      }
    });

    const unsubOrders = onSnapshot(doc(db, 'appData', 'orders'), (docSnap) => {
      if (docSnap.exists()) {
        setOrders(docSnap.data().data);
      } else {
        setOrders([]);
      }
    });
    
    const unsubNotifications = onSnapshot(doc(db, 'appData', 'notifications'), (docSnap) => {
      if (docSnap.exists()) {
        setNotifications(docSnap.data().data);
      } else {
        setNotifications([]);
      }
    });

    return () => {
      unsubProducts();
      unsubOrders();
      unsubNotifications();
    };
  }, []);

  // Sync back to Firebase when state changes (debounced or directly in the action functions)
  // Wait, if we use onSnapshot, updating state locally will trigger it again?
  // Actually, we shouldn't sync back in useEffect because it will cause loops.
  // We should update Firebase inside addProduct, updateProduct, placeOrder, etc.
"""

content = content.replace("const [soundEnabled", sync_effect + "\n  const [soundEnabled")

with open('src/context/CartContext.tsx', 'w') as f:
    f.write(content)
print("Done")
