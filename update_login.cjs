const fs = require('fs');

const loginCode = `import { useState } from 'react';
import { Eye, EyeOff, User, Lock, ArrowLeft, Phone, UserCheck } from 'lucide-react';

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
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-amber-500/10 blur-[100px]" />

      <button 
        onClick={() => window.location.hash = ''}
        className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-slate-500 hover:text-emerald-700 font-bold text-sm bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 transition-all active:scale-95 z-20"
      >
        <ArrowLeft size={16} />
        হোম পেজ
      </button>

      <div className="w-full max-w-[1000px] bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100/60 overflow-hidden flex flex-col md:flex-row relative z-10 min-h-[600px]">
        
        {/* Left/Top Branding Section */}
        <div className="w-full md:w-5/12 bg-emerald-900 text-white p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor"/>
            </svg>
          </div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
               <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-emerald-400">
                 <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.06 19.43 4 16.05 4 12C4 7.95 7.06 4.57 11 4.07V19.93ZM13 4.07C16.94 4.57 20 7.95 20 12C20 16.05 16.94 19.43 13 19.93V4.07Z" />
               </svg>
            </div>
            <h1 className="text-3xl font-black mb-3 tracking-tight">উর্বর ফুড</h1>
            <p className="text-emerald-100/80 font-medium text-sm leading-relaxed max-w-[240px]">
              তাজা দেশি মুরগি, মাছ ও সবজি সরাসরি খামার থেকে আপনার ঘরে।
            </p>
          </div>

          <div className="relative z-10 mt-12 md:mt-0">
            <div className="bg-emerald-800/50 backdrop-blur-sm rounded-2xl p-5 border border-emerald-700/50">
               <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2 block">আমাদের প্রতিশ্রুতি</span>
               <p className="text-emerald-50 text-sm leading-relaxed font-medium">শতভাগ ফ্রেশ ও কেমিক্যালমুক্ত স্বাস্থ্যকর খাবার সরবরাহ করাই আমাদের মূল লক্ষ্য।</p>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-7/12 p-8 md:p-14 lg:p-16 flex flex-col justify-center bg-white relative">
          <div className="max-w-[400px] w-full mx-auto">
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mb-2">
                {isLogin ? 'স্বাগতম!' : 'নতুন একাউন্ট'}
              </h2>
              <p className="text-slate-500 font-medium text-sm">
                {isLogin ? 'আপনার একাউন্টে লগইন করুন' : 'নিরাপদ খাদ্যের দুনিয়ায় যোগ দিন'}
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                {errorMsg && (
                  <div className="p-4 bg-rose-50 border-l-4 border-rose-500 text-rose-700 rounded-r-lg text-sm font-bold flex items-center gap-3">
                    <span className="text-lg">⚠️</span> {errorMsg}
                  </div>
                )}
                {successMsg && (
                  <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 rounded-r-lg text-sm font-bold flex items-center gap-3">
                    <span className="text-lg">🎉</span> {successMsg}
                  </div>
                )}

                {!isLogin && (
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">আপনার নাম</label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <User size={18} />
                          </div>
                          <input 
                            type="text" 
                            placeholder="যেমন: আব্দুর রহমান" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm font-semibold text-slate-800 placeholder-slate-400" 
                            required 
                          />
                        </div>
                    </div>
                )}

                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">ফোন বা ইউজারনেম</label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                          <Phone size={18} />
                        </div>
                        <input 
                          type="text" 
                          placeholder="017XXXXXXXX" 
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm font-semibold text-slate-800 placeholder-slate-400" 
                          required 
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">পাসওয়ার্ড</label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                          <Lock size={18} />
                        </div>
                        <input 
                          type={showPassword ? 'text' : 'password'} 
                          placeholder="••••••••" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm font-semibold text-slate-800 placeholder-slate-400" 
                          required 
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
                
                {!isLogin && (
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">পাসওয়ার্ড নিশ্চিত করুন</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                              <Lock size={18} />
                            </div>
                            <input 
                              type={showConfirmPassword ? 'text' : 'password'} 
                              placeholder="••••••••" 
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm font-semibold text-slate-800 placeholder-slate-400" 
                              required 
                            />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer">
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between pt-2">
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
                        <button type="button" onClick={() => alert('পাসওয়ার্ড পুনরুদ্ধারের জন্য অ্যাডমিনের সাথে যোগাযোগ করুন।')} className="text-xs font-bold text-emerald-600 hover:text-emerald-800 transition-colors cursor-pointer">পাসওয়ার্ড ভুলে গেছেন?</button>
                    )}
                </div>

                <div className="pt-4 space-y-3">
                  <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black text-sm hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-[0.98] transition-all cursor-pointer">
                      {isLogin ? 'লগইন করুন' : 'একাউন্ট তৈরি করুন'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('urbor_admin_auth', 'true');
                        window.location.hash = '#admin';
                      }
                    }}
                    className="w-full bg-slate-100 text-slate-600 py-3 rounded-xl font-bold text-xs hover:bg-slate-200 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <UserCheck size={16} />
                    অ্যাডমিন ড্যাশবোর্ডে প্রবেশ
                  </button>
                </div>
            </form>

            <div className="text-center mt-8">
                <p className="text-slate-500 text-xs mb-2 font-medium">
                    {isLogin ? 'নতুন ব্যবহারকারী?' : 'ইতিমধ্যে একাউন্ট আছে?'}
                </p>
                <button 
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setErrorMsg('');
                      setSuccessMsg('');
                    }}
                    className="text-emerald-600 font-black text-sm hover:text-emerald-800 transition-colors px-4 py-2 bg-emerald-50 hover:bg-emerald-100 rounded-lg"
                >
                    {isLogin ? 'নতুন একাউন্ট তৈরি করুন' : 'লগইন করুন'}
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/pages/LoginPage.tsx', loginCode);
console.log('LoginPage updated successfully');
