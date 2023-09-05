import Image from "next/legacy/image";
import styles from '../styles/Footer.module.css';

const Footer = () => {
	return (
		<div className={styles.container}>
			<div className={styles.item}>
				<Image
					src='/img/bg.png'
					objectFit='cover'
					layout='fill'
					alt=''
				/>
			</div>
			<div className={styles.item}>
				<div className={styles.card}>
					<h2 className={styles.motto}>
						GET YOUR DAILY DOSE OF HAPPINESS WITH OUR PIZZA!.
					</h2>
				</div>
				<div className={styles.card}>
					<h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
					<p className={styles.text}>
						Po Box 17918 Jebel Ali Free Zone.
						<br /> Dubai, 85022
						<br /> 971(4)8811784
					</p>
					<p className={styles.text}>
						Po Box 17918 Jebel Ali Free Zone.
						<br /> Dubai, 85022
						<br /> 971(4)8811784
					</p>
					<p className={styles.text}>
						Po Box 17918 Jebel Ali Free Zone.
						<br /> Dubai, 85022
						<br /> 971(4)8811784
					</p>
					<p className={styles.text}>
						Po Box 17918 Jebel Ali Free Zone.
						<br /> Dubai, 85022
						<br /> 971(4)8811784
					</p>
				</div>
				<div className={styles.card}>
					<h1 className={styles.title}>WORKING HOURS</h1>
					<p className={styles.text}>
						MONDAY UNTIL FRIDAY
						<br /> 9:00 – 22:00
					</p>
					<p className={styles.text}>
						SATURDAY - SUNDAY
						<br /> 12:00 – 24:00
					</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
