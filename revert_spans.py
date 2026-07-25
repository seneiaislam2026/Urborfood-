import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    if line.strip().endswith("</span>") and ("toLocaleString('bn-BD')" in line):
        # We need to know if it SHOULD have a </span>.
        # It should ONLY have it if it's lines 5976 or 5984 (or similar where we see a missing span).
        # Wait, I'll just remove the `</span>` at the end of all such lines, EXCEPT the ones I specifically want.
        # Actually, let me just remove it from all lines that don't start with `<span` or where it's visibly breaking.
        if "</span>" in line and "<span" not in line and not line.strip().startswith("<span>"):
             line = line.replace("</span>\n", "\n")

    new_lines.append(line)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.writelines(new_lines)
print("Done")
