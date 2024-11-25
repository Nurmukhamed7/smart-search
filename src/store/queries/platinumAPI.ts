import {
	ICustomDataAndProduct,
	ICustomDataCategories,
	ICustomDataProducts,
	IQueryParams,
} from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const platinumAPI = createApi({
	reducerPath: 'platinumAPI',
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	endpoints: builder => ({
		getCategories: builder.query<ICustomDataCategories, IQueryParams>({
			query: (params: IQueryParams) => ({
				url: `/categories`,
				params,
			}),
		}),
		getProducts: builder.query<ICustomDataProducts, IQueryParams>({
			query: (params: IQueryParams) => ({
				url: `/products`,
				params,
			}),
		}),
		getProduct: builder.query<ICustomDataAndProduct, IQueryParams>({
			query: (params: IQueryParams) => ({
				url: `/products/${params.slug}`,
				params,
			}),
		}),
	}),
})

export const {
	useGetCategoriesQuery,
	useGetProductsQuery,
	useGetProductQuery,
} = platinumAPI
