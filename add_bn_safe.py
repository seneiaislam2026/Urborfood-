import os
import re

with open('src/index.css', 'r') as f:
    css = f.read()

if '.bn-safe' not in css:
    css = css.replace('@layer utilities {', '@layer utilities {\n  .bn-safe {\n    line-height: normal !important;\n    padding-top: 0.2em;\n    padding-bottom: 0.1em;\n    display: inline-block;\n  }')
    with open('src/index.css', 'w') as f:
        f.write(css)
    print("Added .bn-safe to index.css")

def wrap_bn(content):
    # wrap ৳{toBanglaNumber(...)}
    # it can be &nbsp;৳{toBanglaNumber(...)}
    # Regex to find ৳{toBanglaNumber(...)} and wrap it
    # Be careful not to double wrap
    
    # Let's just find and replace specific patterns
    content = re.sub(r'(?:&nbsp;)?৳\{toBanglaNumber\(([^)]+)\)\}', r'<span className="bn-safe whitespace-nowrap">&nbsp;৳{toBanglaNumber(\1)}</span>', content)
    
    # wrap product.weight if not wrapped
    # Since we previously did some custom wrapping, let's normalize
    content = content.replace('className="text-[11px] font-medium text-slate-500 leading-[normal] pt-[3px] inline-block"', 'className="text-[11px] font-medium text-slate-500"')
    content = content.replace('<span className="pt-[0.1em] pb-[0.05em] inline-block">{product.weight || \'১ কেজি\'}</span>', '<span className="bn-safe">{product.weight || \'১ কেজি\'}</span>')
    content = content.replace('{product.weight || \'১ কেজি\'}', '<span className="bn-safe">{product.weight || \'১ কেজি\'}</span>')
    
    # ProductLandingPage
    content = content.replace('<span className="text-[13px] text-slate-500 font-medium leading-[normal] pt-[3px] inline-block">', '<span className="text-[13px] text-slate-500 font-medium">')
    content = content.replace('<span className="text-emerald-700 leading-[normal] pt-[3px] inline-block">', '<span className="text-emerald-700">')
    content = content.replace('<p className="text-slate-500 text-[13px] font-medium mt-0.5 leading-[normal] pt-[3px]">', '<p className="text-slate-500 text-[13px] font-medium mt-0.5">')
    
    content = content.replace('{product.weight}', '<span className="bn-safe">{product.weight}</span>')
    content = content.replace('{toBanglaNumber(quantity)}', '<span className="bn-safe">{toBanglaNumber(quantity)}</span>')
    
    # Fix double wrapping
    content = content.replace('<span className="bn-safe"><span className="bn-safe">', '<span className="bn-safe">')
    content = content.replace('</span></span>', '</span>')
    
    # Fix already wrapped bn-safe
    content = re.sub(r'<span className="bn-safe whitespace-nowrap"><span className="bn-safe whitespace-nowrap">(.+?)</span></span>', r'<span className="bn-safe whitespace-nowrap">\1</span>', content)
    content = re.sub(r'<span className="bn-safe"><span className="bn-safe">(.+?)</span></span>', r'<span className="bn-safe">\1</span>', content)
    
    return content

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            new_content = wrap_bn(content)
            if new_content != content:
                with open(filepath, 'w') as f:
                    f.write(new_content)
                print(f"Updated {filepath}")

print("Done")
