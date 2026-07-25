import sys

with open('src/components/layout/Header.tsx', 'r') as f:
    content = f.read()

content = content.replace("name: 'Home'", "name: 'হোম'")
content = content.replace("name: 'Shop'", "name: 'শপ'")
content = content.replace("name: 'Categories'", "name: 'ক্যাটাগরি'")
content = content.replace("name: 'About'", "name: 'আমাদের সম্পর্কে'")
content = content.replace("name: 'Contact'", "name: 'যোগাযোগ'")

content = content.replace(">Order Now<", ">অর্ডার করুন<")
content = content.replace(">Track Order<", ">অর্ডার ট্র্যাক<")
content = content.replace("Admin Panel", "এডমিন প্যানেল")
content = content.replace(">Cart<", ">কার্ট<")

with open('src/components/layout/Header.tsx', 'w') as f:
    f.write(content)
print("Updated Header.tsx")
