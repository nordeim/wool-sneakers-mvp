import type { Product } from '@/types/product'

export const products: readonly Product[] = [
  {
    id: '1',
    slug: 'merino-runner',
    name: 'The Merino Runner',
    description: 'Classic low-top in natural oat',
    longDescription:
      'Our signature sneaker. The Merino Runner combines a low-top silhouette with our Wool-Air™ knit upper, creating a sneaker that breathes with you through every step of your day. From morning commute to evening stroll.',
    price: 18900,
    category: 'runner',
    colors: [
      { name: 'Natural Oat', hex: '#E0D4C2' },
      { name: 'Foggy Gray', hex: '#C5C0B8' },
      { name: 'Charcoal', hex: '#3D3835' },
    ],
    sizes: [
      { eu: 36, label: 'EU 36', inStock: true },
      { eu: 37, label: 'EU 37', inStock: true },
      { eu: 38, label: 'EU 38', inStock: true },
      { eu: 39, label: 'EU 39', inStock: true },
      { eu: 40, label: 'EU 40', inStock: true },
      { eu: 41, label: 'EU 41', inStock: true },
      { eu: 42, label: 'EU 42', inStock: false },
      { eu: 43, label: 'EU 43', inStock: true },
      { eu: 44, label: 'EU 44', inStock: true },
      { eu: 45, label: 'EU 45', inStock: true },
      { eu: 46, label: 'EU 46', inStock: true },
    ],
    gradient: 'linear-gradient(145deg, #EDE5D8 0%, #D4C4B0 50%, #C5C0B8 100%)',
    svgAccentColor: '#3D3835',
    tag: 'Best Seller',
    inStock: true,
    features: [
      'Wool-Air™ knit upper',
      'Recycled foam insole',
      'Natural rubber outsole',
      'Machine washable',
    ],
    careInstructions: [
      'Remove insole before washing',
      'Machine wash cold, gentle cycle',
      'Air dry overnight',
      'Do not tumble dry',
    ],
  },
  {
    id: '2',
    slug: 'urban-knit',
    name: 'The Urban Knit',
    description: 'Mid-top in foggy gray',
    longDescription:
      'Elevated street style meets wool innovation. The Urban Knit sits higher on the ankle with a structured silhouette that holds its shape from boardroom to bar.',
    price: 21900,
    category: 'mid-top',
    colors: [
      { name: 'Foggy Gray', hex: '#D8D4CE' },
      { name: 'Warm Stone', hex: '#B5AFA9' },
      { name: 'Dark Wool', hex: '#6B6460' },
    ],
    sizes: [
      { eu: 36, label: 'EU 36', inStock: true },
      { eu: 37, label: 'EU 37', inStock: true },
      { eu: 38, label: 'EU 38', inStock: true },
      { eu: 39, label: 'EU 39', inStock: false },
      { eu: 40, label: 'EU 40', inStock: true },
      { eu: 41, label: 'EU 41', inStock: true },
      { eu: 42, label: 'EU 42', inStock: true },
      { eu: 43, label: 'EU 43', inStock: true },
      { eu: 44, label: 'EU 44', inStock: true },
      { eu: 45, label: 'EU 45', inStock: false },
      { eu: 46, label: 'EU 46', inStock: true },
    ],
    gradient: 'linear-gradient(145deg, #D8D4CE 0%, #A8A29E 50%, #8C8580 100%)',
    svgAccentColor: '#3D3835',
    tag: 'New',
    inStock: true,
    features: [
      'Mid-top ankle support',
      'Wool-Air™ knit upper',
      'Padded collar',
      'Grip-flex outsole',
    ],
    careInstructions: [
      'Spot clean with damp cloth',
      'Machine wash cold if needed',
      'Air dry only',
      'Reshape while damp',
    ],
  },
  {
    id: '3',
    slug: 'the-breeze',
    name: 'The Breeze',
    description: 'Slip-on in warm white',
    longDescription:
      "Effortless. The Breeze slips on and disappears — in the best way. Its minimalist construction and elastic gore make it the ultimate grab-and-go sneaker for the relentlessly casual.",
    price: 16900,
    category: 'slip-on',
    colors: [
      { name: 'Warm White', hex: '#FDFBF8' },
      { name: 'Soft Oat', hex: '#F5F0E8' },
      { name: 'Sand', hex: '#D4C4B0' },
    ],
    sizes: [
      { eu: 36, label: 'EU 36', inStock: true },
      { eu: 37, label: 'EU 37', inStock: true },
      { eu: 38, label: 'EU 38', inStock: true },
      { eu: 39, label: 'EU 39', inStock: true },
      { eu: 40, label: 'EU 40', inStock: true },
      { eu: 41, label: 'EU 41', inStock: true },
      { eu: 42, label: 'EU 42', inStock: true },
      { eu: 43, label: 'EU 43', inStock: true },
      { eu: 44, label: 'EU 44', inStock: true },
      { eu: 45, label: 'EU 45', inStock: true },
      { eu: 46, label: 'EU 46', inStock: true },
    ],
    gradient: 'linear-gradient(145deg, #FDFBF8 0%, #F5F0E8 50%, #EDE5D8 100%)',
    svgAccentColor: '#8C8580',
    tag: null,
    inStock: true,
    features: [
      'Slip-on elastic gore',
      'Ultralight merino knit',
      'Flexible outsole',
      'No-tie design',
    ],
    careInstructions: [
      'Machine wash cold',
      'Gentle cycle only',
      'Air dry overnight',
      'Do not bleach',
    ],
  },
  {
    id: '4',
    slug: 'the-wanderer',
    name: 'The Wanderer',
    description: 'High-top in charcoal wool',
    longDescription:
      'For those who walk further. The Wanderer is our premium high-top, built with double-layered merino and a reinforced heel counter. Adventure-ready, city-approved.',
    price: 23900,
    category: 'high-top',
    colors: [
      { name: 'Charcoal', hex: '#524C48' },
      { name: 'Deep Wool', hex: '#3D3835' },
      { name: 'Storm Gray', hex: '#6B6460' },
    ],
    sizes: [
      { eu: 38, label: 'EU 38', inStock: true },
      { eu: 39, label: 'EU 39', inStock: true },
      { eu: 40, label: 'EU 40', inStock: true },
      { eu: 41, label: 'EU 41', inStock: true },
      { eu: 42, label: 'EU 42', inStock: true },
      { eu: 43, label: 'EU 43', inStock: true },
      { eu: 44, label: 'EU 44', inStock: true },
      { eu: 45, label: 'EU 45', inStock: true },
      { eu: 46, label: 'EU 46', inStock: true },
    ],
    gradient: 'linear-gradient(145deg, #6B6460 0%, #524C48 50%, #3D3835 100%)',
    svgAccentColor: '#F7F4F0',
    tag: 'Premium',
    inStock: true,
    features: [
      'Double-layered merino',
      'Reinforced heel counter',
      'High-traction outsole',
      'Premium leather trim',
    ],
    careInstructions: [
      'Spot clean recommended',
      'Use wool-safe detergent',
      'Air dry only',
      'Condition leather trim monthly',
    ],
  },
  {
    id: '5',
    slug: 'the-daily',
    name: 'The Daily',
    description: 'Minimalist in cream',
    longDescription:
      'The everyday essential, distilled to its purest form. The Daily is our most stripped-back sneaker — clean lines, no excess, just merino comfort and quiet style.',
    price: 17900,
    category: 'runner',
    colors: [
      { name: 'Cream', hex: '#F5F0E8' },
      { name: 'Light Oat', hex: '#EDE5D8' },
      { name: 'Honey', hex: '#C5B49A' },
    ],
    sizes: [
      { eu: 36, label: 'EU 36', inStock: true },
      { eu: 37, label: 'EU 37', inStock: true },
      { eu: 38, label: 'EU 38', inStock: true },
      { eu: 39, label: 'EU 39', inStock: true },
      { eu: 40, label: 'EU 40', inStock: true },
      { eu: 41, label: 'EU 41', inStock: true },
      { eu: 42, label: 'EU 42', inStock: true },
      { eu: 43, label: 'EU 43', inStock: true },
      { eu: 44, label: 'EU 44', inStock: true },
      { eu: 45, label: 'EU 45', inStock: true },
      { eu: 46, label: 'EU 46', inStock: false },
    ],
    gradient: 'linear-gradient(145deg, #F5F0E8 0%, #EDE5D8 50%, #E0D4C2 100%)',
    svgAccentColor: '#6B6460',
    tag: null,
    inStock: true,
    features: [
      'Minimalist construction',
      'Single-layer merino',
      'Lightweight EVA midsole',
      'Flat-knit design',
    ],
    careInstructions: [
      'Machine wash cold',
      'Gentle cycle',
      'Air dry flat',
      'Do not iron',
    ],
  },
  {
    id: '6',
    slug: 'the-tropical',
    name: 'The Tropical',
    description: 'Breathable mesh-wool in sand',
    longDescription:
      "Engineered specifically for equatorial climates. The Tropical features our proprietary mesh-wool blend that maximises airflow while maintaining wool's natural moisture management.",
    price: 19900,
    category: 'runner',
    colors: [
      { name: 'Sand', hex: '#E0D4C2' },
      { name: 'Desert', hex: '#C5B49A' },
      { name: 'Driftwood', hex: '#8C8580' },
    ],
    sizes: [
      { eu: 36, label: 'EU 36', inStock: true },
      { eu: 37, label: 'EU 37', inStock: true },
      { eu: 38, label: 'EU 38', inStock: true },
      { eu: 39, label: 'EU 39', inStock: true },
      { eu: 40, label: 'EU 40', inStock: true },
      { eu: 41, label: 'EU 41', inStock: true },
      { eu: 42, label: 'EU 42', inStock: true },
      { eu: 43, label: 'EU 43', inStock: true },
      { eu: 44, label: 'EU 44', inStock: false },
      { eu: 45, label: 'EU 45', inStock: true },
      { eu: 46, label: 'EU 46', inStock: true },
    ],
    gradient: 'linear-gradient(145deg, #E0D4C2 0%, #C5B49A 50%, #B5A288 100%)',
    svgAccentColor: '#3D3835',
    tag: 'SG Exclusive',
    inStock: true,
    features: [
      'Mesh-wool hybrid upper',
      'Enhanced ventilation zones',
      'Cool-touch insole',
      'Quick-dry construction',
    ],
    careInstructions: [
      'Machine wash cold',
      'Fast spin cycle ok',
      'Air dry in shade',
      'Dries in 4-6 hours',
    ],
  },
] as const satisfies readonly Product[]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name'

export function sortProducts(
  items: readonly Product[],
  sortBy: SortOption
): readonly Product[] {
  const sorted = [...items]
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return sorted
  }
}
