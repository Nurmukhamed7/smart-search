import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPost } from '../models/IPost'

export const postAPI = createApi({
	reducerPath: 'postApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://jsonplaceholder.typicode.com',
	}),
	endpoints: builder => ({
		fetchAllPosts: builder.query<IPost[], number>({
			query: (limit: number = 5) => ({
				url: '/posts',
				params: {
					_limit: limit,
				},
			}),
		}),
	}),
})
