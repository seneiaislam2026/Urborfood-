const fs = require('fs');
let content = fs.readFileSync('src/context/CartContext.tsx', 'utf-8');

// Fix playAddToCartSound
content = content.replace(
    'playNote(1046.50, now + 0.07, 0.38); // C6 (Sweet crisp high note)',
    'playNote(1046.50, now + 0.07, 0.38); // C6 (Sweet crisp high note)\n    \n    // Close context after sound finishes to prevent hardware context limit crash\n    setTimeout(() => {\n      if (ctx.state !== "closed") ctx.close();\n    }, 1000);'
);

// Fix playNotificationSound
content = content.replace(
    'osc2.stop(ctx.currentTime + 0.55);',
    'osc2.stop(ctx.currentTime + 0.55);\n    \n    setTimeout(() => {\n      if (ctx.state !== "closed") ctx.close();\n    }, 1000);'
);

fs.writeFileSync('src/context/CartContext.tsx', content);
