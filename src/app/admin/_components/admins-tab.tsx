import { Admin } from '@prisma/client'
import { PlusIcon } from 'lucide-react'

interface Props {
	admins: Admin[] | undefined
}

export function AdminsTab({ admins }: Props) {
	const createAdmin = () => {
		console.log('create admin')
	}

	return (
		<div className='p-4'>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-2xl font-semibold'>Адміністратори</h2>
				<button
					onClick={createAdmin}
					className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2'
				>
					<PlusIcon
						color='#fff'
						size={20}
					/>{' '}
					Додати адміна
				</button>
			</div>
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
								Логін
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
						{admins?.map(admin => (
							<tr key={admin.id}>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{admin.id}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{admin.login}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
									{new Date(admin.createdAt).toLocaleDateString()}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
									{new Date(admin.updatedAt).toLocaleDateString()}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
									<button
										className='text-blue-600 hover:text-blue-900 disabled:text-blue-200 disabled:cursor-not-allowed'
										disabled={admin.login === 'ostapenkokpersonal@gmail.com'}
									>
										Редагувати
									</button>
									<button
										className='ml-4 text-red-600 hover:text-red-900 disabled:text-red-200 disabled:cursor-not-allowed'
										disabled={admins.length === 1 || admin.login === 'ostapenkokpersonal@gmail.com'}
									>
										Видалити
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
