import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../../styles/Login.module.css';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
	const router = useRouter();

	const handleClick = async () => {
		try {
			await axios.post('http://31.170.165.239:800/api/login', {
				username,
				password,
			});
			router.push('/admin');
		} catch (err) {
			setError(true);
		}
	};

	return (
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
				{error && <span className={styles.error}>Wrong Credentials!</span>}
			</div>
		</div>
	);
};

export default Login;
