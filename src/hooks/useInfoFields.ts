import { useState } from 'react'
import { ProductWithInfo } from '@/typing/interfaces'

export const useInfoFields = (initialInfo: ProductWithInfo['info']) => {
	const [info, setInfo] = useState<ProductWithInfo['info']>(initialInfo)

	const addInfoField = (key: string, value: string) => {
		if (key.trim() && value.trim()) {
			setInfo(prev => [
				...prev,
				{ title: key, value: value, order: prev.length + 1 } as ProductWithInfo['info'][0]
			])
		}
	}

	const moveUp = (index: number) => {
		setInfo(prev => {
			const newInfo = [...prev]
			if (index > 0) {
				const temp = newInfo[index]
				newInfo[index] = newInfo[index - 1]
				newInfo[index - 1] = temp

				newInfo.forEach((item, idx) => {
					item.order = idx + 1
				})
			}
			return newInfo
		})
	}

	const moveDown = (index: number) => {
		setInfo(prev => {
			const newInfo = [...prev]
			if (index < prev.length - 1) {
				const temp = newInfo[index]
				newInfo[index] = newInfo[index + 1]
				newInfo[index + 1] = temp

				newInfo.forEach((item, idx) => {
					item.order = idx + 1
				})
			}
			return newInfo
		})
	}

	const deleteInfoField = (index: number) => {
		setInfo(prev => {
			const newInfo = prev.filter((_, i) => i !== index)

			newInfo.forEach((item, idx) => {
				item.order = idx + 1
			})

			return newInfo
		})
	}

	return {
		info,
		addInfoField,
		moveUp,
		moveDown,
		deleteInfoField
	}
}
