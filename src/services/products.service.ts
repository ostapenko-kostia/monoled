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

	async deleteProduct(id: number) {
		return await api.delete(`/products/delete/${id}`)
	}

	async createProduct(formData: FormData) {
		return await api.post('/products/create', formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}

	async updateProduct(id: number, formData: FormData) {
		return await api.put(`/products/edit/${id}`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}
}

export const productsService = new ProductsService()
