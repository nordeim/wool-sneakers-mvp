import { products as data, getProductBySlug as findBySlug, sortProducts as sort, type SortOption } from '@/lib/products'
import type { Product } from '@/types/product'

/**
 * ProductService contract — typed interface for all product queries.
 *
 * Currently backed by a hardcoded in-memory catalog.
 * Swap the implementation (e.g., fetch from API) without
 * changing consumer code.
 */
export interface ProductService {
  getAll(): readonly Product[]
  getBySlug(slug: string): Product | undefined
  sort(list: readonly Product[], by: SortOption): readonly Product[]
}

const productService: ProductService = {
  getAll: () => data,
  getBySlug: (slug) => findBySlug(slug),
  sort: (list, by) => sort(list, by),
}

export { productService }
