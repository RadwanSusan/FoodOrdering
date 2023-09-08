import styles from '../styles/MenuList.module.css';
import barStyles from '../styles/MenuListCategoryBar.module.css';
import ProductCard from './ProductCard';
import { useState, useEffect } from 'react';

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
						<div
							onClick={(event) => {
								event.preventDefault();
								handleCategoryClick('best sellers');
							}}
						>
							best sellers
						</div>
					</li>
					<li className={barStyles.menuItem}>
						<div onClick={() => handleCategoryClick('Our Mix Grill')}>
							Our Mix Grill
						</div>
					</li>
					{renderSubMenu('Meals', [
						'Meal For One',
						'Meal For Two',
						'Meal For Three',
					])}
					<li className={barStyles.menuItem}>
						<div onClick={() => handleCategoryClick('Sandwiches')}>
							Sandwiches
						</div>
					</li>
					<li className={barStyles.menuItem}>
						<div onClick={() => handleCategoryClick('Appetizers')}>
							Appetizers
						</div>
					</li>
					<li className={barStyles.menuItem}>
						<div onClick={() => handleCategoryClick('Pans')}>Pans</div>
					</li>
					<li className={barStyles.menuItem}>
						<div onClick={() => handleCategoryClick('Salads')}>
							Salads
						</div>
					</li>
					{renderSubMenu('Lambs', [
						'Australian Lamb',
						'Local Lamb',
						'Syrian Lamb',
					])}
					<li className={barStyles.menuItem}>
						<div onClick={() => handleCategoryClick('Mutton')}>
							Mutton
						</div>
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
			<div onClick={() => handleCategoryClick(menuTitle)}>{menuTitle}</div>
			<ol className={barStyles.subMenu}>
				{items.map((item) => (
					<li
						key={item}
						className={barStyles.menuItem}
					>
						<div onClick={() => handleCategoryClick(item)}>{item}</div>
					</li>
				))}
			</ol>
		</li>
	);
};

export default MenuList;
