'use client'

import { Dialog } from '@/components/ui/dialog'
import { useCreateProduct } from '@/hooks/useProducts'
import { Category } from '@prisma/client'
import { PlusCircleIcon } from 'lucide-react'
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
	quantityLeft: number
	info?: Record<string, string>
	modelUrl?: string
	isNew?: boolean
}

interface Props {
	categories: Category[] | undefined
}

export function AdminProductCreate({ categories }: Props) {
	const [loadingToastId, setLoadingToastId] = useState('')
	const { register, handleSubmit, setValue, watch } = useForm<Form>()
	const { mutateAsync: createFunc, isPending, isSuccess, isError } = useCreateProduct()

	const [key, setKey] = useState('')
	const [value, setValueInput] = useState('')

	const addInfoField = () => {
		if (key.trim() && value.trim()) {
			setValue('info', { ...watch('info'), [key]: value })
			setKey('')
			setValueInput('')
		}
	}

	useEffect(() => {
		if (isPending) {
			const loadingToastId = toast.loading('Триває створення...')
			setLoadingToastId(loadingToastId)
		}
		if (isSuccess) {
			loadingToastId && toast.dismiss(loadingToastId)
			toast.success('Успішно створено, оновіть сторінку, щоб побачити зміни!')
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
				className='mx-auto bg-white rounded-md p-4 w-[400px] h-min flex flex-col gap-4 max-sm:w-[90%]'
				onSubmit={handleSubmit(data => createFunc(data))}
			>
				<div>
					<label
						htmlFor='images'
						className='flex items-center gap-2'
					>
						Зображення <span className='text-red-400'>*</span>
					</label>
					<input
						className='w-full appearance-none rounded-md border border-[#ccc] bg-white text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='file'
						required
						id='images'
						multiple
						{...register('images', { required: true })}
					/>
				</div>
				<div className='flex items-start flex-col gap-2'>
					<label
						htmlFor='name'
						className='flex items-center gap-2'
					>
						Назва <span className='text-red-400'>*</span>
					</label>
					<input
						className='w-full rounded-md border border-[#ccc] bg-white h-10 text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='name'
						required
						placeholder='Товар'
						id='name'
						{...register('name', { required: true })}
					/>
				</div>

				<div className='flex items-start flex-col gap-2'>
					<label
						htmlFor='price'
						className='flex items-center gap-2'
					>
						Ціна <span className='text-red-400'>*</span>
					</label>
					<input
						className='w-full rounded-md border border-[#ccc] bg-white h-10 text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='price'
						required
						placeholder='1500'
						id='price'
						{...register('price', { required: true })}
					/>
				</div>

				<div className='flex items-start flex-col gap-2'>
					<label
						htmlFor='quantityLeft'
						className='flex items-center gap-2'
					>
						Кількість товару <span className='text-red-400'>*</span>
					</label>
					<input
						className='w-full rounded-md border border-[#ccc] bg-white h-10 text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='quantityLeft'
						required
						placeholder='10'
						id='quantityLeft'
						{...register('quantityLeft', { required: true })}
					/>
				</div>

				<div className='flex items-start flex-col gap-2'>
					<label
						htmlFor='categorySlug'
						className='flex items-center gap-2'
					>
						Категорія <span className='text-red-400'>*</span>
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
						required
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
						Новинка? <span className='text-red-400'>*</span>
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
						required
						placeholder='1500'
						id='description'
						{...register('description', { required: true })}
					/>
				</div>

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
