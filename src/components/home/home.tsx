'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Keyboard, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-creative'
import Link from 'next/link'
import type { SwiperOptions } from 'swiper/types'
import { Slide } from '@prisma/client'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Props {
	slides: Slide[] | undefined
}

export function Home({ slides }: Props) {
	const swiperSettings: SwiperOptions = {
		spaceBetween: 0,
		slidesPerView: 1,
		resistanceRatio: 0,
		modules: [Mousewheel, Keyboard],
		direction: 'vertical',
		speed: 500,
		followFinger: false,
		mousewheel: true,
		keyboard: true
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 1 } }}
			className='h-vh absolute inset-0 top-0 left-0 w-full h-full -z-10'
		>
			<Swiper
				className='overflow-hidden h-full'
				{...swiperSettings}
			>
				{slides &&
					slides.map((slide, index) => (
						<SwiperSlide
							key={index}
							className='w-full h-full pt-20 pb-10 text-center relative'
						>
							<div className='absolute w-full h-full inset-0 top-0 left-0 -z-10'>
								<div className='relative w-full h-full inset-0 top-0 left-0'>
									<Image
										src={slide.background}
										alt={slide.text}
										fill
										sizes='100%, 100%'
										priority={index === 0}
										loading={index === 0 ? 'eager' : 'lazy'}
										className='object-cover object-[30%_55%]'
									/>
								</div>
							</div>

							<div className='w-full h-full px-8 max-sm:px-2 flex flex-col items-start text-start justify-end max-sm:text-center max-sm:items-center gap-7'>
								<h2 className='font-medium text-5xl max-xl:text-4xl max-sm:text-2xl w-[700px] max-md:w-full'>
									{slide.text}
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
			</Swiper>
		</motion.div>
	)
}
