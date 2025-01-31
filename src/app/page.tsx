import { Home } from '@/components/home/home'
import { slideService } from '@/services/slides.service'
import { Slide } from '@prisma/client'

export const revalidate = 180

export default async function HomePage() {
	const slides: Slide[] | undefined = (await slideService.getAllSlides())?.data

	return <Home slides={slides} />
}
