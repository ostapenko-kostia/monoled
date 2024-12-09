'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCreative, Mousewheel, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-creative'
import { SLIDES } from './home.data'
import Link from 'next/link'

export function Home() {
	return (
		<div className='h-vh absolute inset-0 top-0 left-0 w-full h-full -z-10'>
			<Swiper
				spaceBetween={0}
				slidesPerView={1}
				resistanceRatio={0}
				modules={[Mousewheel, Keyboard, EffectCreative]}
				effect='creative'
				direction='vertical'
				speed={500}
				creativeEffect={{
					prev: {
						translate: [0, '-0%', 0],
						shadow: false
					},
					next: {
						translate: [0, '100%', 1],
						shadow: true
					}
				}}
				followFinger={false}
				mousewheel
				keyboard
				className='overflow-hidden h-full'
			>
				{SLIDES.map((slide, index) => (
					<SwiperSlide
						key={index}
						className='w-full h-full pt-20 pb-10 text-center'
						style={{
							backgroundImage: `url(${slide.bgImg})`,
							backgroundRepeat: 'no-repeat',
							backgroundSize: 'cover',
							backgroundPosition: '30% center'
						}}
					>
						<div className='w-full h-full px-8 max-sm:px-2 flex flex-col items-start text-start justify-end max-sm:text-center max-sm:items-center'>
							<div className='border-2 rounded-md p-6 bg-[rgba(255,255,255,.7)] flex flex-col gap-7 items-start'>
								{slide.supTitle && (
									<span className='uppercase text-xl font-medium'>{slide.supTitle}</span>
								)}
								<h2 className='text-6xl font-bold max-2xl:text-5xl max-xl:text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-xl'>
									{slide.title}
								</h2>
								<button className='bg-white rounded-md text-black font-medium border-2 border-black max-sm:mx-auto'>
									<Link
										href={slide.url}
										className='w-full h-full block px-20 py-3 max-sm:px-14'
									>
										Детальніше
									</Link>
								</button>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
