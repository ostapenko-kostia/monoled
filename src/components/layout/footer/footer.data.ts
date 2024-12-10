import { IFooterLinkContent } from './footer.types'

export const FOOTER_LINKS: IFooterLinkContent[] = [
	{
		title: 'Monoled',
		links: [
			{
				title: 'About us',
				url: '/about'
			},
			{
				title: 'Projects Service',
				url: '/projects'
			},
			{
				title: 'Collection',
				url: '/collection'
			}
		]
	},
	{
		title: 'Downloads',
		links: [
			{
				title: 'Catalogues',
				url: '/catalogues'
			},
			{
				title: 'Configurator',
				url: '/configurator'
			},
			{
				title: 'BIM',
				url: '/bim'
			},
			{
				title: 'Dialux',
				url: '/dialux'
			}
		]
	},
	{
		title: 'Social',
		links: [
			{
				title: 'Facebook',
				url: 'https://facebook.com'
			},
			{
				title: 'Instagram',
				url: 'https://instagram.com'
			},
			{
				title: 'Linkedin',
				url: 'https://linkedin.com'
			},
			{
				title: 'Pinterest',
				url: 'https://pinterest.com'
			},
			{
				title: 'Newsletter',
				url: '/newsletter'
			}
		]
	},
	{
		title: 'Contact',
		links: [
			{
				title: 'Tel.: +34 961 667 207',
				url: 'tel:+34961667207'
			},
			{
				title: 'info@monoled.com',
				url: 'mailto:info@monoled.com'
			},
			{ title: '' },
			{ title: 'Calle N – Pol. Ind. El Oliveral 46394' },
			{ title: 'Ribarroja del Turia – Valencia (Spain)' }
		]
	}
]
