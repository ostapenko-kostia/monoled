import type { Product, ProductInfo } from '@prisma/client'

export interface ProductWithInfo extends Product {
	info: ProductInfo[]
}
