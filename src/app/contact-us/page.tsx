import { ContactUsForm } from '@/components/layout/contact-us-form/contact-us-form'
import { textsService } from '@/services/texts.service'
import Image from 'next/image'
import Link from 'next/link'

export default async function ContactUsPage() {
	const texts = (await textsService.getAllTexts())?.data
	const contactUsText = texts?.find(text => text.slug === 'contacts-title')?.text
	const homeText = texts?.find(text => text.slug === 'home-title')?.text
	const title = texts?.find(text => text.slug === 'title')?.text
	const description = texts?.find(text => text.slug === 'contacts-description')?.text

	const imageUrl = texts?.find(text => text.slug === 'contacts-page-image-url')?.text

	return (
		<>
			<header className='flex items-center justify-center py-36 w-full gap-2 flex-col relative text-white'>
				<div
					className='absolute top-0 left-0 inset-0 w-full h-full -z-50 brightness-[.30]'
					style={{
						backgroundImage: "url('/1.avif')",
						backgroundAttachment: 'fixed',
						backgroundPosition: 'center 70%',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						minHeight: '100%'
					}}
				/>

				<h2 className='font-medium text-5xl max-[450px]:text-4xl'>{contactUsText}</h2>
				<p className='text-lg font-semibold max-[450px]:text-base'>
					<Link
						className='underline-offset-[6px] hover:underline'
						href='/'
					>
						{homeText}
					</Link>
					{' > '}
					<span className='font-normal'>{contactUsText}</span>
				</p>
			</header>
			<div className='grid-cols-2 grid gap-10 py-10 max-sm:grid-cols-1'>
				<div className='my-20 container mx-auto max-sm:px-2 min-h-screen'>
					<h1 className='text-5xl mb-10 text-center uppercase font-semibold'>{title}</h1>
					<p className='mb-10 text-center mx-auto w-[90%] text-xl'>{description}</p>
				</div>
				<div className='w-full h-min aspect-square sticky top-5 max-sm:hidden'>
					<div className='relative w-full h-full'>
						<Image
							src={imageUrl && imageUrl.trim().length ? imageUrl : '/placeholder-image.jpg'}
							alt='about'
							className='object-cover'
							fill
							sizes='100%, 100%'
						/>
					</div>
				</div>
			</div>
			<div className='py-20 bg-neutral-100'>
				<ContactUsForm />
			</div>
		</>
	)
}
