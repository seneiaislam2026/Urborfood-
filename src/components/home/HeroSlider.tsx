import { ArrowRight } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export default function HeroSlider() {
  const { setActiveCategory, heroBannerUrl } = useUI();
  
  return (
    <div className="container mx-auto px-4 py-3 max-w-7xl ">
      <div className="relative rounded-[24px] overflow-hidden bg-gradient-to-r from-[#eef1e6] to-[#e4e9d7] shadow-sm border border-[#e4e9d7]/50 h-[180px] sm:h-[220px] md:h-[260px]">
        <img 
          src={heroBannerUrl} 
          alt="দেশী ফল, তাজা সবজি ও স্বাস্থ্যকর গ্রোসারি" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* We can remove the text if they just upload a full banner image, or keep a subtle gradient if needed. But usually custom banners have their own text. Let's make the gradient very subtle or remove text to let the banner shine, or keep the existing text if no custom banner. Actually, let's just make the image take full space without the multiply blend, so user can upload their own designed banner. */}
      </div>
    </div>
  );
}
