with open('src/components/ui/MyOrdersModal.tsx', 'r') as f:
    content = f.read()

content = content.replace('&nbsp;৳{toBanglaNumber(order.total)}</span></div>', '&nbsp;৳{toBanglaNumber(order.total)}</div>')
content = content.replace('x{item.quantity}</span>\n                        <span className="text-slate-700 font-black">&nbsp;৳{toBanglaNumber(item.price * item.quantity)}</span>', 'x{item.quantity}</span></span>\n                        <span className="text-slate-700 font-black">&nbsp;৳{toBanglaNumber(item.price * item.quantity)}</span>')

with open('src/components/ui/MyOrdersModal.tsx', 'w') as f:
    f.write(content)

with open('src/components/ui/CartDrawer.tsx', 'r') as f:
    content = f.read()
# Let's fix CartDrawer
content = content.replace('<span>&nbsp;৳{toBanglaNumber(cartTotal)}</span>\n                </div>', '<span>&nbsp;৳{toBanglaNumber(cartTotal)}</span></span>\n                </div>')
content = content.replace('<span>&nbsp;৳{toBanglaNumber(cartTotal)}\n                </div>', '<span>&nbsp;৳{toBanglaNumber(cartTotal)}</span>\n                </div>')

with open('src/components/ui/CartDrawer.tsx', 'w') as f:
    f.write(content)
print("Done")
