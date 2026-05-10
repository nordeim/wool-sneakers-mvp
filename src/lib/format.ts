const sgdFormatter = new Intl.NumberFormat('en-SG', {
  style: 'currency',
  currency: 'SGD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export function formatPrice(cents: number): string {
  return sgdFormatter.format(cents / 100)
}
