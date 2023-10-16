import styles from '../styles/Featured.module.css';
import Image from 'next/image';
import { useState } from 'react';

const Featured = () => {
	const [index, setIndex] = useState(0);
	const images = [
		'/img/lahmahAndFahmah/1.jpg',
		'/img/lahmahAndFahmah/2.jpeg',
		'/img/lahmahAndFahmah/3.jpeg',
	];

	const handleArrow = (direction) => {
		if (direction === 'l') {
			setIndex(index !== 0 ? index - 1 : 2);
		}
		if (direction === 'r') {
			setIndex(index !== 2 ? index + 1 : 0);
		}
	};

	return (
		<div className={styles.container}>
			<div
				className={styles.arrowContainer}
				style={{ left: 0 }}
				onClick={() => handleArrow('l')}
			>
				<Image
					src='/img/arrowl.png'
					alt='left-arrow'
					style={{ objectFit: 'cover' }}
					fill={true}
					priority
				/>
			</div>
			<div
				className={styles.wrapper}
				style={{ transform: `translateX(${-100 * index}vw)` }}
			>
				{images.map((img, i) => (
					<div
						className={styles.imgContainer}
						key={i}
					>
						<Image
							src={img}
							alt='featured-image'
							style={{ objectFit: 'cover' }}
							fill={true}
							priority
						/>
					</div>
				))}
			</div>
			<div
				className={styles.arrowContainer}
				style={{ right: 0 }}
				onClick={() => handleArrow('r')}
			>
				<Image
					src='/img/arrowr.png'
					alt='right-arrow'
					style={{ objectFit: 'cover' }}
					fill
					priority
				/>
			</div>
		</div>
	);
};

export default Featured;
