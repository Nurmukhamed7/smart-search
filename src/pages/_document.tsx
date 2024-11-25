import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<meta name='description' content='Мой сайт на Next.js' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
