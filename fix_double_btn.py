import re

with open('src/pages/ProductLandingPage.tsx', 'r') as f:
    content = f.read()

# Add isFormVisible state
state_insertion = """  const [copied, setCopied] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);"""
content = content.replace("  const [copied, setCopied] = useState(false);", state_insertion)

# Add IntersectionObserver
effect_insertion = """  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedProduct]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFormVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    const formEl = document.getElementById('checkout-form');
    if (formEl) {
      observer.observe(formEl);
    }
    return () => observer.disconnect();
  }, []);"""
content = content.replace("""  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedProduct]);""", effect_insertion)

# Update floating button condition
content = content.replace("{!orderSuccess && (", "{!orderSuccess && !isFormVisible && (")

with open('src/pages/ProductLandingPage.tsx', 'w') as f:
    f.write(content)
print("Done")
