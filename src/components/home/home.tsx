'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCreative, Mousewheel, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-creative'
import { SLIDES } from './home.data'
import Link from 'next/link'
import { useHomeStore } from './home.store'
import type { SwiperOptions, Swiper as TSwiper } from 'swiper/types'
import { Footer } from '../layout/footer/footer'

export function Home() {
	const { setCurrentSlide } = useHomeStore()

	const swiperSettings: SwiperOptions = {
		spaceBetween: 0,
		slidesPerView: 1,
		resistanceRatio: 0,
		modules: [Mousewheel, Keyboard, EffectCreative],
		effect: 'creative',
		direction: 'vertical',
		speed: 500,
		creativeEffect: {
			prev: {
				translate: [0, '-0%', 0],
				shadow: false
			},
			next: {
				translate: [0, '100%', 1],
				shadow: true
			}
		},
		followFinger: false,
		mousewheel: true,
		keyboard: true
	}

	return (
		<div className='h-vh absolute inset-0 top-0 left-0 w-full h-full -z-10'>
			<Swiper
				className='overflow-hidden h-full'
				onSlideChange={(swiper: TSwiper) => setCurrentSlide(swiper.activeIndex)}
				{...swiperSettings}
			>
				{SLIDES.map((slide, index) => (
					<SwiperSlide
						key={index}
						className='w-full h-full pt-20 pb-10 text-center'
						style={{
							backgroundImage: `url(${slide.bgImg})`,
							backgroundRepeat: 'no-repeat',
							backgroundSize: 'cover',
							backgroundPosition: '30% 55%'
						}}
					>
						<div className='w-full h-full px-8 max-sm:px-2 flex flex-col items-start text-start justify-end max-sm:text-center max-sm:items-center gap-7'>
							<h2 className='text-6xl font-medium max-2xl:text-5xl max-xl:text-4xl max-sm:text-2xl w-[700px] max-md:w-full'>
								{slide.title}
							</h2>
							<button className='bg-white rounded-md text-black font-medium border-2 border-transparent hover:border-black transition-colors duration-300 border-black max-sm:mx-auto'>
								<Link
									href={slide.url}
									className='w-full h-full block px-20 py-3 max-sm:px-14'
								>
									Детальніше
								</Link>
							</button>
						</div>
					</SwiperSlide>
				))}
				<SwiperSlide className='w-full h-full'>
					<Footer className="pt-20 pb-10" />
				</SwiperSlide>
			</Swiper>
		</div>
	)
}
