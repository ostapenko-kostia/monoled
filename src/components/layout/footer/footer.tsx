import cn from 'clsx'
import Link from 'next/link'
import { FOOTER_LINKS } from './footer.data'

interface Props {
	className?: string
}

export function Footer({ className }: Props) {
	return (
		<footer
			className={cn(className, 'bg-foreground text-background px-8 max-sm:px-4 w-ful h-full')}
		>
			<div className='pt-48 flex flex-col items-start gap-28 w-full max-md:pt-0 max-md:h-full max-md:justify-center'>
				<ul className='grid grid-cols-4 w-full font-medium text-lg max-md:grid-cols-2 gap-20 max-[450px]:grid-cols-[1fr_2fr] max-[400px]:gap-x-6'>
					{FOOTER_LINKS.map(i => (
						<div
							className='flex flex-col items-start text-left gap-6'
							key={i.title}
						>
							<h2>{i.title}</h2>
							<ul className='flex flex-col items-start text-left text-neutral-400 gap-5'>
								{i.links.map(link =>
									link.url ? (
										<li
											key={link.title}
											className='hover:text-white transition-colors duration-300'
										>
											<Link href={link.url}>{link.title}</Link>
										</li>
									) : (
										<li key={link.title}>{link.title}</li>
									)
								)}
							</ul>
						</div>
					))}
				</ul>
				<div className='w-full flex flex-col max-md:hidden'>
					<hr className='w-full h-[1px] border-none bg-white opacity-30' />
					<div className='flex w-full items-center gap-10 mt-11 text-neutral-400 font-mediumr'>
						<h2>Monoled ©2024</h2>
						<Link href='/legal-advice'>Legal advice</Link>
						<Link href='/privacy-policy'>Privacy policy</Link>
						<Link href='/cookie-policy'>Cookie Policy</Link>
						<Link href='/informant-channel'>informant channel</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}
