import { adminService } from '@/services/admin.service'
import { useMutation } from '@tanstack/react-query'

export function useAdminAuth() {
	return useMutation({
		mutationKey: ['admin auth'],
		mutationFn: async ({ email, password }: { email: string; password: string }) => {
			const res = await adminService.auth(email, password)
			if (!res?.data) return Promise.reject()
			return res
		}
	})
}
