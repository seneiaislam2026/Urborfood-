import { Leaf, Scissors, Truck, CircleDollarSign } from 'lucide-react';

export default function Features() {
  const features = [
    { 
      icon: <Leaf size={22} className="text-[#00a651]" />, 
      title: "খামার থেকে সরাসরি", 
      desc: "কৃষকের থেকে সংগ্রহ, কোনো মধ্যস্বত্বভোগী নয়",
      iconBg: "bg-[#eaf5ed]"
    },
    { 
      icon: <Scissors size={22} className="text-[#009688]" />, 
      title: "পরিষ্কার ও কাটা", 
      desc: "অর্ডার অনুযায়ী স্বাস্থ্যসম্মতভাবে প্রস্তুত",
      iconBg: "bg-[#e6f4f1]"
    },
    { 
      icon: <Truck size={22} className="text-[#ff9800]" />, 
      title: "দ্রুত ডেলিভারি", 
      desc: "নির্দিষ্ট সময়ে আপনার ঠিকানায় পৌঁছে দেই",
      iconBg: "bg-[#fff3e0]"
    },
    { 
      icon: <CircleDollarSign size={22} className="text-[#fbc02d]" />, 
      title: "ন্যায্য দাম", 
      desc: "খাঁটি পণ্য, বাড়তি খরচ ছাড়া",
      iconBg: "bg-[#fff9c4]"
    },
  ];

  return (
    <div className="container mx-auto px-4 max-w-7xl mb-8 mt-6 select-none">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col bg-white border border-gray-100 p-5 rounded-xl shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${f.iconBg}`}>
              {f.icon}
            </div>
            <h4 className="text-[14px] font-black text-gray-900 mb-1">{f.title}</h4>
            <p className="text-[11px] font-medium text-gray-500 leading-tight">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
