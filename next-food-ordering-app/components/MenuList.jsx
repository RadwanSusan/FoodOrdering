import styles from '../styles/MenuList.module.css';
import barStyles from '../styles/MenuListCategoryBar.module.css';
import ProductCard from './ProductCard';

const MenuList = ({ menuListItems }) => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>OUR MENU</h1>
			<br />
			<br />
			<nav className={barStyles.menu}>
				<ol>
					<li className={barStyles.menuItem}>
						<a href='#0'>Home</a>
					</li>
					<li className={barStyles.menuItem}>
						<a href='#0'>About</a>
					</li>
					<li className={barStyles.menuItem}>
						<a href='#0'>Widgets</a>
						<ol className={barStyles.subMenu}>
							<li className={barStyles.menuItem}>
								<a href='#0'>Big Widgets</a>
							</li>
							<li className={barStyles.menuItem}>
								<a href='#0'>Bigger Widgets</a>
							</li>
							<li className={barStyles.menuItem}>
								<a href='#0'>Huge Widgets</a>
							</li>
						</ol>
					</li>
					<li className={barStyles.menuItem}>
						<a href='#0'>Kabobs</a>
						<ol className={barStyles.subMenu}>
							<li className={barStyles.menuItem}>
								<a href='#0'>Shishkabobs</a>
							</li>
							<li className={barStyles.menuItem}>
								<a href='#0'>BBQ kabobs</a>
							</li>
							<li className={barStyles.menuItem}>
								<a href='#0'>Summer kabobs</a>
							</li>
						</ol>
					</li>
					<li className={barStyles.menuItem}>
						<a href='#0'>Kabobs</a>
						<ol className={barStyles.subMenu}>
							<li className={barStyles.menuItem}>
								<a href='#0'>Shishkabobs</a>
							</li>
							<li className={barStyles.menuItem}>
								<a href='#0'>BBQ kabobs</a>
							</li>
							<li className={barStyles.menuItem}>
								<a href='#0'>Summer kabobs</a>
							</li>
						</ol>
					</li>
					<li className={barStyles.menuItem}>
						<a href='#0'>Kabobs</a>
						<ol className={barStyles.subMenu}>
							<li className={barStyles.menuItem}>
								<a href='#0'>Shishkabobs</a>
							</li>
							<li className={barStyles.menuItem}>
								<a href='#0'>BBQ kabobs</a>
							</li>
							<li className={barStyles.menuItem}>
								<a href='#0'>Summer kabobs</a>
							</li>
						</ol>
					</li>
					<li className={barStyles.menuItem}>
						<a href='#0'>Contact</a>
					</li>
				</ol>
			</nav>

			<div className={styles.wrapper}>
				{menuListItems.map((product) => (
					<ProductCard
						key={product._id}
						product={product}
					/>
				))}
			</div>
		</div>
	);
};

export default MenuList;
