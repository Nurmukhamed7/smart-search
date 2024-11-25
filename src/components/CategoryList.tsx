import { ICategory } from '@/types'
import { useRouter } from 'next/router'
import React from 'react'

interface CategoryListProps {
	categories: ICategory[]
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
	const router = useRouter()

	function routeToCategory(slug: string) {
		router.push(`/categories/${slug}`)
	}

	return (
		<div>
			{categories.map(({ id, name, slug }) => (
				<button
					key={id}
					onMouseDown={() => routeToCategory(slug)}
					className='flex p-2 rounded-lg transition ease-in-out duration-200 cursor-pointer w-full text-left hover:bg-gray-100'
				>
					<div className='flex flex-col'>
						<div className='text-sm font-medium'>{name}</div>
					</div>
				</button>
			))}
		</div>
	)
}

export default CategoryList
