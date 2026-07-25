import sys

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

# FRAUD CHECKER
target_fraud = """                {/* Fraud Checker Section */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm mb-6 overflow-hidden">
                  <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-amber-50/50 to-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-bold text-base text-slate-800 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                          <AlertTriangle size={18} strokeWidth={2.5} />
                        </div>
                        ফ্রড চেকার (Fraud Checker)
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5 ml-11">গ্রাহকের ফোন নম্বর দিয়ে ডেলিভারি সাকসেস রেট যাচাই করুন</p>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <Search className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          value={fraudCheckPhone}
                          onChange={async (e) => {"""
replacement_fraud = """                {/* Fraud Checker Section */}
                <div className="bg-white rounded-2xl border border-slate-200/70 hover:border-amber-300 shadow-sm hover:shadow-md hover:shadow-amber-500/5 transition-all duration-300 mb-6 overflow-hidden relative group">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="p-5 sm:p-6 border-b border-slate-100/60 bg-gradient-to-r from-amber-50/40 via-white to-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-bold text-[15px] text-slate-800 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-sm border border-amber-200/50">
                          <AlertTriangle size={18} strokeWidth={2.5} />
                        </div>
                        ফ্রড চেকার (Fraud Checker)
                      </h3>
                      <p className="text-[12.5px] text-slate-500 mt-2 ml-12">গ্রাহকের ফোন নম্বর দিয়ে ডেলিভারি সাকসেস রেট যাচাই করুন</p>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <Search className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          value={fraudCheckPhone}
                          onChange={async (e) => {"""
if target_fraud in content:
    content = content.replace(target_fraud, replacement_fraud)
    print("Updated fraud card header")
else:
    print("Could not find fraud card header")

target_fraud_input = """                          placeholder="Phone number (e.g. 01XXXXXXXXX)"
                          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-sm"
                          onKeyDown={(e) => {"""
replacement_fraud_input = """                          placeholder="Phone number (e.g. 01XXXXXXXXX)"
                          className="w-full pl-10 pr-4 py-3.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-sm bg-slate-50/50"
                          onKeyDown={(e) => {"""
if target_fraud_input in content:
    content = content.replace(target_fraud_input, replacement_fraud_input)
    print("Updated fraud input")

target_fraud_btn = """                        }}
                        className="bg-amber-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-amber-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shrink-0 shadow-sm"
                      >
                        {isFraudCheckLoading ? 'যাচাই হচ্ছে...' : 'চেক করুন'}
                      </button>"""
replacement_fraud_btn = """                        }}
                        className="bg-slate-900 hover:bg-amber-500 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm shadow-slate-900/10 hover:shadow-amber-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0 active:scale-95"
                      >
                        {isFraudCheckLoading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> যাচাই হচ্ছে...</> : <><Search size={16} /> চেক করুন</>}
                      </button>"""
if target_fraud_btn in content:
    content = content.replace(target_fraud_btn, replacement_fraud_btn)
    print("Updated fraud button")

# PAYMENTS
target_payments = """                {/* Payments Section */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm mb-6 overflow-hidden">
                  <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-emerald-50/50 to-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-bold text-base text-slate-800 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                          <Wallet size={18} strokeWidth={2.5} />
                        </div>
                        কুরিয়ার পেমেন্ট ও ইনভয়েস (Steadfast Payments)
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5 ml-11">পেমেন্ট স্ট্যাটাস এবং কনসাইনমেন্ট বিস্তারিত দেখুন</p>
                    </div>
                    <button
                      onClick={async () => {"""
replacement_payments = """                {/* Payments Section */}
                <div className="bg-white rounded-2xl border border-slate-200/70 hover:border-emerald-300 shadow-sm hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-300 mb-6 overflow-hidden relative group">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="p-5 sm:p-6 border-b border-slate-100/60 bg-gradient-to-r from-emerald-50/40 via-white to-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-bold text-[15px] text-slate-800 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm border border-emerald-200/50">
                          <Wallet size={18} strokeWidth={2.5} />
                        </div>
                        কুরিয়ার পেমেন্ট ও ইনভয়েস (Steadfast Payments)
                      </h3>
                      <p className="text-[12.5px] text-slate-500 mt-2 ml-12">পেমেন্ট স্ট্যাটাস এবং কনসাইনমেন্ট বিস্তারিত দেখুন</p>
                    </div>
                    <button
                      onClick={async () => {"""
if target_payments in content:
    content = content.replace(target_payments, replacement_payments)
    print("Updated payments header")

target_payments_btn = """                      disabled={isPaymentsLoading}
                      className="bg-emerald-600 text-white hover:bg-emerald-700 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors disabled:opacity-50 shadow-sm whitespace-nowrap"
                    >
                      {isPaymentsLoading ? 'লোড হচ্ছে...' : 'পেমেন্ট রিফ্রেশ'}
                    </button>"""
replacement_payments_btn = """                      disabled={isPaymentsLoading}
                      className="bg-slate-900 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm shadow-slate-900/10 hover:shadow-emerald-500/30 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap flex items-center gap-2 active:scale-95"
                    >
                      {isPaymentsLoading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> লোড হচ্ছে...</> : 'পেমেন্ট রিফ্রেশ'}
                    </button>"""
if target_payments_btn in content:
    content = content.replace(target_payments_btn, replacement_payments_btn)
    print("Updated payments button")

# TRACKING
target_tracking = """                {/* Tracking By Invoice Section */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm mb-6 overflow-hidden">
                  <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50/50 to-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-bold text-base text-slate-800 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                          <Truck size={18} strokeWidth={2.5} />
                        </div>
                        ইনভয়েস দিয়ে ট্র্যাকিং (Track by Invoice)
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5 ml-11">আপনার ইনভয়েস নম্বর দিয়ে পার্সেলের ট্র্যাকিং তথ্য জানুন</p>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <Search className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          value={trackingInvoiceId}
                          onChange={(e) => setTrackingInvoiceId(e.target.value)}"""
replacement_tracking = """                {/* Tracking By Invoice Section */}
                <div className="bg-white rounded-2xl border border-slate-200/70 hover:border-blue-300 shadow-sm hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300 mb-6 overflow-hidden relative group">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="p-5 sm:p-6 border-b border-slate-100/60 bg-gradient-to-r from-blue-50/40 via-white to-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-bold text-[15px] text-slate-800 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm border border-blue-200/50">
                          <Truck size={18} strokeWidth={2.5} />
                        </div>
                        ইনভয়েস দিয়ে ট্র্যাকিং (Track by Invoice)
                      </h3>
                      <p className="text-[12.5px] text-slate-500 mt-2 ml-12">আপনার ইনভয়েস নম্বর দিয়ে পার্সেলের ট্র্যাকিং তথ্য জানুন</p>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <Search className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          value={trackingInvoiceId}
                          onChange={(e) => setTrackingInvoiceId(e.target.value)}"""
if target_tracking in content:
    content = content.replace(target_tracking, replacement_tracking)
    print("Updated tracking header")

target_tracking_input = """                          placeholder="Invoice ID (e.g. INV0EEBA2A)"
                          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                          onKeyDown={(e) => {"""
replacement_tracking_input = """                          placeholder="Invoice ID (e.g. INV0EEBA2A)"
                          className="w-full pl-10 pr-4 py-3.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm bg-slate-50/50"
                          onKeyDown={(e) => {"""
if target_tracking_input in content:
    content = content.replace(target_tracking_input, replacement_tracking_input)
    print("Updated tracking input")

target_tracking_btn = """                          }
                        }}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shrink-0 shadow-sm"
                      >
                        {isTrackingLoading ? 'খোঁজা হচ্ছে...' : 'ট্র্যাক করুন'}
                      </button>"""
replacement_tracking_btn = """                          }
                        }}
                        className="bg-slate-900 hover:bg-blue-600 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm shadow-slate-900/10 hover:shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0 active:scale-95"
                      >
                        {isTrackingLoading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> খোঁজা হচ্ছে...</> : <><Search size={16} /> ট্র্যাক করুন</>}
                      </button>"""
if target_tracking_btn in content:
    content = content.replace(target_tracking_btn, replacement_tracking_btn)
    print("Updated tracking button")


with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)

