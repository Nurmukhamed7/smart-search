import { IProduct } from '@/types'

const ResultsContainer = ({ products }: { products: IProduct[] }) => {
	return (
		<div>
			<h2>ResultsContainer</h2>
			{products.length === 0 && <p>No products found.</p>}
			{JSON.stringify(products, null, 2)}
		</div>
	)
}

export default ResultsContainer
