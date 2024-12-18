import { Footer } from '@/components/layout/footer/footer'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
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

				<h2 className='font-medium text-5xl max-[450px]:text-4xl'>Про бренд</h2>
				<p className='text-lg font-semibold max-[450px]:text-base'>
					<Link
						className='underline-offset-[6px] hover:underline'
						href='/'
					>
						Домівка
					</Link>
					{' > '}
					<span className='font-normal'>Про бренд</span>
				</p>
			</header>
			<div>
				<div className='text-center py-10 container mx-auto'>
					<div className='grid grid-cols-[1.5fr_2fr] gap-12 max-sm:grid-cols-1'>
						<div className='w-full'>
							<div>
								<h1 className='font-semibold text-5xl uppercase'>Monoled</h1>
								<p className='mt-10 w-full text-center mx-auto font-light'>
									Вітаємо у Monoled - Lorem ipsum dolor sit amet consectetur, adipisicing elit.
									Praesentium ratione cumque reiciendis perspiciatis ab consequatur aperiam.
									Reprehenderit amet maxime velit, labore culpa esse impedit libero possimus
									excepturi ducimus pariatur soluta! Dolorum sit, temporibus sapiente labore omnis
									doloribus molestias adipisci illo quod vero quaerat possimus sunt rerum error a
									beatae deleniti quos, numquam modi ullam ipsa quis. Iusto illo vel minima!
									Consequuntur quos delectus facere praesentium sunt dolor vero temporibus neque vel
									aperiam sapiente, laudantium, dolore reiciendis facilis ad voluptates maxime nemo.
									Veniam quas nulla quisquam deserunt sed provident fugit rerum!
								</p>
							</div>
							<hr className='w-[100px] h-1 mx-auto my-10 bg-black' />
							<div>
								<h2 className='font-medium text-3xl'>Чому ми?</h2>
								<ul className='mt-5 [&>li]:text-lg [&>li]:font-light list-inside'>
									<li>- Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
									<li>- Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
									<li>- Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
									<li>- Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
									<li>- Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
								</ul>
							</div>
							<hr className='w-[100px] h-1 mx-auto my-10 bg-black' />
							<div>
								<h2 className='font-medium text-3xl'>Що ми пропонуємо?</h2>
								<ul className='mt-5 [&>li]:text-lg [&>li]:font-light list-inside'>
									<li>- Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
									<li>- Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
									<li>- Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
									<li>- Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
									<li>- Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
								</ul>
							</div>
							<hr className='w-[100px] h-1 mx-auto my-10 bg-black' />
							<p className='mt-10 w-full text-center mx-auto font-light'>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium ratione cumque
								reiciendis perspiciatis ab consequatur aperiam. Reprehenderit amet maxime velit,
								labore culpa esse impedit libero possimus excepturi ducimus pariatur soluta! Dolorum
								sit, temporibus sapiente labore omnis doloribus molestias adipisci illo quod vero
								quaerat possimus sunt rerum error a beatae deleniti quos, numquam modi ullam ipsa
								quis. Iusto illo vel minima! Consequuntur quos delectus facere praesentium sunt
								dolor vero temporibus neque vel aperiam sapiente, laudantium, dolore reiciendis
								facilis ad voluptates maxime nemo. Veniam quas nulla quisquam deserunt sed provident
								fugit rerum!
							</p>
						</div>
						<div className='w-full h-min aspect-square sticky top-5 max-sm:hidden'>
							<div className='relative w-full h-full'>
								<Image
									src='/uploads/1.avif'
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
			<Footer className='[&_div]:pt-10 pb-10' />
		</>
	)
}
