import styles from '../styles/PizzaList.module.css';
import PizzaCard from './PizzaCard';

const PizzaList = ({ pizzaList }) => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
			<p className={styles.desc}>
				Welcome to our pizza restaurant! We take pride in serving the best
				pizza in town. Our pizzas are made with fresh, high-quality
				ingredients and cooked to perfection in our wood-fired oven.
				<br />
				Whether you prefer classic toppings like pepperoni and mushrooms or
				something more adventurous like goat cheese and arugula, we have
				something for everyone. <br />
				And don't forget to try our homemade garlic knots and salads to
				complete your meal. Join us for a delicious slice today!
				<br />
				<br />
				<br />
			</p>
			<div className={styles.wrapper}>
				{pizzaList.map((pizza) => (
					<PizzaCard
						key={pizza._id}
						pizza={pizza}
					/>
				))}
			</div>
		</div>
	);
};

export default PizzaList;
