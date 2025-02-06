'use client'

import { Dialog } from '@/components/ui/dialog'
import { useEditText } from '@/hooks/useText'
import { TextField } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Props {
	text: TextField
}

interface Form {
	text: string
}

export function AdminEditText({ text }: Props) {
	const [loadingToastId, setLoadingToastId] = useState('')
	const { register, handleSubmit } = useForm<Form>()
	const { mutateAsync: editFunc, isPending, isSuccess, isError } = useEditText()

	useEffect(() => {
		if (isPending) {
			const loadingToastId = toast.loading('Триває зміна...')
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

	const edit = async (data: Form) => {
		await editFunc({
			id: text.id,
			text: data.text ?? undefined
		})
	}

	return (
		<Dialog
			title='Змінити текстове поле'
			trigger={<button className='text-blue-600 hover:text-blue-900'>Редагувати</button>}
		>
			<form
				className='mx-auto bg-white rounded-md p-4 w-[400px] h-min flex flex-col gap-8 max-sm:w-[90%]'
				onSubmit={handleSubmit(data => edit(data))}
			>
				<div className='flex items-start flex-col gap-3'>
					<label
						htmlFor='text'
						className='flex items-center gap-2'
					>
						Назва
					</label>
					<input
						className='w-full rounded-md border border-gray-500 bg-white px-5 py-3 text-sm placeholder:text-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
						type='text'
						required
						placeholder={text.text}
						defaultValue={text.text}
						id='text'
						{...register('text', { required: true })}
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
