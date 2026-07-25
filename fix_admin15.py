import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'(\{order\.status === \'Completed\' \? \'ডেলিভারি সম্পন্ন\' : order\.status === \'Cancelled\' \? \'বাতিল\' : order\.status === \'Shipped\' \? \'ডেলিভারি পার্টনারের কাছে হস্তান্তরিত\' : order\.status === \'Confirmed\' \? \'পণ্য প্রস্তুত করা হচ্ছে\' : \'পেন্ডিং\'\})\n([\s\n]*</span>\n[\s\n]*</div>)', r'\1</span>\n\2', content)

# Also fix line 2394 `)) \n )}`
content = re.sub(r'\)\)\n[\s\n]*\)\}\n', r'))\n                  }\n', content)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
