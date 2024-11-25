import { IProduct } from '@/types'
import { useRouter } from 'next/router'

interface ProductListProps {
	products: IProduct[]
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
	const router = useRouter()

	// Функция навигации
	function routeToProduct(slug: string) {
		const localePrefix = router.locale === 'en' ? '' : router.locale
		router.push(`${localePrefix}/products/${slug}`)
	}

	return (
		<div>
			{products.map(({ id, name, images, categories, slug }) => {
				const imageUrl = images?.[0]?.imageUrl
				const categoryNames =
					categories
						?.map(({ name }, i) => `${i > 0 ? ' | ' : ''}${name}`)
						.join('') || ''

				return (
					<button
						key={id}
						onMouseDown={() => routeToProduct(slug)}
						className='flex p-2 rounded-lg transition ease-in-out duration-200 cursor-pointer w-full text-left hover:bg-gray-100'
					>
						{imageUrl && (
							<img
								src={imageUrl}
								alt={name}
								width={40}
								height={40}
								className='mr-3 rounded'
							/>
						)}
						<div className='flex flex-col'>
							<div className='text-sm font-medium'>{name}</div>
							{categoryNames && (
								<div className='text-xs font-semibold opacity-40 mt-1'>
									{categoryNames}
								</div>
							)}
						</div>
					</button>
				)
			})}
		</div>
	)
}

export default ProductList
