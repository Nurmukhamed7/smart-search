import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { path, ...params } = req.query

	if (!path?.length)
		return res
			.status(400)
			.json({ error: 'Failed to fetch, because slug is missing!' })

	const { method, body } = req
	let response
	const slug = typeof path === 'string' ? path : path.join('/')
	const baseURL = 'http://185.65.246.4/api/v1'

	try {
		switch (method) {
			case 'GET':
				response = await axios.get(`${baseURL}/${slug}`, { params })
				break
			case 'POST':
				response = await axios.post(`${baseURL}/${slug}`, body)
				break
			default:
				res.setHeader('Allow', ['POST', 'GET'])
				return res.status(405).end(`Method ${method} Not Allowed`)
		}

		if (response && response.data) return res.status(200).json(response.data)
	} catch (error: any) {
		console.error('Error during request:', error?.response?.data || error)
		return res
			.status(error?.response?.status || 500)
			.json(error?.response?.data || { error: 'Internal Server Error' })
	}
}
