'use client'

import styles from './styles.module.scss'
import cn from 'clsx'
import { useForm } from 'react-hook-form'

interface Form {
	firstName: string
	lastName: string
	tel: string
	companyName: string
	country: string
	city: string
	email: string
	message: string
}

export function ContactUsForm() {
	const { register, handleSubmit } = useForm<Form>()

	const sendMessage = (data: Form) => {
		console.log(data)
	}

	return (
		<div>
			<h2 className='text-3xl text-center'>Зв'язатися з нами</h2>
			<form
				className='w-[600px] max-sm:w-[95%] mx-auto mt-10 flex flex-col gap-4 items-center'
				onSubmit={handleSubmit(sendMessage)}
			>
				<div className='grid grid-cols-2 gap-x-6 gap-y-4 w-full mx-auto place-items-center max-sm:grid-cols-1'>
					<div className={cn('flex flex-col items-start gap-2 w-full', styles.inputParent)}>
						<label htmlFor='first-name'>Ім'я</label>
						<input
							{...register('firstName', { required: true })}
							required
							type='text'
							placeholder='John'
							id='first-name'
						/>
					</div>
					<div className={cn('flex flex-col items-start gap-2 w-full', styles.inputParent)}>
						<label htmlFor='last-name'>Прізвище</label>
						<input
							{...register('lastName', { required: true })}
							required
							type='text'
							placeholder='Doe'
							id='last-name'
						/>
					</div>
					<div className={cn('flex flex-col items-start gap-2 w-full', styles.inputParent)}>
						<label htmlFor='tel'>Номер телефону</label>
						<input
							{...register('tel', { required: true })}
							required
							type='tel'
							placeholder='+38012345678'
							id='tel'
						/>
					</div>
					<div className={cn('flex flex-col items-start gap-2 w-full', styles.inputParent)}>
						<label htmlFor='company-name'>Назва компанії</label>
						<input
							{...register('companyName', { required: true })}
							required
							type='text'
							placeholder='123'
							id='company-name'
						/>
					</div>
					<div className={cn('flex flex-col items-start gap-2 w-full', styles.inputParent)}>
						<label htmlFor='country'>Країна</label>

						<input
							type='text'
							{...register('country', { required: true })}
							required
							placeholder='Ukraine'
							id='country'
						/>
					</div>
					<div className={cn('flex flex-col items-start gap-2 w-full', styles.inputParent)}>
						<label htmlFor='first-name'>Місто</label>
						<input
							type='text'
							{...register('city', { required: true })}
							required
							placeholder='Kyiv'
							id='city'
						/>
					</div>
				</div>
				<div className={cn('flex flex-col items-start gap-2 w-full', styles.inputParent)}>
					<label htmlFor='email'>Електронна пошта</label>
					<input
						type='email'
						{...register('email', { required: true })}
						required
						placeholder='123@gmail.com'
						id='email'
					/>
				</div>
				<div className={cn('flex flex-col items-start gap-2 w-full', styles.inputParent)}>
					<label htmlFor='message'>Повідомлення</label>
					<textarea
						placeholder='123...'
						id='message'
						{...register('message', { required: true })}
						required
						className='resize-y w-full min-h-[150px] max-h-[300px]'
					/>
				</div>
				<button
					type='submit'
					className='w-[200px] max-sm:w-full h-12 bg-foreground text-background rounded-lg'
				>
					Відправити
				</button>
			</form>
		</div>
	)
}