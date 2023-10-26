import styles from '../styles/MenuList.module.css';
import barStyles from '../styles/MenuListCategoryBar.module.css';
import ProductCard from './ProductCard';
import { useState, useEffect, useCallback } from 'react';
import Lottie from 'react-lottie';
import MobileMenuList from './MobileMenuList';

const MenuList = ({ menuListItems }) => {
	const animationOptions = {
		loop: false,
		autoplay: true,
		animationData: require('../public/lottie-files/empty-cat.json'),
	};

	const [filteredProducts, setFilteredProducts] = useState(menuListItems);

	const handleCategoryClick = useCallback(
		(selectedCategories) => {
			const newFilteredProducts = menuListItems.filter((product) =>
				selectedCategories.includes(product.category),
			);
			setFilteredProducts(newFilteredProducts);
		},
		[menuListItems],
	);

	useEffect(() => {
		handleCategoryClick('Best Sellers');
	}, [handleCategoryClick]);

	const renderSubMenu = (menuTitle, items) => {
		return (
			<li
				className={barStyles.menuItem}
				key={menuTitle}
			>
				<div onClick={() => handleCategoryClick(menuTitle)}>
					{menuTitle}
				</div>
				<ol className={barStyles.subMenu}>
					{items.map((item) => (
						<li
							key={`${menuTitle}-${item}`}
							className={barStyles.menuItem}
						>
							<div onClick={() => handleCategoryClick(item)}>{item}</div>
						</li>
					))}
				</ol>
			</li>
		);
	};
	return (
		<div
			id='menu'
			className={styles.container}
		>
			<MobileMenuList handleCategoryClick={handleCategoryClick} />
			<h1
				id='menu'
				className={styles.title}
			>
				OUR MENU
			</h1>
			<br />
			<nav className={barStyles.menu}>
				<ol>
					<li
						className={barStyles.menuItem}
						key='best sellers - mobile'
					>
						<div
							onClick={() => {
								handleCategoryClick('Best Sellers');
							}}
						>
							best sellers
						</div>
					</li>
					<li
						className={barStyles.menuItem}
						key={'Our Mix Grill - mobile'}
					>
						<div onClick={() => handleCategoryClick('Our Mix Grill')}>
							Our Mix Grill
						</div>
					</li>
					{renderSubMenu('Meals', [
						'Meal For One',
						'Meal For Two',
						'Meal For Three',
					])}
					<li
						className={barStyles.menuItem}
						key={'Sandwiches - mobile'}
					>
						<div onClick={() => handleCategoryClick('Sandwiches')}>
							Sandwiches
						</div>
					</li>
					<li
						className={barStyles.menuItem}
						key={'Appetizers - mobile'}
					>
						<div onClick={() => handleCategoryClick('Appetizers')}>
							Appetizers
						</div>
					</li>
					<li
						className={barStyles.menuItem}
						key={'Pans - mobile'}
					>
						<div onClick={() => handleCategoryClick('Pans')}>Pans</div>
					</li>
					<li
						className={barStyles.menuItem}
						key={'Salads - mobile'}
					>
						<div onClick={() => handleCategoryClick('Salads')}>
							Salads
						</div>
					</li>
					{renderSubMenu('Lambs', [
						'Australian Lamb',
						'Local Lamb',
						'Syrian Lamb',
					])}
					<li
						className={barStyles.menuItem}
						key={'Mutton - mobile'}
					>
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
						'Soft Drinks',
						'Wraps',
					])}
				</ol>
			</nav>
			{filteredProducts.length === 0 ? (
				<>
					<Lottie
						options={animationOptions}
						height={400}
						width={400}
					/>
					<h3>This category is empty.</h3>
				</>
			) : (
				<div className={styles.wrapper}>
					{filteredProducts.map((product) => (
						<ProductCard
							key={`${product._id} - mobile - subMenu`}
							product={product}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default MenuList;
