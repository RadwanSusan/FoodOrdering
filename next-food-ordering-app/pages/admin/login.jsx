import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../../styles/Login.module.css';
import Head from 'next/head';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
	const router = useRouter();

	const handleClick = async () => {
		try {
			await axios.post('http://31.170.165.239:765/api/login', {
				username,
				password,
			});
			router.push('/admin');
		} catch (err) {
			setError(true);
		}
	};

	return (
		<>
			<Head>
				<title>Lahamah & Fahmah</title>
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
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<h1>Admin Dashboard</h1>
					<input
						placeholder='username'
						className={styles.input}
						onChange={(e) => setUsername(e.target.value)}
						autoComplete='off'
					/>
					<input
						placeholder='password'
						type='password'
						className={styles.input}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete='off'
					/>
					<button
						onClick={handleClick}
						className={styles.button}
					>
						Sign In
					</button>
					{error && (
						<span className={styles.error}>Wrong Credentials!</span>
					)}
				</div>
			</div>
		</>
	);
};

export default Login;
