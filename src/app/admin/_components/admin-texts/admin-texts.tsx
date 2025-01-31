import { TextField } from '@prisma/client'
import { AdminEditText } from './admin-edit-text'

interface Props {
	texts: TextField[] | undefined
}

export function AdminTextFieldsTab({ texts }: Props) {
	return (
		<div className='p-4 animate-opacity-1'>
			<h2 className='text-2xl font-semibold mb-6'>Текстові поля</h2>
			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-200'>
					<thead className='bg-gray-50'>
						<tr>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
							>
								ID
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
							>
								Slug
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
							>
								Текст
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
							>
								Дата створення
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
							>
								Останнє оновлення
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
							>
								Дії
							</th>
						</tr>
					</thead>
					<tbody className='bg-white divide-y divide-gray-200'>
						{texts?.map(text => (
							<tr key={text.id}>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{text.id}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{text.slug}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
									{text.text.length > 40 ? text.text.slice(0, 40) + '...' : text.text}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
									{new Date(text.createdAt).toLocaleDateString()}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
									{new Date(text.updatedAt).toLocaleDateString()}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
									<AdminEditText text={text} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
