import { textsService } from '@/services/texts.service'
import { useMutation } from '@tanstack/react-query'

export function useEditText() {
	return useMutation({
		mutationKey: ['edit text'],
		mutationFn: async (data: { id: number; text: string }) => {
			const res = await textsService.editText(data)
			if (!res?.data) return Promise.reject()
			return res
		}
	})
}
