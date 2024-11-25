import { setupStore } from '@/store/store'
import '@/styles/globals.css'
import { NextIntlClientProvider } from 'next-intl'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
	const { locale } = useRouter()
	const store = setupStore()
	return (
		<>
			<NextIntlClientProvider locale={locale}>
				<Provider store={store}>
					<header>Моя шапка сайта</header>
					<Component {...pageProps} />
					<footer>FOOTER</footer>
				</Provider>
			</NextIntlClientProvider>
		</>
	)
}
