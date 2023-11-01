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
				lang={this.props.locale}
			>
				<Head>
					<meta
						name='description'
						content='Best PWA app in the world!'
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
						href='/icons/touch-icon-iphone.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='152x152'
						href='/icons/touch-icon-ipad.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='180x180'
						href='/icons/touch-icon-iphone-retina.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='167x167'
						href='/icons/touch-icon-ipad-retina.png'
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
						content='https://yourdomain.com'
					/>
					<meta
						name='twitter:title'
						content='My awesome PWA app'
					/>
					<meta
						name='twitter:description'
						content='Best PWA app in the world!'
					/>
					<meta
						name='twitter:image'
						content='/icons/twitter.png'
					/>
					<meta
						name='twitter:creator'
						content='@DavidWShadow'
					/>
					<meta
						property='og:type'
						content='website'
					/>
					<meta
						property='og:title'
						content='My awesome PWA app'
					/>
					<meta
						property='og:description'
						content='Best PWA app in the world!'
					/>
					<meta
						property='og:site_name'
						content='My awesome PWA app'
					/>
					<meta
						property='og:url'
						content='https://yourdomain.com'
					/>
					<meta
						property='og:image'
						content='/icons/og.png'
					/>
					<link
						rel='apple-touch-startup-image'
						href='/images/apple_splash_2048.png'
						sizes='2048x2732'
					/>
					<link
						rel='apple-touch-startup-image'
						href='/images/apple_splash_1668.png'
						sizes='1668x2224'
					/>
					<link
						rel='apple-touch-startup-image'
						href='/images/apple_splash_1536.png'
						sizes='1536x2048'
					/>
					<link
						rel='apple-touch-startup-image'
						href='/images/apple_splash_1125.png'
						sizes='1125x2436'
					/>
					<link
						rel='apple-touch-startup-image'
						href='/images/apple_splash_1242.png'
						sizes='1242x2208'
					/>
					<link
						rel='apple-touch-startup-image'
						href='/images/apple_splash_750.png'
						sizes='750x1334'
					/>
					<link
						rel='apple-touch-startup-image'
						href='/images/apple_splash_640.png'
						sizes='640x1136'
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
						rel='manifest'
						href='/site.webmanifest'
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
