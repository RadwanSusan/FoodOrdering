import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../../styles/Login.module.css';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
	const router = useRouter();
	const { t, lang } = useTranslation('common');

	const handleClick = async () => {
		try {
			await axios.post(`${process.env.API_URL}/api/login`, {
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
				<title>{t('Lahmah&FahmahAdmin')}</title>
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
