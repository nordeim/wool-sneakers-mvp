export type ProductTag = 'Best Seller' | 'New' | 'Premium' | 'SG Exclusive'

export type ProductCategory = 'runner' | 'high-top' | 'slip-on' | 'mid-top'

export interface ProductColor {
  readonly name: string
  readonly hex: string
}

export interface ProductSize {
  readonly eu: number
  readonly label: string
  readonly inStock: boolean
}

export interface Product {
  readonly id: string
  readonly slug: string
  readonly name: string
  readonly description: string
  readonly longDescription: string
  readonly price: number
  readonly category: ProductCategory
  readonly colors: readonly ProductColor[]
  readonly sizes: readonly ProductSize[]
  readonly gradient: string
  readonly svgAccentColor: string
  readonly tag: ProductTag | null
  readonly inStock: boolean
  readonly features: readonly string[]
  readonly careInstructions: readonly string[]
}
