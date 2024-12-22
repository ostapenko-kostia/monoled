'use client'

import { Dialog } from '@/components/ui/dialog'
import { useUpdateProduct } from '@/hooks/useProducts'
import { Category, Product } from '@prisma/client'
import { EditIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Select from 'react-select'

interface Form {
	name: string
	price: number
	images: FileList
	description: string
	categorySlug: string
	info?: Record<string, string>
	modelUrl?: string
	isNew?: boolean
}

interface Props {
	categories: Category[] | undefined
	product: Product
}

export function AdminProductEdit({ categories, product }: Props) {
	const [loadingToastId, setLoadingToastId] = useState('')
	const { register, handleSubmit, setValue, watch } = useForm<Form>({
		defaultValues: {
			categorySlug: product.categorySlug,
			description: product.description,
			info: product.info as Record<string, string>,
			modelUrl: product.modelUrl as string | undefined,
			name: product.name,
			price: product.price,
			isNew: product.isNew as boolean | undefined
		}
	})
	const { mutateAsync: editFunc, isPending, isSuccess, isError } = useUpdateProduct()

	const [key, setKey] = useState('')
	const [value, setValueInput] = useState('')

	const addInfoField = () => {
		if (key.trim() && value.trim()) {
			setValue('info', { ...watch('info'), [key]: value })
			setKey('')
			setValueInput('')
		}
	}

	const edit = async (data: Form) => {
		await editFunc({
			id: product.id,
			data: {
				name: data.name ?? product.name,
				price: data.price ?? product.price,
				images: data.images ?? product.images,
				description: data.description ?? product.description,
				categorySlug: data.categorySlug ?? product.categorySlug,
				info: data.info ?? (product.info as Record<string, string>),
				modelUrl: data.modelUrl ?? product.modelUrl,
				isNew: data.isNew ?? product.isNew
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
				className='mx-auto bg-white rounded-md p-4 w-[400px] h-min flex flex-col gap-4 max-sm:w-[90%]'
				onSubmit={handleSubmit(data => edit(data))}
			>
				<div>
					<label
						htmlFor='images'
						className='flex items-center gap-2'
					>
						Зображення
					</label>
					<input
						className='w-full appearance-none rounded-md border border-[#ccc] bg-white text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='file'
						id='images'
						multiple
						{...register('images')}
					/>
				</div>
				<div className='flex items-start flex-col gap-2'>
					<label
						htmlFor='name'
						className='flex items-center gap-2'
					>
						Назвa
					</label>
					<input
						className='w-full rounded-md border border-[#ccc] bg-white h-10 text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='name'
						placeholder='Товар'
						id='name'
						{...register('name')}
					/>
				</div>

				<div className='flex items-start flex-col gap-2'>
					<label
						htmlFor='price'
						className='flex items-center gap-2'
					>
						Ціна
					</label>
					<input
						className='w-full rounded-md border border-[#ccc] bg-white h-10 text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='price'
						placeholder='1500'
						id='price'
						{...register('price')}
					/>
				</div>

				<div className='flex items-start flex-col gap-2'>
					<label
						htmlFor='categorySlug'
						className='flex items-center gap-2'
					>
						Категорія
					</label>
					<Select
						id='categorySlug'
						options={categories?.map(category => ({
							label: category.name,
							value: category.slug
						}))}
						styles={{
							container: base => ({ ...base, width: '100%' })
						}}
						onChange={handleCategoryChange}
						placeholder='Оберіть категорію'
					/>
				</div>

				<div className='flex items-start flex-col gap-2'>
					<label
						htmlFor='modelUrl'
						className='flex items-center gap-2'
					>
						URL 3D Моделі
					</label>
					<input
						className='w-full rounded-md border border-[#ccc] bg-white h-10 text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='url'
						placeholder='https://example.com/model'
						id='modelUrl'
						{...register('modelUrl')}
					/>
				</div>

				<div className='flex gap-2 items-center'>
					<label
						htmlFor='modelUrl'
						className='flex gap-2'
					>
						Новинка?
					</label>
					<input
						onChange={e => setValue('isNew', e.target.checked)}
						className='ml-3 rounded-md border border-[#ccc] bg-white aspect-square h-5 text-[#333] placeholder:text-[#808080] focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='checkbox'
						placeholder='https://example.com/model'
						id='modelUrl'
					/>
				</div>

				<div>
					<div className='flex flex-col gap-2'>
						<h4 className='text-lg font-medium'>Додаткова інформація:</h4>
						<ul className='list-disc pl-5'>
							{Object.entries(watch('info') ?? {}).map(([key, value]) => (
								<li key={key}>{`${key}: ${value}`}</li>
							))}
						</ul>
					</div>

					<div className='flex gap-2 items-center mt-3'>
						<input
							type='text'
							placeholder='Ключ'
							value={key}
							onChange={e => setKey(e.target.value)}
							className='w-1/2 rounded-md border border-[#ccc] bg-white h-10 text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						/>
						<input
							type='text'
							placeholder='Значення'
							value={value}
							onChange={e => setValueInput(e.target.value)}
							className='w-1/2 rounded-md border border-[#ccc] bg-white h-10 text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						/>
						<button
							type='button'
							onClick={addInfoField}
							className='bg-green-500 text-white rounded-md px-4 py-2'
						>
							Додати
						</button>
					</div>
				</div>

				<div className='flex items-start flex-col gap-2'>
					<label
						htmlFor='description'
						className='flex items-center gap-2'
					>
						Опис <span className='text-red-400'>*</span>
					</label>
					<textarea
						className='w-full rounded-md border border-[#ccc] bg-white min-h-20 max-h-36 resize-y text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						placeholder='1500'
						id='description'
						{...register('description')}
					/>
				</div>

				<button
					type='submit'
					className='bg-foreground text-background w-min px-12 py-2 rounded-md mx-auto hover:bg-[rgba(0,0,0,.8)]'
				>
					Змінити
				</button>
			</form>
		</Dialog>
	)
}
;('')
