const fs = require('fs');
let content = fs.readFileSync('src/components/layout/Layout.tsx', 'utf-8');

content = content.replace("useState<'store' | 'admin' | 'landing' | 'login'>(", "useState<'store' | 'admin' | 'landing' | 'login' | 'tracking'>(");

content = content.replace("if (window.location.hash === '#admin') return 'admin';", "if (window.location.hash === '#admin') return 'admin';\n    if (window.location.hash === '#tracking') return 'tracking';");

content = content.replace("} else if (window.location.hash === '#admin') {", "} else if (window.location.hash === '#tracking') {\n        setCurrentView('tracking');\n        setLandingProductId(null);\n      } else if (window.location.hash === '#admin') {");

const trackingViewCode = `      ) : currentView === 'tracking' ? (
        <>
          <Helmet>
            <title>অর্ডার ট্র্যাকিং | Urbor Food</title>
          </Helmet>
          <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-slate-50"><Loader2 className="w-8 h-8 text-emerald-600 animate-spin" /></div>}>
            <OrderTrackingPage />
          </Suspense>
        </>
      ) : (`;

content = content.replace('      ) : (', trackingViewCode);

fs.writeFileSync('src/components/layout/Layout.tsx', content);
