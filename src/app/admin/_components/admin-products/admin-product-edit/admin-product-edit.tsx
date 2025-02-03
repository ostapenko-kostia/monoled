'use client'

import { Dialog } from '@/components/ui/dialog'
import { useInfoFields } from '@/hooks/useInfoFields'
import { useUpdateProduct } from '@/hooks/useProducts'
import { ProductWithInfo } from '@/typing/interfaces'
import { Category } from '@prisma/client'
import { EditIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { InfoFields } from '../info-fields'
import {
	AdminProductEditImage,
	AdminProductEditCategory,
	AdminProductEditDescription,
	AdminProductEditIsNew,
	AdminProductEditModel,
	AdminProductEditName,
	AdminProductEditPrice,
	AdminProductEditQuantity
} from '.'
import dynamic from 'next/dynamic'

interface Form {
	name?: string
	price?: number
	images: FileList
	description?: string
	categorySlug?: string
	modelUrl?: string
	isNew?: boolean
	quantityLeft?: number
}

interface Props {
	categories: Category[] | undefined
	product: ProductWithInfo
}

export const AdminProductEdit = dynamic(() =>
	Promise.resolve(({ categories, product }: Props) => {
		const [loadingToastId, setLoadingToastId] = useState('')
		const { register, handleSubmit, setValue, watch } = useForm<Form>()
		const { mutateAsync: editFunc, isPending, isSuccess, isError } = useUpdateProduct()

		const { info, addInfoField, moveUp, moveDown, deleteInfoField } = useInfoFields(product.info)

		const edit = async (data: Form) => {
			await editFunc({
				id: product.id,
				data: {
					...data,
					info: info && info.length ? info : undefined
				}
			})
		}

		useEffect(() => {
			if (isPending) {
				const loadingToastId = toast.loading('Триває зміна...')
				setLoadingToastId(loadingToastId)
			}
			if (isSuccess) {
				loadingToastId && toast.dismiss(loadingToastId)
				toast.success('Успішно змінено, оновіть сторінку, щоб побачити зміни!')
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
				title='Змінити інформацію про товар'
				trigger={
					<button>
						<EditIcon />
					</button>
				}
			>
				<form
					className='mx-auto bg-white rounded-md px-4 h-min flex flex-col gap-4 w-[90%]'
					onSubmit={handleSubmit(data => edit(data))}
				>
					<AdminProductEditImage
						product={product}
						register={register}
						watch={watch}
					/>

					<AdminProductEditName
						product={product}
						register={register}
					/>

					<AdminProductEditPrice
						product={product}
						register={register}
					/>

					<AdminProductEditQuantity
						product={product}
						register={register}
					/>

					<AdminProductEditCategory
						categories={categories}
						product={product}
						handleCategoryChange={handleCategoryChange}
					/>

					<AdminProductEditModel
						product={product}
						register={register}
					/>

					<AdminProductEditIsNew
						product={product}
						setValue={setValue}
					/>

					<InfoFields
						addInfoField={addInfoField}
						deleteInfoField={deleteInfoField}
						info={info}
						moveDown={moveDown}
						moveUp={moveUp}
					/>

					<AdminProductEditDescription
						product={product}
						register={register}
					/>

					<button
						type='submit'
						className='bg-foreground text-background w-min px-12 py-2 rounded-md mx-auto hover:bg-[rgba(0,0,0,.8)]'
					>
						Змінити
					</button>
				</form>
			</Dialog>
		)
	})
)
