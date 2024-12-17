import { ContactUsForm } from '@/components/layout/contact-us-form/contact-us-form'
import Link from 'next/link'

export default function ContactUsPage() {
	return (
		<>
			<header className='flex items-center justify-center py-36 w-full gap-2 flex-col relative text-white'>
				<div
					className='absolute top-0 left-0 inset-0 w-full h-full -z-50 brightness-[.30]'
					style={{
						backgroundImage: "url('/uploads/1.avif')",
						backgroundAttachment: 'fixed',
						backgroundPosition: 'center 70%',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						minHeight: '100%'
					}}
				/>

				<h2 className='font-medium text-5xl max-[450px]:text-4xl'>Контакти</h2>
				<p className='text-lg font-semibold max-[450px]:text-base'>
					<Link
						className='underline-offset-[6px] hover:underline'
						href='/'
					>
						Домівка
					</Link>
					{' > '}
					<span className='font-normal'>Контакти</span>
				</p>
			</header>
			<div className='my-20 container mx-auto max-sm:px-2'>
				<h1 className='text-5xl mb-10 text-center uppercase font-semibold'>Monoled</h1>
				<p className='mb-10 text-center mx-auto w-full'>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet, reprehenderit iure
					assumenda incidunt commodi eaque dolorem excepturi ad officiis sint molestias quo atque
					error sunt architecto dolor ratione consectetur consequatur? Laboriosam ea velit rerum
					officiis, culpa animi officia odio vel illum voluptatum assumenda qui obcaecati maiores
					repellendus accusamus fuga corrupti quibusdam! Labore facere sint ut qui mollitia, eius
					cupiditate sapiente.
				</p>
			</div>
			<div className='py-20 bg-neutral-100'>
				<ContactUsForm />
			</div>
		</>
	)
}
