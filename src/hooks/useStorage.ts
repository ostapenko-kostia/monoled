import { fileService } from '@/services/files.service'
import { useMutation } from '@tanstack/react-query'

export function useDeleteFile() {
	return useMutation({
		mutationKey: ['delete file'],
		mutationFn: async (file: string) => {
			const res = await fileService.deleteFile(file)
			if (!res?.data) return Promise.reject()
			return res
		}
	})
}

export function useCreateFile() {
	return useMutation({
		mutationKey: ['create file'],
		mutationFn: async (data: { file: FileList; name: string }) => {
			const formData = new FormData()

			formData.append('name', JSON.stringify(data.name))
			formData.append('file', data.file[0])

			const res = await fileService.createFile(formData)
			if (!res?.data) return Promise.reject()
			return res
		}
	})
}
