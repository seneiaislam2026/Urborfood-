const fs = require('fs');

let content = fs.readFileSync('src/pages/OrderTrackingPage.tsx', 'utf-8');

// Replace outer divs to be a full page layout
const oldReturn = `  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-10">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={() => setIsOrderTrackingOpen(false)}
      />

      {/* Modal Container */}
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl flex flex-col relative z-10 animate-in zoom-in-95 duration-300 shadow-2xl overflow-hidden max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >`;

const newReturn = `  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[100px]" />

      <button 
        onClick={() => window.location.hash = ''}
        className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-slate-500 hover:text-emerald-700 font-bold text-sm bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 transition-all active:scale-95 z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        হোম পেজ
      </button>

      {/* Main Container */}
      <div 
        className="bg-white rounded-[2rem] w-full max-w-2xl flex flex-col relative z-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100/60 overflow-hidden min-h-[600px]"
      >`;

content = content.replace(oldReturn, newReturn);

const closeButtonRegex = /<button[\s\S]*?onClick=\{\(\) => setIsOrderTrackingOpen\(false\)\}[\s\S]*?<\/button>/;
content = content.replace(closeButtonRegex, '');

fs.writeFileSync('src/pages/OrderTrackingPage.tsx', content);
