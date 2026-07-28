import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin, MessageCircle, Clock } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export default function Footer() {

  return (
    <footer className="bg-white border-t border-gray-100 text-slate-800 pt-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-1.5 mb-4">
                <div className="w-5 h-5 text-[#00a651]">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.06 19.43 4 16.05 4 12C4 7.95 7.06 4.57 11 4.07V19.93ZM13 4.07C16.94 4.57 20 7.95 20 12C20 16.05 16.94 19.43 13 19.93V4.07Z" />
                  </svg>
                </div>
                <span className="text-xl font-black text-[#00a651] tracking-tight">উর্বর ফুড</span>
            </div>
            <p className="text-[11px] text-gray-500 font-bold mb-6 leading-relaxed max-w-[220px]">
              তাজা দেশি মুরগি, মাছ, সবজি ও নিত্যপ্রয়োজনীয় পণ্য সরাসরি কৃষক ও খামারিদের কাছ থেকে সংগ্রহ করা হয়।
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/UrborFood" target="_blank" rel="noopener noreferrer" className="text-[#00a651] hover:text-green-700 transition-colors">
                <Facebook size={14} />
              </a>
              <a href="#" className="text-[#00a651] hover:text-green-700 transition-colors">
                <Instagram size={14} />
              </a>
              <a href="#" className="text-[#00a651] hover:text-green-700 transition-colors">
                <Twitter size={14} />
              </a>
              <a href="#" className="text-[#00a651] hover:text-green-700 transition-colors">
                <Linkedin size={14} />
              </a>
            </div>
          </div>


          {/* Support Col */}
          <div>
            <h3 className="text-[13px] font-black text-gray-800 mb-4">সহায়তা</h3>
            <ul className="space-y-2.5 text-[11px] font-bold text-gray-500">
              <li><a href="#" className="hover:text-[#00a651] transition-colors">যোগাযোগ করুন</a></li>
              <li><a href="#" className="hover:text-[#00a651] transition-colors">ডেলিভারি তথ্য</a></li>
              <li><a href="#" className="hover:text-[#00a651] transition-colors">রিটার্ন ও রিফান্ড</a></li>
              <li><a href="#" className="hover:text-[#00a651] transition-colors">প্রশ্নোত্তর (FAQ)</a></li>
            </ul>
          </div>

          {/* Payment Methods Col */}
          <div>
            <h3 className="text-[13px] font-black text-gray-800 mb-4">পেমেন্ট পদ্ধতি</h3>
            <ul className="space-y-2.5 text-[11px] font-bold text-gray-500">
              <li>ক্যাশ অন ডেলিভারি</li>
              <li>বিকাশ / নগদ / রকেট</li>
              <li>অনলাইন পেমেন্ট <span className="text-[9px] text-gray-400 font-medium">(শীঘ্রই আসছে)</span></li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="border-t border-gray-100 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <h3 className="text-[14px] font-black text-gray-800">যোগাযোগ</h3>
                <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-bold text-gray-500">
                   <div className="flex items-center gap-1.5">
                       <Phone size={14} className="text-gray-400" />
                       <span>ফোন: 01335-273946</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                       <MessageCircle size={14} className="text-gray-400" />
                       <span>হোয়াটসঅ্যাপ: 01335-273946</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                       <Clock size={14} className="text-gray-400" />
                       <span>সময়: সকাল ৯টা - রাত ১০টা</span>
                   </div>
                </div>
            </div>
            
            <a href="https://wa.me/8801335273946" target="_blank" rel="noopener noreferrer" className="bg-[#128c7e] hover:bg-[#075e54] text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors shadow-sm">
                <span className="text-[11px] font-bold">আমাদের সাথে চ্যাট করুন</span>
                <MessageCircle size={14} />
            </a>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-100 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[10px] font-bold text-gray-500">
          <div>
            &copy; 2026 উর্বর ফুড
          </div>
          <div className="flex gap-4 items-center flex-wrap justify-center">
             <a href="#" className="hover:text-[#00a651] transition-colors">গোপনীয়তা নীতি</a>
             <a href="#" className="hover:text-[#00a651] transition-colors">শর্তাবলি</a>
             <a href="#" className="hover:text-[#00a651] transition-colors">রিটার্ন নীতি</a>
             <span className="text-gray-300 hidden sm:inline">|</span>
             <a href="#admin" className="hover:text-[#00a651] transition-colors text-slate-600 font-black bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded border border-slate-200 shadow-sm transition-all text-[11px]">অ্যাডমিন প্যানেল</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
