import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    # Fix missing span close
    if "toLocaleString('bn-BD')" in line and "</span>" not in line and "</div>" not in line and "return" not in line:
        if line.strip().endswith("}"):
            line = line.rstrip() + "</span>\n"
    
    # Fix the stray '}' on 5999
    if i == 5998 and line.strip() == ")}":
        pass # Wait, if it's ')}', is it closing a condition?

    new_lines.append(line)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.writelines(new_lines)
print("Done")
