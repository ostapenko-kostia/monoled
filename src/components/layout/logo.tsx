import Link from 'next/link'

async function Logo({ color = 'black' }: { color?: string }) {
	return (
		<Link href='/'>
			<svg
				id='Layer_2'
				data-name='Layer 2'
				width={140}
				height={65}
				className='w-[140px] h-[65px] max-sm:w-[120px] max-sm:h-[50]'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 575.44 230.95'
			>
				<g
					id='Layer_1-2'
					data-name='Layer 1'
				>
					<g>
						<g>
							<path
								fill={color}
								strokeWidth={1}
								d='M113.41,115.41l113.41,113.41h-113.41v-113.41Z'
							/>
							<path
								fill={color}
								strokeWidth={1}
								d='M113.41,115.41L0,2h113.41s0,113.41,0,113.41Z'
							/>
						</g>
						<path
							fill={color}
							strokeWidth={1}
							d='M155.98,1.72h20.6v113.91h-20.6V1.72Z'
						/>
						<path
							fill={color}
							strokeWidth={1}
							d='M262.4,36.04l-.16,48.21c-.16,19.97-14.98,33.7-36.36,33.7s-34.95-13.42-34.95-33.7v-48.21h20.6v44.78c0,10.92,5.93,18.1,14.82,18.1,9.36,0,15.45-7.33,15.45-17.94v-44.94h20.6Z'
						/>
						<path
							fill={color}
							strokeWidth={1}
							d='M348.99,115.62h-20.6v-46.81c0-9.36-6.4-16.38-15.29-16.38s-15.92,7.02-15.92,15.76v47.43h-20.6V36.04h19.19v5.62c4.99-5.31,12.64-8.27,21.53-8.27,10.45,0,19.04,4.06,24.65,11.08,5.62-6.87,15.45-11.08,26.37-11.08,19.04,0,32.14,12.95,32.14,31.83v50.4h-20.6v-46.34c0-9.99-6.24-16.85-15.29-16.85s-15.6,6.87-15.6,15.92v47.28Z'
						/>
						<path
							fill={color}
							strokeWidth={1}
							d='M424.83,0c7.49,0,13.42,5.31,13.42,12.48s-5.93,12.48-13.42,12.48-13.11-5.31-13.11-12.48,5.77-12.48,13.11-12.48Z'
						/>
						<path
							fill={color}
							strokeWidth={1}
							d='M236.54,149.04h19.19v5.62c4.84-5.31,12.48-8.27,21.53-8.27,18.57,0,31.52,13.11,31.52,31.99v50.24h-20.6v-46.81c0-9.36-6.24-16.38-15.14-16.38s-15.92,7.02-15.92,15.76v47.43h-20.6v-79.58Z'
						/>
						<path
							fill={color}
							d='M365.27,230.95c-25.9,0-44.94-17.79-44.94-41.82s18.72-42.44,42.75-42.44,40.41,17.94,40.41,41.51c0,2.34-.16,5.31-.47,8.27h-60.07c2.03,9.67,9.99,15.92,21.84,15.92,8.11,0,13.89-2.96,19.66-9.83l16.38,12.17c-8.11,10.45-20.75,16.23-35.58,16.23ZM381.5,180.09c-1.25-9.05-8.43-15.14-18.57-15.14s-16.85,6.4-19.35,15.14h37.92Z'
						/>
						<polygon
							fill={color}
							strokeWidth={1}
							points='455.61 184.92 487.75 149.04 461.38 149.04 435.33 178.68 435.28 36.04 414.69 36.04 414.73 228.61 435.33 228.61 435.33 191.48 463.1 228.61 489.16 228.61 455.61 184.92'
						/>
						<path
							fill={color}
							strokeWidth={1}
							d='M555.94,149.04v7.02c-7.02-5.93-16.07-9.36-25.9-9.36-22.94,0-41.35,18.72-41.35,42.13s18.41,42.13,41.35,42.13c6.1,0,11.9-1.32,17.1-3.74l-6.65-16.65c-2.48.88-5.11,1.36-7.8,1.36-12.48,0-22.31-9.99-22.31-23.09s9.83-23.09,22.31-23.09,23.25,9.99,23.25,23.09c0,0,0,39.79,0,39.79h19.5v-79.58h-19.5Z'
						/>
					</g>
				</g>
			</svg>
		</Link>
	)
}

export default Logo
