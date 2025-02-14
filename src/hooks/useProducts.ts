import { productsService } from '@/services/products.service'
import { ProductWithInfo } from '@/typing/interfaces'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useGetProducts = () => {
	return useQuery({
		queryKey: ['products get'],
		queryFn: async () => {
			const res = await productsService.getAllProducts()
			if (!res?.data) return Promise.reject()
			return res.data
		}
	})
}

export const useDeleteProduct = () => {
	return useMutation({
		mutationKey: ['product delete'],
		mutationFn: async ({ id }: { id: number }) => {
			const res = await productsService.deleteProduct(id)
			if (!res?.data) return Promise.reject()
			return res
		}
	})
}

export const useCreateProduct = () => {
	interface Props {
		name: string
		price: number
		images: FileList
		description: string
		categorySlug: string
		modelUrl: string | null
		quantityLeft: number
		info?: ProductWithInfo['info']
		isNew?: boolean | null
	}
	return useMutation({
		mutationKey: ['product create'],
		mutationFn: async (data: Props) => {
			const formData = new FormData()

			Array.from(data.images).forEach(el => {
				formData.append('images', el)
			})
			const dataWithoutImages = Object.entries(data).reduce((acc, [key, value]) => {
				if (key !== 'images') acc[key] = value
				return acc
			}, {} as Record<string, string>)

			formData.append('productInfo', JSON.stringify(dataWithoutImages))

			const res = await productsService.createProduct(formData)
			if (!res?.data) return Promise.reject()
			return res
		}
	})
}

export const useUpdateProduct = () => {
	interface Props {
		name?: string
		price?: number
		images?: FileList
		description?: string
		categorySlug?: string
		info?: ProductWithInfo['info']
		modelUrl?: string | null
		isNew?: boolean | null
		quantityLeft?: number
	}

	return useMutation({
		mutationKey: ['product edit'],
		mutationFn: async ({ id, data }: { id: number; data: Props }) => {
			const formData = new FormData()

			if (data.images) {
				Array.from(data.images).forEach(el => {
					formData.append('images', el)
				})
			}
			const dataForForm = Object.entries(data).reduce((acc, [key, value]) => {
				if (key !== 'images') acc[key] = value
				if (!value && key !== 'isNew') delete acc[key]
				return acc
			}, {} as Record<string, string>)

			formData.append('productInfo', JSON.stringify(dataForForm))

			const res = await productsService.updateProduct(id, formData)
			if (!res?.data) return Promise.reject()
			return res
		}
	})
}

export const useMoveUpProduct = () => {
	return useMutation({
		mutationKey: ['product move up'],
		mutationFn: async (productId: number) => {
			const res = await productsService.moveUp(productId)
			if (!res?.data) return Promise.reject()
			return res
		}
	})
}

export const useMoveDownProduct = () => {
	return useMutation({
		mutationKey: ['product move down'],
		mutationFn: async (productId: number) => {
			const res = await productsService.moveDown(productId)
			if (!res?.data) return Promise.reject()
			return res
		}
	})
}
