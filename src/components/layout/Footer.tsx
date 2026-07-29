import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin, MessageCircle, Clock } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export default function Footer() {
  const { logoUrl } = useUI();

  return (
    <footer className="bg-white border-t border-gray-100 text-slate-800 pt-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-1.5 mb-4">
                <div className="w-6 h-6 rounded-md overflow-hidden bg-white flex items-center justify-center border border-slate-100 shadow-sm">
                  <img src={logoUrl} alt="Urbor Food Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-xl font-black text-[#00a651] tracking-tight">উর্বর ফুড</span>
            </div>
            <p className="text-[11px] text-gray-500 font-bold mb-6 leading-relaxed max-w-[260px]">
              উর্বর ফুড একটি বিশ্বস্ত খাদ্য ব্র্যান্ড, যার লক্ষ্য প্রান্তিক কৃষক ও নির্ভরযোগ্য উৎপাদকদের কাছ থেকে সংগ্রহ করা নিরাপদ, বিশুদ্ধ ও মানসম্মত খাদ্যপণ্য প্রতিটি পরিবারের কাছে পৌঁছে দেওয়া।
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
             
          </div>
        </div>
      </div>
    </footer>
  );
}
