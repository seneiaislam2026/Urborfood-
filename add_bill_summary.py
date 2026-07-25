import re

with open('src/pages/ProductLandingPage.tsx', 'r') as f:
    content = f.read()

target = """                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3">
                      <span className="text-amber-500 font-bold mt-0.5 select-none text-[16px]">i</span>
                      <p className="text-[14px] font-medium text-slate-600 leading-snug">
                        ক্যাশ অন ডেলিভারি - পণ্য হাতে পেয়ে মূল্য পরিশোধ করবেন।
                      </p>
                    </div>"""

replacement = """                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3">
                      <span className="text-amber-500 font-bold mt-0.5 select-none text-[16px]">i</span>
                      <p className="text-[14px] font-medium text-slate-600 leading-snug">
                        ক্যাশ অন ডেলিভারি - পণ্য হাতে পেয়ে মূল্য পরিশোধ করবেন।
                      </p>
                    </div>
                    
                    {/* Bill Summary */}
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm mt-4">
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center text-[15px] font-medium text-slate-600">
                          <span>পণ্যের মূল্য</span>
                          <span className="text-slate-800 font-bold">৳{toBanglaNumber(price * quantity)}</span>
                        </div>
                        <div className="flex justify-between items-center text-[15px] font-medium text-slate-600">
                          <span>ডেলিভারি চার্জ</span>
                          <span className="text-slate-800 font-bold">৳{toBanglaNumber(deliveryCharge)}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                        <span className="text-[16px] font-bold text-slate-800">সর্বমোট বিল</span>
                        <span className="text-[20px] font-black text-slate-900 tracking-tight">৳{toBanglaNumber(totalPrice)}</span>
                      </div>
                    </div>"""

content = content.replace(target, replacement)

with open('src/pages/ProductLandingPage.tsx', 'w') as f:
    f.write(content)
