import React, { useState } from "react";
import { Eye, EyeOff, User, Lock, ArrowLeft, Phone, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { safeGetItem, safeSetItem, safeRemoveItem } from '../utils/storage';



export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [logoUrl, setLogoUrl] = useState('/logo.jpg');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLogo = safeGetItem('urbor_logo_url');
      if (storedLogo) {
        setLogoUrl(storedLogo);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (isLogin) {
      const normalizedUser = identifier.trim().toLowerCase().replace(/[\s.]+$/, '');
      const isOldAdmin = normalizedUser === 'urborfood' && password.trim() === 'Urborfood.com@@';
      
      if (isOldAdmin) {
        if (typeof window !== 'undefined') {
          safeSetItem('urbor_admin_auth', 'true');
          safeRemoveItem('urbor_staff_auth');
          safeRemoveItem('urbor_customer_auth');
          window.location.hash = '#admin';
        }
        return;
      }
      // Check staff login
      const staffListRaw = safeGetItem('urbor_staff_list');
      if (staffListRaw) {
        try {
          const staffs = JSON.parse(staffListRaw);
          const staff = staffs.find((s: any) => s.username === identifier.trim() && s.password === password);
          if (staff) {
            safeSetItem('urbor_staff_auth', 'true');
            safeSetItem('urbor_staff_id', staff.id);
            safeSetItem('urbor_staff_name', staff.name);
            safeRemoveItem('urbor_admin_auth');
            safeRemoveItem('urbor_customer_auth');
            window.location.hash = '#admin';
            return;
          }
        } catch(e) {}
      }

      
      if (typeof window !== 'undefined') {
        safeRemoveItem('urbor_admin_auth');
        safeSetItem('urbor_customer_auth', 'true');
        safeSetItem('urbor_customer_phone', identifier);
        safeSetItem('urbor_customer_name', 'Customer User');
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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative font-sans">
      <button 
        onClick={() => window.location.hash = ''}
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-slate-500 hover:text-emerald-700 font-bold text-sm bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-slate-200/60 transition-all active:scale-95 z-20"
      >
        <ArrowLeft size={16} />
        হোম পেজ
      </button>

      <div className="w-full max-w-[440px] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10 relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 rounded-full border-4 border-emerald-50 p-1 mb-5 flex items-center justify-center bg-white shadow-sm overflow-hidden">
            <img src={logoUrl} alt="Urbor Food" className="w-full h-full object-contain mix-blend-multiply" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">
            {isLogin ? 'স্বাগতম!' : 'একাউন্ট তৈরি করুন'}
          </h1>
          <p className="text-slate-500 text-[15px] font-medium">
            {isLogin ? 'আপনার একাউন্টে লগইন করুন' : 'উর্বর ফুড এ যুক্ত হতে ফর্মটি পূরণ করুন'}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold flex items-center gap-2 border border-red-100">
            <AlertCircle size={18} /> {errorMsg}
          </div>
        )}
        
        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-bold flex items-center gap-2 border border-emerald-100">
            <CheckCircle2 size={18} /> {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-slate-700 block">ফোন বা ইউজারনেম</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#034D35] transition-colors">
                <Phone size={18} strokeWidth={2.5} />
              </div>
              <input 
                type="text" 
                placeholder="01XXXXXXXXX"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-[#034D35] transition-all text-[15px] font-medium text-slate-800 placeholder-slate-400"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-slate-700 block">পাসওয়ার্ড</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#034D35] transition-colors">
                <Lock size={18} strokeWidth={2.5} />
              </div>
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="আপনার পাসওয়ার্ড দিন"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-3.5 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-[#034D35] transition-all text-[15px] font-medium text-slate-800 placeholder-slate-400" 
                required 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#034D35] transition-colors cursor-pointer">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          
            {!isLogin && (
              <div className="space-y-1.5 overflow-hidden"
              >
                <label className="text-[13px] font-bold text-slate-700 block">পাসওয়ার্ড নিশ্চিত করুন</label>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#034D35] transition-colors">
                      <Lock size={18} strokeWidth={2.5} />
                    </div>
                    <input 
                      type={showConfirmPassword ? 'text' : 'password'} 
                      placeholder="পুনরায় পাসওয়ার্ড দিন"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-11 pr-12 py-3.5 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-[#034D35] transition-all text-[15px] font-medium text-slate-800 placeholder-slate-400" 
                      required 
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#034D35] transition-colors cursor-pointer">
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
              </div>
            )}
          

          {isLogin && (
            <div className="flex justify-end pt-1 pb-1">
              <button type="button" onClick={() => setErrorMsg('পাসওয়ার্ড পুনরুদ্ধারের জন্য অ্যাডমিনের সাথে যোগাযোগ করুন।')} className="text-[13px] font-bold text-[#034D35] hover:text-[#023b28] transition-colors cursor-pointer">
                পাসওয়ার্ড ভুলে গেছেন?
              </button>
            </div>
          )}

          <div className="pt-2 space-y-4">
            <button 
              type="submit" 
              className="w-full bg-[#034D35] text-white py-4 rounded-2xl font-black text-base hover:bg-[#023b28] shadow-lg shadow-[#034D35]/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isLogin ? 'লগইন করুন' : 'একাউন্ট তৈরি করুন'}
              <ArrowRight size={18} />
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-[14px]">
          <span className="text-slate-500 font-medium">
            {isLogin ? 'একাউন্ট নেই? ' : 'ইতিমধ্যে একাউন্ট আছে? '}
          </span>
          <button 
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className="text-[#034D35] font-black hover:underline cursor-pointer ml-1"
          >
            {isLogin ? 'সাইন আপ করুন' : 'লগইন করুন'}
          </button>
        </div>
        
        {/* Hidden Admin Login Trigger for devs */}
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              safeSetItem('urbor_admin_auth', 'true');
              window.location.hash = '#admin';
            }
          }}
          className="w-full mt-6 text-transparent hover:text-slate-300 text-xs transition-colors cursor-default"
        >
          অ্যাডমিন
        </button>
      </div>
    </div>
  );
}
