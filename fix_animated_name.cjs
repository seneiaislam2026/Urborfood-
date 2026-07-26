const fs = require('fs');

let content = fs.readFileSync('src/pages/ProductLandingPage.tsx', 'utf-8');

// Add motion import
if (!content.includes("import { motion }")) {
  content = content.replace(
    "import ImageLoader from '../components/ui/ImageLoader';",
    "import ImageLoader from '../components/ui/ImageLoader';\nimport { motion } from 'motion/react';"
  );
}

// Replace name input block
const oldBlock = `                    <div className="space-y-2">
                      <label className="block text-[15px] font-bold text-slate-800">
                        আপনার নাম <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="আপনার পুরো নাম লিখুন"
                        className="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-[15px] font-medium text-slate-900 placeholder:text-slate-400"
                      />
                    </div>`;

const newBlock = `                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <motion.label 
                        className="block text-[15px] font-bold text-slate-800 flex items-center gap-2"
                        animate={{ color: ['#1e293b', '#059669', '#1e293b'] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                      >
                        আপনার নাম <span className="text-rose-500">*</span>
                      </motion.label>
                      <motion.input 
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        type="text" 
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="আপনার পুরো নাম লিখুন"
                        className="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-[15px] font-medium text-slate-900 placeholder:text-slate-400"
                      />
                    </motion.div>`;

content = content.replace(oldBlock, newBlock);

fs.writeFileSync('src/pages/ProductLandingPage.tsx', content);
