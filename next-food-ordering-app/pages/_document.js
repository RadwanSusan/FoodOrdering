import Document, { Html, Main, NextScript, Head } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps, locale: ctx?.locale || 'en' };
	}
	render() {
		return (
			<Html
				dir={this.props.locale === 'ar' ? 'rtl' : 'ltr'}
				lang={this.props.locale}>
				<Head>
					<meta
						name='description'
						content='Lahmah&Fahmah - Your favourite food delivery service'
					/>
					<meta
						httpEquiv='Content-Security-Policy'
						content='upgrade-insecure-requests'
					/>
					<link
						rel='shortcut icon'
						href='/favicon.ico'
					/>
					<link
						rel='mask-icon'
						href='/icons/mask-icon.svg'
						color='#FFFFFF'
					/>
					<meta
						name='theme-color'
						content='#ffffff'
					/>
					<link
						rel='apple-touch-icon'
						href='/apple-touch-icon.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='152x152'
						href='/mstile-150x150.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='167x167'
						href='/apple-touch-icon.png'
					/>
					<link
						rel='manifest'
						href='/manifest.json'
					/>
					<meta
						name='twitter:card'
						content='summary'
					/>
					<meta
						name='twitter:url'
						content='https://lahmahandfahmah.com'
					/>
					<meta
						name='twitter:title'
						content='Lahmah&Fahmah'
					/>
					<meta
						name='twitter:description'
						content='Lahmah&Fahmah - Your favourite food delivery service'
					/>
					<meta
						name='twitter:image'
						content='/apple-touch-icon.png'
					/>
					<meta
						property='og:type'
						content='website'
					/>
					<meta
						property='og:title'
						content='Lahmah&Fahmah'
					/>
					<meta
						property='og:description'
						content='Lahmah&Fahmah - Your favourite food delivery service'
					/>
					<meta
						property='og:site_name'
						content='Lahmah&Fahmah'
					/>
					<meta
						property='og:url'
						content='https://lahmahandfahmah.com'
					/>
					<meta
						property='og:image'
						content='/apple-touch-icon.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='180x180'
						href='/apple-touch-icon.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='32x32'
						href='/favicon-32x32.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='16x16'
						href='/favicon-16x16.png'
					/>
					<link
						rel='mask-icon'
						href='/safari-pinned-tab.svg'
						color='#5bbad5'
					/>
					<meta
						name='apple-mobile-web-app-title'
						content='Lahmah &amp; Fahmah'
					/>
					<meta
						name='application-name'
						content='Lahmah &amp; Fahmah'
					/>
					<meta
						name='msapplication-TileColor'
						content='#b91d47'
					/>
					<meta
						name='theme-color'
						content='#ffffff'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
