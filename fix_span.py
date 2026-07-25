import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace("order.status === 'Confirmed' ? 'পণ্য প্রস্তুত করা হচ্ছে' : 'পেন্ডিং'}</span>\n                          </span>", "order.status === 'Confirmed' ? 'পণ্য প্রস্তুত করা হচ্ছে' : 'পেন্ডিং'}\n                          </span>")

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
