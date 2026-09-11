const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function run() {
  const dirs = [
    './public/logo',
    './public/hero',
    './public/products',
    './public/occasions',
    './public/gallery',
    './public/testimonials',
    './public/about',
    './public/store',
    './public/custom',
    './public/decor'
  ];
  dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

  console.log('Extracting assets...');

  // 1. Logo Emblem (already tested)
  await sharp('./ui/design layouts.png')
    .extract({ left: 35, top: 12, width: 80, height: 86 })
    .toFile('./public/logo/logo-emblem.png');

  // 2. Wear Your Story Script Graphic
  await sharp('./ui/design layouts.png')
    .extract({ left: 860, top: 12, width: 120, height: 95 })
    .toFile('./public/decor/wear-your-story.png');

  // Also larger version from aboutus.png or home.png
  await sharp('./ui/aboutus.png')
    .extract({ left: 810, top: 915, width: 155, height: 42 })
    .toFile('./public/decor/wear-your-story-script.png');

  // 3. Brush stroke, texture, dots, torn edge from design layouts
  await sharp('./ui/design layouts.png').extract({ left: 28, top: 270, width: 150, height: 75 }).toFile('./public/decor/brush-stroke.png');
  await sharp('./ui/design layouts.png').extract({ left: 190, top: 270, width: 150, height: 75 }).toFile('./public/decor/texture-bg.png');
  await sharp('./ui/design layouts.png').extract({ left: 350, top: 270, width: 150, height: 75 }).toFile('./public/decor/dots-pattern.png');
  await sharp('./ui/design layouts.png').extract({ left: 670, top: 270, width: 150, height: 75 }).toFile('./public/decor/torn-edge.png');

  // 4. Products from store.png (1024x1536)
  // Columns: x ~ 248, 435, 622, 809. Width ~ 175
  // Rows:
  // Row 1: y ~ 398, h ~ 152
  // Row 2: y ~ 658, h ~ 152
  // Row 3: y ~ 920, h ~ 152
  const colX = [248, 435, 622, 809];
  const row1Y = 398;
  const row2Y = 658;
  const row3Y = 920;
  const pw = 175;
  const ph = 152;

  await sharp('./ui/store.png').extract({ left: colX[0], top: row1Y, width: pw, height: ph }).toFile('./public/products/good-vibes-only.png');
  await sharp('./ui/store.png').extract({ left: colX[1], top: row1Y, width: pw, height: ph }).toFile('./public/products/adventure-awaits.png');
  await sharp('./ui/store.png').extract({ left: colX[2], top: row1Y, width: pw, height: ph }).toFile('./public/products/born-to-stand-out.png');
  await sharp('./ui/store.png').extract({ left: colX[3], top: row1Y, width: pw, height: ph }).toFile('./public/products/better-together.png');

  await sharp('./ui/store.png').extract({ left: colX[0], top: row2Y, width: pw, height: ph }).toFile('./public/products/just-be-you.png');
  await sharp('./ui/store.png').extract({ left: colX[1], top: row2Y, width: pw, height: ph }).toFile('./public/products/chill-mode.png');
  await sharp('./ui/store.png').extract({ left: colX[2], top: row2Y, width: pw, height: ph }).toFile('./public/products/discipline-creates-freedom.png');
  await sharp('./ui/store.png').extract({ left: colX[3], top: row2Y, width: pw, height: ph }).toFile('./public/products/never-give-up.png');

  await sharp('./ui/store.png').extract({ left: colX[0], top: row3Y, width: pw, height: ph }).toFile('./public/products/team-07.png');
  await sharp('./ui/store.png').extract({ left: colX[1], top: row3Y, width: pw, height: ph }).toFile('./public/products/birthday-king.png');
  await sharp('./ui/store.png').extract({ left: colX[2], top: row3Y, width: pw, height: ph }).toFile('./public/products/college-life.png');
  await sharp('./ui/store.png').extract({ left: colX[3], top: row3Y, width: pw, height: ph }).toFile('./public/products/custom-design.png');

  // Additional designs from customise.png (1024x1536)
  // Row 3 in customise.png has Mental Health, Legends Are Born, Your Logo Here, Friends Forever
  const cRow3Y = 920;
  await sharp('./ui/customise.png').extract({ left: colX[0], top: cRow3Y, width: pw, height: ph }).toFile('./public/products/mental-health.png');
  await sharp('./ui/customise.png').extract({ left: colX[1], top: cRow3Y, width: pw, height: ph }).toFile('./public/products/legends-are-born.png');
  await sharp('./ui/customise.png').extract({ left: colX[2], top: cRow3Y, width: pw, height: ph }).toFile('./public/products/your-logo-here.png');
  await sharp('./ui/customise.png').extract({ left: colX[3], top: cRow3Y, width: pw, height: ph }).toFile('./public/products/friends-forever.png');
  // Smile more is row 2 col 4 in customise.png
  await sharp('./ui/customise.png').extract({ left: colX[3], top: row2Y, width: pw, height: ph }).toFile('./public/products/smile-more.png');

  // 5. Hero Model from home.png (787 x 1998)
  // Home hero is y ~ 50 to 330, x ~ 400 to 787
  await sharp('./ui/home.png')
    .extract({ left: 380, top: 52, width: 400, height: 275 })
    .toFile('./public/hero/home-hero-model.png');

  // 6. Occasions from home.png (787 x 1998)
  // In home.png, Occasions is y ~ 980 to 1090.
  // 5 cards across ~ 710px width
  const occY = 985;
  const occH = 95;
  const occW = 135;
  const occGap = 8;
  const occStart = 38;
  await sharp('./ui/home.png').extract({ left: occStart, top: occY, width: occW, height: occH }).toFile('./public/occasions/birthdays.png');
  await sharp('./ui/home.png').extract({ left: occStart + (occW + occGap) * 1, top: occY, width: occW, height: occH }).toFile('./public/occasions/college-events.png');
  await sharp('./ui/home.png').extract({ left: occStart + (occW + occGap) * 2, top: occY, width: occW, height: occH }).toFile('./public/occasions/functions.png');
  await sharp('./ui/home.png').extract({ left: occStart + (occW + occGap) * 3, top: occY, width: occW, height: occH }).toFile('./public/occasions/teams.png');
  await sharp('./ui/home.png').extract({ left: occStart + (occW + occGap) * 4, top: occY, width: occW, height: occH }).toFile('./public/occasions/businesses.png');

  // 7. Lookbook Gallery from home.png (y ~ 1450 to 1550)
  // 6 cards across
  const galY = 1450;
  const galH = 100;
  const galW = 112;
  const galGap = 8;
  const galStart = 38;
  for (let i = 0; i < 6; i++) {
    await sharp('./ui/home.png')
      .extract({ left: galStart + i * (galW + galGap), top: galY, width: galW, height: galH })
      .toFile(`./public/gallery/lookbook-${i + 1}.png`);
  }

  // 8. Testimonials avatars from home.png (y ~ 1625, x ~ 48, 290, 532)
  await sharp('./ui/home.png').extract({ left: 46, top: 1625, width: 44, height: 44 }).toFile('./public/testimonials/avatar-1.png');
  await sharp('./ui/home.png').extract({ left: 288, top: 1625, width: 44, height: 44 }).toFile('./public/testimonials/avatar-2.png');
  await sharp('./ui/home.png').extract({ left: 530, top: 1625, width: 44, height: 44 }).toFile('./public/testimonials/avatar-3.png');

  // 9. Storefront & Map from contactus.png
  await sharp('./ui/contactus.png')
    .extract({ left: 680, top: 738, width: 310, height: 228 })
    .toFile('./public/store/storefront.png');

  await sharp('./ui/contactus.png')
    .extract({ left: 430, top: 485, width: 555, height: 235 })
    .toFile('./public/store/map-preview.png');

  // 10. Custom Printing visuals from design.png
  // Hero right visual (ANY NAME 10 + Mockup)
  await sharp('./ui/design.png')
    .extract({ left: 450, top: 70, width: 520, height: 230 })
    .toFile('./public/hero/custom-hero-visual.png');

  // Customizer mockups:
  // Front T-shirt preview
  await sharp('./ui/design.png')
    .extract({ left: 275, top: 388, width: 375, height: 320 })
    .toFile('./public/custom/tshirt-front-base.png');

  // 4 angle thumbnails: Front, Back, Left, Right
  await sharp('./ui/design.png').extract({ left: 305, top: 735, width: 66, height: 60 }).toFile('./public/custom/angle-front.png');
  await sharp('./ui/design.png').extract({ left: 385, top: 735, width: 66, height: 60 }).toFile('./public/custom/angle-back.png');
  await sharp('./ui/design.png').extract({ left: 465, top: 735, width: 66, height: 60 }).toFile('./public/custom/angle-left.png');
  await sharp('./ui/design.png').extract({ left: 545, top: 735, width: 66, height: 60 }).toFile('./public/custom/angle-right.png');

  // 11. About Us visuals from aboutus.png
  // Video card thumbnail
  await sharp('./ui/aboutus.png')
    .extract({ left: 400, top: 325, width: 385, height: 250 })
    .toFile('./public/about/video-story-thumb.png');

  // Why choose us 3-tshirts photo
  await sharp('./ui/aboutus.png')
    .extract({ left: 300, top: 865, width: 405, height: 290 })
    .toFile('./public/about/why-choose-tshirts.png');

  // Embroidered tag badge from about hero
  await sharp('./ui/aboutus.png')
    .extract({ left: 590, top: 95, width: 230, height: 195 })
    .toFile('./public/about/about-hero-badge.png');

  // 12. Store Hero right t-shirt visual from store.png
  await sharp('./ui/store.png')
    .extract({ left: 475, top: 85, width: 500, height: 165 })
    .toFile('./public/hero/store-hero-visual.png');

  // 13. Designs Hero right visual from customise.png
  await sharp('./ui/customise.png')
    .extract({ left: 480, top: 85, width: 500, height: 165 })
    .toFile('./public/hero/designs-hero-visual.png');

  // 14. Contact Hero visual from contactus.png
  await sharp('./ui/contactus.png')
    .extract({ left: 570, top: 80, width: 400, height: 220 })
    .toFile('./public/hero/contact-hero-visual.png');

  console.log('All assets successfully extracted!');
}

run().catch(err => {
  console.error('Error extracting assets:', err);
  process.exit(1);
});
