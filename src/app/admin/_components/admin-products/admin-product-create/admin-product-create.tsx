'use client'

import { Dialog } from '@/components/ui/dialog'
import { useInfoFields } from '@/hooks/useInfoFields'
import { useCreateProduct } from '@/hooks/useProducts'
import { Category } from '@prisma/client'
import { PlusCircleIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { InfoFields } from '../info-fields'
import { ProductWithInfo } from '@/typing/interfaces'
import {
	AdminProductCreateCategory,
	AdminProductCreateIsNew,
	AdminProductCreatePrice,
	AdminProductCreateDescription,
	AdminProductCreateImage,
	AdminProductCreateModel,
	AdminProductCreateName,
	AdminProductCreateQuantity
} from '.'
import { useQueryClient } from '@tanstack/react-query'

interface Form {
	name: string
	price: number
	images: FileList
	description: string
	categorySlug: string
	quantityLeft: number
	modelUrl: string
	info?: ProductWithInfo['info']
	isNew?: boolean
}

interface Props {
	categories: Category[] | undefined
}

export function AdminProductCreate({ categories }: Props) {
	const [loadingToastId, setLoadingToastId] = useState('')
	const { register, handleSubmit, setValue, watch } = useForm<Form>()
	const queryClient = useQueryClient()
	const { mutateAsync: createFunc, isPending, isSuccess, isError } = useCreateProduct()

	const { info, addInfoField, moveUp, moveDown, deleteInfoField } = useInfoFields([])

	useEffect(() => {
		if (isPending) {
			const loadingToastId = toast.loading('Триває створення...')
			setLoadingToastId(loadingToastId)
		}
		if (isSuccess) {
			loadingToastId && toast.dismiss(loadingToastId)
			queryClient.invalidateQueries({ queryKey: ['products get'] })
		}
		if (isError) {
			loadingToastId && toast.dismiss(loadingToastId)
		}
	}, [isPending, isSuccess, isError])

	const handleCategoryChange = (selectedOption: any) => {
		setValue('categorySlug', selectedOption.value)
	}

	return (
		<Dialog
			title='Створити товар'
			trigger={
				<button className='w-full h-full min-h-56 bg-[rgba(0,0,0,.35)] hover:bg-[rgba(0,0,0,.6)] transition-colors duration-700 rounded-md flex flex-col gap-4 items-center justify-center'>
					<PlusCircleIcon
						size={90}
						stroke='#fff'
					/>
					<h3 className='text-white text-2xl font-medium'>Створити</h3>
				</button>
			}
		>
			<form
				className='mx-auto bg-white rounded-md px-4 h-min flex flex-col gap-4 w-[90%]'
				onSubmit={handleSubmit(data => createFunc({ ...data, info }))}
			>
				<AdminProductCreateImage
					watch={watch}
					register={register}
				/>

				<AdminProductCreateName register={register} />
				<AdminProductCreatePrice register={register} />
				<AdminProductCreateQuantity register={register} />

				<AdminProductCreateCategory
					handleCategoryChange={handleCategoryChange}
					categories={categories}
				/>

				<AdminProductCreateModel register={register} />
				<AdminProductCreateIsNew setValue={setValue} />

				<InfoFields
					addInfoField={addInfoField}
					deleteInfoField={deleteInfoField}
					info={info}
					moveDown={moveDown}
					moveUp={moveUp}
				/>

				<AdminProductCreateDescription register={register} />

				<button
					type='submit'
					className='bg-foreground text-background w-min px-12 py-2 rounded-md mx-auto hover:bg-[rgba(0,0,0,.8)]'
				>
					Створити
				</button>
			</form>
		</Dialog>
	)
}
