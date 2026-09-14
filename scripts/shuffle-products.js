const fs = require('fs');

const content = fs.readFileSync('data/products.ts', 'utf8');

const match = content.match(/export const products: Product\[\] = (\[[\s\S]*?\]);\s*$/);
if (!match) {
  console.error('Could not find products array');
  process.exit(1);
}

const evalStr = 'return ' + match[1];
const items = new Function(evalStr)();
console.log('Total products:', items.length);

function shuffle(array, seed = 74619) {
  let m = array.length, t, i;
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  while (m) {
    i = Math.floor(rand() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

const shuffled = shuffle([...items]);

const header = `export interface Product {
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

export const products: Product[] = ${JSON.stringify(shuffled, null, 2)};
`;

fs.writeFileSync('data/products.ts', header, 'utf8');
console.log('Successfully wrote randomized products to data/products.ts');
