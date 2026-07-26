const fs = require('fs');

const newLoginContent = `import React from "react";
import { useState } from 'react';
import { Eye, EyeOff, User, Lock, ArrowLeft, Phone, UserCheck, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (isLogin) {
      const normalizedUser = identifier.trim().toLowerCase();
      const isOldAdmin = normalizedUser === 'urborfood' && password === 'Urborfood.com@@';
      const isNewAdmin = normalizedUser === 'urborfood' && password === 'Urborfood.com@@';
      
      if (isOldAdmin || isNewAdmin) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('urbor_admin_auth', 'true');
          window.location.hash = '#admin';
        }
        return;
      }
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('urbor_customer_auth', 'true');
        localStorage.setItem('urbor_customer_phone', identifier);
        localStorage.setItem('urbor_customer_name', 'Customer User');
        window.location.hash = ''; 
      }
    } else {
      if (password !== confirmPassword) {
        setErrorMsg('পাসওয়ার্ড মিলছে না!');
        return;
      }
      setSuccessMsg('একাউন্ট সফলভাবে তৈরি হয়েছে! অনুগ্রহ করে লগইন করুন।');
      setTimeout(() => {
        setIsLogin(true);
        setPassword('');
        setConfirmPassword('');
        setSuccessMsg('');
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Decorative background elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

      <button 
        onClick={() => window.location.hash = ''}
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-slate-500 hover:text-emerald-700 font-bold text-sm bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-slate-200/60 transition-all active:scale-95 z-20"
      >
        <ArrowLeft size={16} />
        হোম পেজ
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1000px] bg-white rounded-[2rem] shadow-2xl shadow-emerald-900/5 border border-white overflow-hidden flex flex-col md:flex-row relative z-10 min-h-[640px]"
      >
        {/* Left/Top Branding Section */}
        <div className="w-full md:w-5/12 bg-emerald-900 p-10 md:p-12 flex flex-col justify-between relative overflow-hidden text-white">
          <div className="absolute inset-0 z-0">
            <svg className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] animate-[spin_60s_linear_infinite] opacity-10" viewBox="0 0 100 100">
               <path d="M50 0 A 50 50 0 1 1 49.9 0" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4"/>
               <path d="M50 20 A 30 30 0 1 1 49.9 20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3"/>
               <path d="M50 40 A 10 10 0 1 1 49.9 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-950/80" />
          </div>
          
          <div className="relative z-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/20 shadow-xl"
            >
               <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-emerald-400">
                 <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.06 19.43 4 16.05 4 12C4 7.95 7.06 4.57 11 4.07V19.93ZM13 4.07C16.94 4.57 20 7.95 20 12C20 16.05 16.94 19.43 13 19.93V4.07Z" />
               </svg>
            </motion.div>
            <motion.h1 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl font-black mb-4 tracking-tight"
            >
              উর্বর ফুড
            </motion.h1>
            <motion.p 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-emerald-100/90 font-medium text-[15px] leading-relaxed max-w-[260px]"
            >
              তাজা দেশি মুরগি, মাছ ও সবজি সরাসরি খামার থেকে আপনার ঘরে।
            </motion.p>
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative z-10 mt-12 md:mt-0"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-400/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               <div className="flex items-center gap-2 mb-2">
                 <CheckCircle2 size={16} className="text-emerald-400" />
                 <span className="text-emerald-300 font-bold text-xs uppercase tracking-wider block">আমাদের প্রতিশ্রুতি</span>
               </div>
               <p className="text-emerald-50 text-sm leading-relaxed font-medium">শতভাগ ফ্রেশ ও কেমিক্যালমুক্ত স্বাস্থ্যকর খাবার সরবরাহ করাই আমাদের মূল লক্ষ্য।</p>
            </div>
          </motion.div>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-7/12 p-8 md:p-14 lg:p-16 flex flex-col justify-center bg-white relative">
          <div className="max-w-[400px] w-full mx-auto">
            <AnimatePresence mode="wait">
              <motion.div 
                key={isLogin ? 'login-header' : 'register-header'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mb-10 text-center md:text-left"
              >
                <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">
                  {isLogin ? 'স্বাগতম!' : 'নতুন একাউন্ট'}
                </h2>
                <p className="text-slate-500 font-medium text-[15px]">
                  {isLogin ? 'আপনার একাউন্টে লগইন করুন' : 'নিরাপদ খাদ্যের দুনিয়ায় যোগ দিন'}
                </p>
              </motion.div>
            </AnimatePresence>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <AnimatePresence>
                  {errorMsg && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-sm font-bold flex items-center gap-3">
                        <AlertCircle size={20} className="text-rose-500 shrink-0" /> 
                        {errorMsg}
                      </div>
                    </motion.div>
                  )}
                  {successMsg && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-sm font-bold flex items-center gap-3">
                        <CheckCircle2 size={20} className="text-emerald-500 shrink-0" /> 
                        {successMsg}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div 
                      key="name-field"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 overflow-hidden"
                    >
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">আপনার নাম</label>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                            <User size={18} />
                          </div>
                          <input 
                            type="text" 
                            placeholder="যেমন: আব্দুর রহমান"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-[15px] font-medium text-slate-800 placeholder-slate-400" 
                            required 
                          />
                        </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">ফোন বা ইউজারনেম</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                          <Phone size={18} />
                        </div>
                        <input 
                          type="text" 
                          placeholder="01XXXXXXXXX"
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-[15px] font-medium text-slate-800 placeholder-slate-400 tracking-wide" 
                          required 
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">পাসওয়ার্ড</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                          <Lock size={18} />
                        </div>
                        <input 
                          type={showPassword ? 'text' : 'password'} 
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-[15px] font-medium text-slate-800 placeholder-slate-400 tracking-wider" 
                          required 
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
                
                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div 
                      key="confirm-password"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 overflow-hidden"
                    >
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">পাসওয়ার্ড নিশ্চিত করুন</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                              <Lock size={18} />
                            </div>
                            <input 
                              type={showConfirmPassword ? 'text' : 'password'} 
                              placeholder="••••••••"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-[15px] font-medium text-slate-800 placeholder-slate-400 tracking-wider" 
                              required 
                            />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer">
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-4 h-4">
                          <input type="checkbox" required className="peer appearance-none w-4 h-4 border-2 border-slate-300 rounded cursor-pointer checked:bg-emerald-600 checked:border-emerald-600 transition-colors" />
                          <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 14 14" fill="none">
                            <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor"/>
                          </svg>
                        </div>
                        <span className="text-xs text-slate-600 font-bold select-none group-hover:text-emerald-700 transition-colors">
                          {isLogin ? 'লগইন মনে রাখুন' : 'শর্তাবলীতে সম্মত'}
                        </span>
                    </label>
                    {isLogin && (
                        <button type="button" onClick={() => alert('পাসওয়ার্ড পুনরুদ্ধারের জন্য অ্যাডমিনের সাথে যোগাযোগ করুন।')} className="text-xs font-bold text-emerald-600 hover:text-emerald-800 transition-colors cursor-pointer">
                          পাসওয়ার্ড ভুলে গেছেন?
                        </button>
                    )}
                </div>

                <div className="pt-5 space-y-3">
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black text-[15px] hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                      {isLogin ? 'লগইন করুন' : 'একাউন্ট তৈরি করুন'}
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="button" 
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('urbor_admin_auth', 'true');
                        window.location.hash = '#admin';
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-600 py-3.5 rounded-xl font-bold text-[13px] hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <UserCheck size={16} />
                    অ্যাডমিন ড্যাশবোর্ডে প্রবেশ
                  </motion.button>
                </div>
            </form>

            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col items-center">
                <p className="text-slate-500 text-sm mb-3 font-medium">
                    {isLogin ? 'নতুন ব্যবহারকারী?' : 'ইতিমধ্যে একাউন্ট আছে?'}
                </p>
                <button 
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setErrorMsg('');
                      setSuccessMsg('');
                    }}
                    className="text-emerald-600 font-black text-sm hover:text-emerald-700 transition-colors px-6 py-2.5 bg-emerald-50 hover:bg-emerald-100 rounded-full"
                >
                    {isLogin ? 'নতুন একাউন্ট তৈরি করুন' : 'লগইন করুন'}
                </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
`

// Also need to add AlertCircle icon
const replaced = newLoginContent.replace("import { Eye, EyeOff, User, Lock, ArrowLeft, Phone, UserCheck, CheckCircle2 } from 'lucide-react';", "import { Eye, EyeOff, User, Lock, ArrowLeft, Phone, UserCheck, CheckCircle2, AlertCircle } from 'lucide-react';");
fs.writeFileSync('src/pages/LoginPage.tsx', replaced);
