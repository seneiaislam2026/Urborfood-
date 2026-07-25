import re

with open('src/components/ui/ProductCard.tsx', 'r') as f:
    content = f.read()

# Change aspect-[4/3] to aspect-square and adjust padding
content = content.replace(
    'className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50"',
    'className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-50"'
)

# Remove the two big buttons and add a small circular add-to-cart button
old_buttons = """          <div className="flex items-center gap-2 w-full">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProduct(product);
              }}
              className="flex-1 min-w-0 bg-slate-50 hover:bg-slate-200 text-slate-700 h-10 rounded-xl flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-bold transition-colors shadow-sm"
            >
              <Eye size={14} strokeWidth={2.5} />
              <span className="truncate">বিস্তারিত</span>
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="flex-1 min-w-0 bg-emerald-50 hover:bg-emerald-500 text-emerald-700 hover:text-white h-10 rounded-xl flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-bold transition-colors shadow-sm"
            >
              <ShoppingCart size={14} strokeWidth={2.5} />
              <span className="truncate">কার্টে যোগ</span>
            </button>
          </div>"""

new_buttons = """          <div className="flex items-center justify-between w-full">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-10 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-colors shadow-sm"
            >
              <ShoppingCart size={16} strokeWidth={2.5} />
              <span>অর্ডার করুন</span>
            </button>
          </div>"""

content = content.replace(old_buttons, new_buttons)

with open('src/components/ui/ProductCard.tsx', 'w') as f:
    f.write(content)

