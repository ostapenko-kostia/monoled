import { textsService } from '@/services/texts.service'
import Image from 'next/image'
import Link from 'next/link'

export default async function AboutPage() {
	const texts = (await textsService.getAllTexts())

	const aboutTitle = texts?.find(text => text.slug === 'about-title')?.text
	const homeTitle = texts?.find(text => text.slug === 'home-title')?.text
	const title = texts?.find(text => text.slug === 'title')?.text

	const aboutFirst = texts?.find(text => text.slug === 'about-first')?.text
	const aboutSecond = texts?.find(text => text.slug === 'about-second')?.text
	const aboutThird = texts?.find(text => text.slug === 'about-third')?.text

	const imageUrl = texts?.find(text => text.slug === 'about-page-image-url')?.text

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

				<h2 className='font-medium text-5xl max-[450px]:text-4xl'>{aboutTitle}</h2>
				<p className='text-lg font-semibold max-[450px]:text-base'>
					<Link
						className='underline-offset-[6px] hover:underline'
						href='/'
					>
						{homeTitle}
					</Link>
					{' > '}
					<span className='font-normal'>{aboutTitle}</span>
				</p>
			</header>
			<div>
				<div className='text-center py-10 container mx-auto'>
					<div className='grid grid-cols-[1.5fr_2fr] gap-12 max-sm:grid-cols-1'>
						<div className='w-full'>
							<div>
								<h1 className='font-semibold text-5xl uppercase'>{title}</h1>
								<p className='mt-10 w-full text-center mx-auto font-light text-xl'>{aboutFirst}</p>
							</div>
							<hr className='w-[100px] h-1 mx-auto my-10 bg-black' />
							<div>
								<p className='mt-10 w-full text-center mx-auto font-light text-xl'>{aboutSecond}</p>
							</div>
							<hr className='w-[100px] h-1 mx-auto my-10 bg-black' />
							<div>
								<p className='mt-10 w-full text-center mx-auto font-light text-xl'>{aboutThird}</p>
							</div>
						</div>
						<div className='w-full h-min aspect-square sticky top-5 max-sm:hidden'>
							<div className='relative w-full h-full'>
								<Image
									src={imageUrl && imageUrl.trim().length ? imageUrl : "/placeholder-image.jpg"}
									alt='about'
									className='object-cover'
									fill
									sizes='100%, 100%'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
