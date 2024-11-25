import {
	useGetCategoriesQuery,
	useGetProductsQuery,
} from '@/store/queries/platinumAPI'
import { useRouter } from 'next/router'
import { FormEvent, useRef, useState } from 'react'
import { useSearchData } from '../hooks/useSearchData'
import CategoryList from './CategoryList'
import ProductList from './ProductList'

export interface SearchFormProps {
	searchListOpen?: boolean
}

const SearchContainer = () => {
	const router = useRouter()
	const [searchTerm, setSearchTerm] = useState('')
	const [isFocused, setFocused] = useState(false)
	const SearchInputRef = useRef<HTMLInputElement>(null)
	const {
		data: productsDataResponse,
		isLoading: isProductsLoading,
		setTyping: setTypingProducts,
	} = useSearchData({
		queryHook: useGetProductsQuery,
		searchTerm,
		isFocused,
		locale: router.locale,
	})

	const {
		data: categoriesDataResponse,
		isLoading: isCategoriesLoading,
		setTyping: setTypingCategories,
	} = useSearchData({
		queryHook: useGetCategoriesQuery,
		searchTerm,
		isFocused,
		locale: router.locale,
	})

	const products = productsDataResponse?.data?.items || []
	const categories = categoriesDataResponse?.data?.items || []
	const uniqueCategories = Array.from(
		new Map(categories.map(category => [category.id, category])).values()
	)
	const isLoading = isProductsLoading || isCategoriesLoading

	function handleBlur() {
		setFocused(false)
	}

	function handleFocus() {
		setFocused(true)
	}

	function handleInput(e: FormEvent<HTMLInputElement>) {
		setSearchTerm(e.currentTarget.value)
		setTypingProducts(true)
		setTypingCategories(true)
	}

	return (
		<div className='flex-grow h-[50px]'>
			<form>
				<div className='flex items-center bg-white px-4 gap-4'>
					<input
						ref={SearchInputRef}
						type='text'
						value={searchTerm}
						onChange={handleInput}
						onFocus={handleFocus}
						onBlur={handleBlur}
						placeholder='Search'
						className='input input-bordered w-full'
					/>
					{isLoading && (
						<span className='loading loading-spinner loading-md'></span>
					)}
				</div>
				{isFocused && searchTerm.length >= 3 && (
					<div className='w-full bg-slate-400 backdrop-blur-sm overflow-auto mt-2'>
						<div className='pb-2'>
							<div className='pt-2 mx-3 mb-2 text-xs font-semibold opacity-40 border-b border-gray-200 leading-6'>
								Categories
							</div>
							<div className='mx-2'>
								<CategoryList categories={uniqueCategories} />
							</div>
							<div className='pt-2 mx-3 mb-2 text-xs font-semibold opacity-40 border-b border-gray-200 leading-6'>
								Products
							</div>
							<div className='mx-2'>
								<ProductList products={products} />
							</div>
						</div>
					</div>
				)}
			</form>
		</div>
	)
}

export default SearchContainer
