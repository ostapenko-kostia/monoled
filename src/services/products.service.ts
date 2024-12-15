import { Product } from '@prisma/client'
import { api } from './axios'

class ProductsService {
	async getAllProducts() {
		try {
			const res = await api.get<Product[]>('/products/all')
			if (res.status != 200) throw new Error('Помилка при отриманні товарів')
			return res
		} catch {}
	}
}

export const productsService = new ProductsService()
