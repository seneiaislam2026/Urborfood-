import re

with open('src/components/layout/Header.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the duplicate hover:bg on the Order Now button
content = re.sub(
    r'bg-\[#f58321\] text-white hover:bg-\[#d86a10\] px-7 py-2\.5 rounded-full text-\[15px\] font-bold hover:bg-\[#08552d\]',
    r'bg-[#f58321] text-white px-7 py-2.5 rounded-full text-[15px] font-bold hover:bg-[#d86a10]',
    content
)

# Update Mobile Menu Toggle Icon hover to Orange
content = re.sub(
    r'className="lg:hidden p-2 text-slate-700 hover:text-\[#0b6132\] cursor-pointer"',
    r'className="lg:hidden p-2 text-[#0b6132] hover:text-[#f58321] cursor-pointer"',
    content
)

# Update Cart Icon default/hover
content = re.sub(
    r'className="relative p-2 text-slate-700 hover:text-\[#0b6132\] transition-colors cursor-pointer flex items-center justify-center"',
    r'className="relative p-2 text-[#0b6132] hover:text-[#f58321] transition-colors cursor-pointer flex items-center justify-center"',
    content
)

# Update Login Desktop Text
content = re.sub(
    r'className="hidden lg:flex items-center gap-2 text-slate-700 hover:text-\[#0B6B3A\] cursor-pointer text-sm font-bold ml-2"',
    r'className="hidden lg:flex items-center gap-2 text-[#0b6132] hover:text-[#f58321] cursor-pointer text-sm font-bold ml-2"',
    content
)

# Mobile Menu Sidebar text (Logo "Urbor Food")
content = re.sub(
    r'<span className="text-\[18px\] font-black text-slate-800 tracking-tight">Urbor <span className="text-\[#0B6B3A\]">Food</span></span>',
    r'<span className="text-[18px] font-black text-slate-800 tracking-tight">Urbor <span className="text-[#0b6132]">Food</span></span>',
    content
)

with open('src/components/layout/Header.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
