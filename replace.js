const fs = require('fs');

const replacements = [
  { file: 'src/pages/ProductLandingPage.tsx', from: 'নিরাপদ খাদ্য সম্ভার', to: 'উর্বর ফুড' },
  { file: 'src/pages/ProductLandingPage.tsx', from: 'Nirapod Khaddo Shomvar', to: 'Urbor Food' },
  { file: 'src/pages/AdminDashboard.tsx', from: 'নিরাপদ খাদ্য সম্ভার', to: 'উর্বর ফুড' },
  { file: 'src/components/ui/TopBannerNotification.tsx', from: 'Nirapod Khaddo Shomvar', to: 'Urbor Food' },
  { file: 'src/components/ui/TopBannerNotification.tsx', from: 'নিরাপদ খাদ্য সম্ভার', to: 'উর্বর ফুড' },
  { file: 'src/components/ui/PriceListModal.tsx', from: 'নিরাপদ খাদ্য সম্ভার', to: 'উর্বর ফুড' },
  { file: 'src/context/CartContext.tsx', from: 'নিরাপদ খাদ্য সম্ভার', to: 'উর্বর ফুড' },
];

for (const rep of replacements) {
  let content = fs.readFileSync(rep.file, 'utf8');
  content = content.replace(new RegExp(rep.from, 'g'), rep.to);
  fs.writeFileSync(rep.file, content);
}
