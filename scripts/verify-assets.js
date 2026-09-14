const fs = require('fs');
const path = require('path');

// Sync assets from assets/ to public/ for all existing assets
const assetDir = path.join(__dirname, '..', 'assets');
const publicDir = path.join(__dirname, '..', 'public');

// List of all subfolders to sync
const subfolders = ['chetogerys', 'flags', 'kanduvas', 'kurthas', 'newcollection', 'tshirsts'];

console.log('=== Checking files in assets/ ===');

function getAllFiles(dir, prefix = '') {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const rel = path.join(prefix, file);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(getAllFiles(full, rel));
    } else {
      results.push(rel.replace(/\\/g, '/'));
    }
  });
  return results;
}

const assetsList = getAllFiles(assetDir);
console.log('Total files in assets/:', assetsList.length);
assetsList.forEach(a => console.log('Asset:', a));

// Clean up public/ files that were removed from assets
console.log('\n=== Checking public/ for removed assets ===');
// For example, if assets/newcollection/7.png does not exist, remove public/newcollection/7.png
const publicNewCol = path.join(publicDir, 'newcollection');
if (fs.existsSync(publicNewCol)) {
  fs.readdirSync(publicNewCol).forEach(f => {
    if (!fs.existsSync(path.join(assetDir, 'newcollection', f))) {
      console.log('Removing deleted asset from public/newcollection:', f);
      fs.unlinkSync(path.join(publicNewCol, f));
      if (fs.existsSync(path.join(publicDir, 'assets', 'newcollection', f))) {
        fs.unlinkSync(path.join(publicDir, 'assets', 'newcollection', f));
      }
    }
  });
}

// Check public/tshirts
const publicTshirts = path.join(publicDir, 'tshirts');
if (fs.existsSync(publicTshirts)) {
  fs.readdirSync(publicTshirts).forEach(f => {
    if (!fs.existsSync(path.join(assetDir, 'tshirsts', f))) {
      console.log('Removing deleted asset from public/tshirts:', f);
      fs.unlinkSync(path.join(publicTshirts, f));
      if (fs.existsSync(path.join(publicDir, 'assets', 'tshirts', f))) {
        fs.unlinkSync(path.join(publicDir, 'assets', 'tshirts', f));
      }
    }
  });
}

console.log('\n=== Checking products list against remaining assets ===');
const productsFile = path.join(__dirname, '..', 'data', 'products.ts');
const prodContent = fs.readFileSync(productsFile, 'utf8');
const match = prodContent.match(/export const products: Product\[\] = (\[[\s\S]*?\]);\s*$/);
const products = new Function('return ' + match[1])();

const validProducts = [];
const removedProducts = [];

products.forEach(p => {
  let exists = true;
  if (p.image.startsWith('/newcollection/')) {
    const f = p.image.replace('/newcollection/', '');
    if (!fs.existsSync(path.join(assetDir, 'newcollection', f))) exists = false;
  } else if (p.image.startsWith('/tshirts/')) {
    const f = p.image.replace('/tshirts/', '');
    if (!fs.existsSync(path.join(assetDir, 'tshirsts', f))) exists = false;
  } else if (p.image.startsWith('/kurthas/')) {
    const f = p.image.replace('/kurthas/', '');
    if (!fs.existsSync(path.join(assetDir, 'kurthas', f))) exists = false;
  } else if (p.image.startsWith('/kanduvas/')) {
    const f = p.image.replace('/kanduvas/', '');
    if (!fs.existsSync(path.join(assetDir, 'kanduvas', f))) exists = false;
  } else if (p.image.startsWith('/flags/')) {
    const f = p.image.replace('/flags/', '');
    if (!fs.existsSync(path.join(assetDir, 'flags', f))) exists = false;
  }

  if (exists) {
    validProducts.push(p);
  } else {
    removedProducts.push(p);
  }
});

console.log('Removed products count:', removedProducts.length);
removedProducts.forEach(p => console.log('Removed product:', p.id, p.name, p.image));
console.log('Valid products count:', validProducts.length);

const outHeader = `export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  image: string;
  colors: string[];
  sizes: string[];
  isTrending?: boolean;
  isCustom?: boolean;
  isPopular?: boolean;
  rating: number;
  reviewsCount: number;
  description: string;
  designStyle?: "Graphic" | "Text Only" | "Illustration" | "Vintage" | "Minimal";
}

export const products: Product[] = ${JSON.stringify(validProducts, null, 2)};
`;

fs.writeFileSync(productsFile, outHeader, 'utf8');
console.log('Successfully updated data/products.ts with only available asset products!');
