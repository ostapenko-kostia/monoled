'use client'

import { useMoveDownProduct } from '@/hooks/useProducts'
import { ChevronDownIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
	productId: number
}

export function AdminProductMoveDown({ productId }: Props) {
	const [loadingToastId, setLoadingToastId] = useState('')
	const { mutateAsync: moveDown, isPending, isSuccess, isError } = useMoveDownProduct()

	useEffect(() => {
		if (isPending) {
			const loadingToastId = toast.loading('Зачекайте...')
			setLoadingToastId(loadingToastId)
		}
		if (isSuccess) {
			loadingToastId && loadingToastId && toast.dismiss(loadingToastId)
			window.location.reload()
		}

		if (isError) {
			loadingToastId && loadingToastId && toast.dismiss(loadingToastId)
		}
	}, [isPending, isSuccess, isError])

	return (
		<button onClick={() => moveDown(productId)}>
			<ChevronDownIcon />
		</button>
	)
}
