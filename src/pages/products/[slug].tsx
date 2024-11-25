import { IProduct } from '@/types'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps = async context => {
	const { slug } = context.params as { slug?: string }

	const lang = context.locale || 'en'

	if (!slug) {
		return { notFound: true }
	}

	try {
		const response = await axios.get(`http://185.65.246.4/api/v1/products`, {
			params: {
				path: `products`,
				slugs: slug,
				lang,
			},
		})

		const product = response?.data?.data?.items?.[0]

		if (!product) {
			return { notFound: true }
		}

		return {
			props: { product },
		}
	} catch (error) {
		console.error('Error fetching product:', error)
		return { notFound: true }
	}
}

export default function ProductPage({ product }: { product: IProduct }) {
	const router = useRouter()

	return (
		<div>
			<button className='btn btn-xs' onClick={() => router.back()}>
				Back
			</button>
			<div className='card bg-base-100 w-96 shadow-xl'>
				<div className='card-body'>
					<h1>{product.name}</h1>
					<p>
						Price: {product.min_price}{' '}
						{product.max_price &&
							product.min_price !== product.max_price &&
							`- ${product.max_price}`}
					</p>
					{product.images.length > 0 && (
						<img
							src={product.images[0].imageUrl}
							alt={product.name}
							width={300}
						/>
					)}
					<ul>
						{product.categories.map(category => (
							<li key={category.id}>{category.name}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}
