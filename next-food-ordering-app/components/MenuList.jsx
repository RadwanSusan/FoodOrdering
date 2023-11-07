import styles from '../styles/MenuList.module.css';
import barStyles from '../styles/MenuListCategoryBar.module.css';
import ProductCard from './ProductCard';
import { useState, useEffect, useCallback } from 'react';
import MobileMenuList from './MobileMenuList';
import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });
const MenuList = ({ menuListItems }) => {
	const { t, lang } = useTranslation('common');
	const animationOptions = {
		loop: false,
		autoplay: true,
		animationData: require('../public/lottie-files/empty-cat.json'),
	};

	const [filteredProducts, setFilteredProducts] = useState(menuListItems);

	const handleCategoryClick = useCallback(
		(selectedCategory) => {
			const newFilteredProducts = menuListItems.filter((product) =>
				product.category.includes(selectedCategory),
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
				<div onClick={() => handleCategoryClick(items[0])}>
					{t(menuTitle)}
				</div>
				<ol className={barStyles.subMenu}>
					{items.map((item) => (
						<li
							key={`${menuTitle}-${item}`}
							className={barStyles.menuItem}
						>
							<div onClick={() => handleCategoryClick(item)}>
								{t(item)}
							</div>
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
				{t('menu')}
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
							{t('Best Sellers')}
						</div>
					</li>
					<li
						className={barStyles.menuItem}
						key={'Our Mix Grill - mobile'}
					>
						<div onClick={() => handleCategoryClick('Our Mix Grill')}>
							{t('Meal For Four')}
						</div>
					</li>
					{renderSubMenu('Meals', ['Meal for one', 'Meal for two'])}
					<li
						className={barStyles.menuItem}
						key={'Sandwiches - mobile'}
					>
						<div onClick={() => handleCategoryClick('Sandwiches')}>
							{t('Sandwiches')}
						</div>
					</li>
					<li
						className={barStyles.menuItem}
						key={'Appetizers - mobile'}
					>
						<div onClick={() => handleCategoryClick('Appetizer')}>
							{t('Appetizers')}
						</div>
					</li>
					<li
						className={barStyles.menuItem}
						key={'Pans - mobile'}
					>
						<div onClick={() => handleCategoryClick('Pans')}>
							{t('Pans')}
						</div>
					</li>
					<li
						className={barStyles.menuItem}
						key={'Salads - mobile'}
					>
						<div onClick={() => handleCategoryClick('Salad')}>
							{t('Salads')}
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
							{t('Mutton')}
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
						width={
							typeof document !== 'undefined'
								? document.body.clientWidth
								: 0
						}
						isClickToPauseDisabled
						autoplay
					/>
					<h3>{t('emptyMenu')}</h3>
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
