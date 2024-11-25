import { useEffect, useRef, useState } from 'react'

interface UseSearchDataProps<T> {
	queryHook: (
		args: any,
		options: any
	) => { data?: T; isLoading: boolean; isFetching: boolean }
	searchTerm: string
	isFocused: boolean
	locale: string | undefined
}

export function useSearchData<T>({
	queryHook,
	searchTerm,
	isFocused,
	locale,
}: UseSearchDataProps<T>) {
	const [isTyping, setTyping] = useState(false)
	const typingTimerRef = useRef<NodeJS.Timeout | null>(null)

	const { data, isLoading, isFetching } = queryHook(
		{
			search: searchTerm,
			lang: locale,
		},
		{
			skip: !isFocused || searchTerm.length < 3 || isTyping,
		}
	)

	useEffect(() => {
		if (isTyping) {
			if (typingTimerRef.current) {
				clearTimeout(typingTimerRef.current)
			}

			typingTimerRef.current = setTimeout(() => {
				setTyping(false)
			}, 1500)
		}

		return () => {
			if (typingTimerRef.current) {
				clearTimeout(typingTimerRef.current)
			}
		}
	}, [isTyping])

	return {
		data,
		isLoading: isLoading || isFetching,
		setTyping,
	}
}
