import { ISortingMethod } from '@/app/shop/shop.types'
import { Category, Product } from '@prisma/client'

interface Filters {
	category: Category['slug']
	sortingMethodId: ISortingMethod['id']
}

export const useFilterProducts = (
	products: Product[] | undefined,
	{ category, sortingMethodId }: Filters
): Product[] | undefined => {
	const filteredProducts = products?.filter(product =>
		category.length ? product.categorySlug === category : product
	)
  
	let sortedProducts = filteredProducts
	switch (sortingMethodId) {
		case 1:
			sortedProducts = filteredProducts
			break
		case 2:
			sortedProducts = filteredProducts?.sort((a, b) => a.price - b.price)
			break
		case 3:
			sortedProducts = filteredProducts?.sort((a, b) => b.price - a.price)
			break
	}

	return sortedProducts
}
