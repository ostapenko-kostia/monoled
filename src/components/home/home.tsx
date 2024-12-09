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
						translate: [0, "-0%", 0],	
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
						className='w-full h-full py-20'
						style={{ background: `url(${slide.bgImg}) no-repeat center 55% / cover` }}
					>
						<div className='w-full h-full px-8 flex flex-col items-start text-start justify-end gap-7'>
							{slide.supTitle && <span className='uppercase text-xl font-medium'>{slide.supTitle}</span>}
							<h2 className='text-6xl font-bold w-[600px]'>{slide.title}</h2>
							<button className='bg-white rounded-md text-black font-medium border-2 border-transparent hover:border-black duration-200 transition-colors'>
								<Link href={slide.url} className='w-full h-full block px-20 py-3'>Детальніше</Link>
							</button>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
