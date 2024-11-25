import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps = async context => {
	const { slug } = context.params as { slug?: string }
	const { lang } = context.query

	if (!slug) {
		return { notFound: true }
	}

	try {
		const response = await axios.get(`http://185.65.246.4/api/v1/categories`, {
			params: {
				path: `categories`,
				slugs: slug,
				lang: lang || 'en',
			},
		})

		const category = response?.data?.data?.items?.[0]

		if (!category) {
			return { notFound: true }
		}

		return {
			props: { category },
		}
	} catch (error) {
		console.error('Error fetching category:', error)
		return { notFound: true }
	}
}

export default function CategoryPage({ category }: { category: any }) {
	const router = useRouter()

	return (
		<div>
			<button className='btn btn-xs' onClick={() => router.back()}>
				Back
			</button>
			<div className='card bg-base-100 w-96 shadow-xl'>
				<div className='card-body'>
					<h1>{category.name}</h1>
					<p>{category.description}</p>
				</div>
			</div>
		</div>
	)
}
