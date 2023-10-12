import styles from '../styles/Footer.module.css';

const Footer = () => {
	return (
		<div className={styles.container}>
			<div className={styles.item}>
				<iframe
					src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7218.876265235248!2d55.433713!3d25.222164!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f61c339739459%3A0xff265c01d149e7b2!2sLahmah%20%26%20Fahmah%20Butchery%20and%20grill!5e0!3m2!1sen!2sjo!4v1696597024165!5m2!1sen!2sjo'
					width={600}
					height={243}
					style={{ border: '0' }}
					allowFullScreen={false}
					loading='lazy'
					title='Restaurant Location'
					referrerPolicy='no-referrer-when-downgrade'
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
