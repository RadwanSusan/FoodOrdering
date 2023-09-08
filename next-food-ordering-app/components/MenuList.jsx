import styles from '../styles/MenuList.module.css';
import barStyles from '../styles/MenuListCategoryBar.module.css';
import ProductCard from './ProductCard';
import { useState, useEffect } from 'react';

// const MenuList = ({ menuListItems }) => {
// 	return (
// 		<div
// 			id='menu'
// 			className={styles.container}
// 		>
// 			<h1 className={styles.title}>OUR MENU</h1>
// 			<br />
// 			<br />
// 			<nav className={barStyles.menu}>
// 				<ol>
// 					<li className={barStyles.menuItem}>
// 						<a href='#0'>best sellers</a>
// 					</li>
// 					<li className={barStyles.menuItem}>
// 						<a href='#0'>Our Mix Grill</a>
// 					</li>
// 					<li className={barStyles.menuItem}>
// 						<a href='#0'>Meals</a>
// 						<ol className={barStyles.subMenu}>
// 							<li className={barStyles.menuItem}>
// 								<a href='#0'>Meal For One</a>
// 							</li>
// 							<li className={barStyles.menuItem}>
// 								<a href='#0'>Meal For Two</a>
// 							</li>
// 							<li className={barStyles.menuItem}>
// 								<a href='#0'>Meal For Three</a>
// 							</li>
// 						</ol>
// 					</li>
// 					<li className={barStyles.menuItem}>
// 						<a href='#0'>Sandwiches</a>
// 					</li>
// 					<li className={barStyles.menuItem}>
// 						<a href='#0'>Appetizers</a>
// 					</li>
// 					<li className={barStyles.menuItem}>
// 						<a href='#0'>Pans</a>
// 					</li>
// 					<li className={barStyles.menuItem}>
// 						<a href='#0'>Salads</a>
// 					</li>
// 					{renderSubMenu('Lambs', [
// 						'Australian Lamb',
// 						'Local Lamb',
// 						'Syrian Lamb',
// 					])}
// 					<li className={barStyles.menuItem}>
// 						<a href='#0'>Mutton</a>
// 					</li>
// 					{renderSubMenu('Beef', ['Australian Beef', 'Local Beef'])}
// 					{renderSubMenu('Other Meals', [
// 						'Fresh Chicken',
// 						'Ready To Cook',
// 						'Ready To Grill',
// 						'Frozen Items',
// 						'SOFT DRINKS',
// 					])}
// 				</ol>
// 			</nav>
// 			<div className={styles.wrapper}>
// 				{menuListItems.map((product) => (
// 					<ProductCard
// 						key={product._id}
// 						product={product}
// 					/>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// const renderSubMenu = (menuTitle, items) => {
// 	return (
// 		<li className={barStyles.menuItem}>
// 			<a href='#0'>{menuTitle}</a>
// 			<ol className={barStyles.subMenu}>
// 				{items.map((item) => (
// 					<li
// 						key={item}
// 						className={barStyles.menuItem}
// 					>
// 						<a href='#0'>{item}</a>
// 					</li>
// 				))}
// 			</ol>
// 		</li>
// 	);
// };

const MenuList = ({ menuListItems }) => {
	const [filteredProducts, setFilteredProducts] = useState(menuListItems);

	const handleCategoryClick = (selectedCategory) => {
		const newFilteredProducts = menuListItems.filter(
			(product) => product.category === selectedCategory,
		);
		setFilteredProducts(newFilteredProducts);
	};

	useEffect(() => {
		handleCategoryClick('best sellers');
	}, []);

	return (
		<div
			id='menu'
			className={styles.container}
		>
			<h1 className={styles.title}>OUR MENU</h1>
			<br />
			<br />
			<nav className={barStyles.menu}>
				<ol>
					<li className={barStyles.menuItem}>
						<a
							href='#0'
							onClick={() => handleCategoryClick('best sellers')}
						>
							best sellers
						</a>
					</li>
					<li className={barStyles.menuItem}>
						<a
							href='#0'
							onClick={() => handleCategoryClick('Our Mix Grill')}
						>
							Our Mix Grill
						</a>
					</li>
					{renderSubMenu('Meals', [
						'Meal For One',
						'Meal For Two',
						'Meal For Three',
					])}
					<li className={barStyles.menuItem}>
						<a
							href='#0'
							onClick={() => handleCategoryClick('Sandwiches')}
						>
							Sandwiches
						</a>
					</li>
					<li className={barStyles.menuItem}>
						<a
							href='#0'
							onClick={() => handleCategoryClick('Appetizers')}
						>
							Appetizers
						</a>
					</li>
					<li className={barStyles.menuItem}>
						<a
							href='#0'
							onClick={() => handleCategoryClick('Pans')}
						>
							Pans
						</a>
					</li>
					<li className={barStyles.menuItem}>
						<a
							href='#0'
							onClick={() => handleCategoryClick('Salads')}
						>
							Salads
						</a>
					</li>
					{renderSubMenu('Lambs', [
						'Australian Lamb',
						'Local Lamb',
						'Syrian Lamb',
					])}
					<li className={barStyles.menuItem}>
						<a
							href='#0'
							onClick={() => handleCategoryClick('Mutton')}
						>
							Mutton
						</a>
					</li>
					{renderSubMenu('Beef', ['Australian Beef', 'Local Beef'])}
					{renderSubMenu('Other Meals', [
						'Fresh Chicken',
						'Ready To Cook',
						'Ready To Grill',
						'Frozen Items',
						'SOFT DRINKS',
					])}
				</ol>
			</nav>
			<div className={styles.wrapper}>
				{filteredProducts.map((product) => (
					<ProductCard
						key={product._id}
						product={product}
					/>
				))}
			</div>
		</div>
	);
};
const renderSubMenu = (menuTitle, items) => {
	return (
		<li className={barStyles.menuItem}>
			<a
				href='#0'
				onClick={() => handleCategoryClick(menuTitle)}
			>
				{menuTitle}
			</a>
			<ol className={barStyles.subMenu}>
				{items.map((item) => (
					<li
						key={item}
						className={barStyles.menuItem}
					>
						<a
							href='#0'
							onClick={() => handleCategoryClick(item)}
						>
							{item}
						</a>
					</li>
				))}
			</ol>
		</li>
	);
};

export default MenuList;
