'use client'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

interface Props {
	images: string[]
}

export function ProductSlider({ images }: Props) {
  const swiperRef = useRef<SwiperRef | null>(null)
	return (
		<div className='flex items-center gap-3 -z-10'>
			<button
				onClick={() => swiperRef.current?.swiper.slidePrev()}
				className='p-1 aspect-square rounded-full bg-[#ececec] flex items-center justify-center'
			>
				<ChevronLeftIcon
					size={40}
					strokeWidth='0.5'
				/>
			</button>
			<Swiper
				className='w-full'
				ref={swiperRef}
				modules={[Pagination]}
				spaceBetween={25}
				pagination={{ clickable: true }}
				loop
			>
				{images.map((image, index) => (
					<SwiperSlide key={index}>
						<Image
							className='object-cover rounded-lg'
							src={image}
							alt={`${image} #${index}`}
							width={900}
							height={900}
						/>
					</SwiperSlide>
				))}
			</Swiper>
			<button
				onClick={() => swiperRef.current?.swiper.slideNext()}
				className='p-1 aspect-square rounded-full bg-[#ececec] flex items-center justify-center'
			>
				<ChevronRightIcon
					size={40}
					strokeWidth='0.5'
				/>
			</button>
		</div>
	)
}
