import { safeGetItem, safeSetItem, safeRemoveItem } from './utils/storage';
export function updatePWAIcon() {

  const storedLogo = safeGetItem('urbor_logo_url');
  if (!storedLogo) return;

  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw circular mask
    ctx.beginPath();
    ctx.arc(256, 256, 256, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    // Fill white background in case the logo is transparent
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 512, 512);

    // Calculate crop for square
    const size = Math.min(img.width, img.height);
    const x = (img.width - size) / 2;
    const y = (img.height - size) / 2;

    ctx.drawImage(img, x, y, size, size, 0, 0, 512, 512);

    const circleIcon = canvas.toDataURL('image/png');

    // Update Favicons
    let iconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (iconLink) {
        iconLink.href = circleIcon;
        iconLink.type = 'image/png';
    }

    let appleIconLink = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;
    if (appleIconLink) appleIconLink.href = circleIcon;

    // Update Manifest dynamically
    const manifestObj = {
      name: "Urbor Food",
      short_name: "Urbor Food",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#034D35",
      icons: [
        {
          src: circleIcon,
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: circleIcon,
          sizes: "512x512",
          type: "image/png"
        }
      ]
    };
    
    const manifestString = JSON.stringify(manifestObj);
    const manifestUrl = 'data:application/json;charset=utf-8,' + encodeURIComponent(manifestString);
    
    let manifestLink = document.querySelector('link[rel="manifest"]') as HTMLLinkElement;
    if (manifestLink) {
      manifestLink.href = manifestUrl;
    }
  };
  img.src = storedLogo;
}
