import { slideService } from '@/services/slides.service'
import { useMutation } from '@tanstack/react-query'

export function useDeleteSlide() {
	return useMutation({
		mutationKey: ['slide delete'],
		mutationFn: async (id: number) => {
			const res = await slideService.deleteSlide(id)
			if (!res?.data) return Promise.reject()
			return res
		}
	})
}
