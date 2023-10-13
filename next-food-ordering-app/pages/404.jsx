import styles from '../styles/Custom404.module.css';

export default function Custom404() {
	return (
		<div className={styles.container}>
			<h1>404</h1>
			<div className={styles.cloakWrapper}>
				<div className={styles.cloakContainer}>
					<div className={styles.cloak}></div>
				</div>
			</div>
			<div className={styles.info}>
				<h2>We can&apos;t find that page</h2>
				<p>
					We&apos;re fairly sure that page used to be here, but seems to
					have gone missing. We do apologise on it&apos;s behalf.
				</p>
				<a
					href={'http://31.170.165.239:765'}
					rel='noreferrer noopener'
				>
					Home
				</a>
			</div>
		</div>
	);
}
