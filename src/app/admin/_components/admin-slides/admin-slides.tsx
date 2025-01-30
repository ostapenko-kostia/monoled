import { Slide } from '@prisma/client'
import Image from 'next/image'
import { AdminDeleteSlide } from './admin-delete-slide'
import { AdminSlideCreate } from './admin-create-slide'
import { AdminSlideEdit } from './admin-edit-slide'

interface Props {
	slides: Slide[] | undefined
}

export function AdminSlidesTab({ slides }: Props) {
	return (
		<div className='p-4'>
			<h2 className='text-2xl font-semibold mb-6'>Слайди</h2>
			<div className='grid grid-cols-4 w-full gap-10 max-xl:grid-cols-3 max-md:grid-cols-2 max-[480px]:grid-cols-1'>
				{slides?.map(slide => (
					<div
						className='relative'
						key={slide.id}
					>
						<div className='absolute z-10 bg-white flex items-center gap-3 justify-center p-2 right-2 rounded-b-md'>
							<AdminSlideEdit slide={slide} />
							<AdminDeleteSlide id={slide.id} />
						</div>
						<div>
							<div className='relative w-full aspect-square'>
								<Image
									src={slide.background}
									alt={slide.text}
									fill
									sizes='100%, 100%'
									className='object-cover rounded-lg'
								/>
							</div>
							<h3 className='my-2 text-xl font-medium'>{slide.text}</h3>
							<p className='text-sm'>
								<span className='font-semibold'>Посилання:</span> {slide.url}
							</p>
						</div>
					</div>
				))}
				<AdminSlideCreate />
			</div>
		</div>
	)
}
