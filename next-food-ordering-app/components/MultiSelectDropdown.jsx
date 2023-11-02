import React from 'react';
import Select from 'react-select';

const options = [
	{ value: 'Best Sellers', label: 'best sellers' },
	{ value: 'Our Mix Grill', label: 'Meal for four' },
	{ value: 'Meal for one', label: 'Meal for one' },
	{ value: 'Meal for two', label: 'Meal for two' },
	{ value: 'Sandwiches', label: 'Sandwiches' },
	{ value: 'Wraps', label: 'Wraps' },
	{ value: 'Appetizer', label: 'Appetizer' },
	{ value: 'Pans', label: 'Pans' },
	{ value: 'Salad', label: 'Salad' },
	{ value: 'Australian Lamb', label: 'Australian Lamb' },
	{ value: 'Local Lamb', label: 'Local Lamb' },
	{ value: 'Syrian Lamb', label: 'Syrian Lamb' },
	{ value: 'Mutton', label: 'Mutton' },
	{ value: 'Australian Beef', label: 'Australian Beef' },
	{ value: 'Local Beef', label: 'Local Beef' },
	{ value: 'Fresh Chicken', label: 'Fresh Chicken' },
	{ value: 'Ready To Cook', label: 'Ready To Cook' },
	{ value: 'Ready To Grill', label: 'Ready To Grill' },
	{ value: 'Frozen Item', label: 'Frozen Item' },
	{ value: 'Soft Drinks', label: 'Soft Drinks' },
];

const MultiSelectDropdown = ({ onChange, value }) => {
	const selectedOptions = options.filter((option) =>
		(value || []).includes(option.value),
	);

	return (
		<Select
			options={options}
			onChange={onChange}
			value={selectedOptions}
			menuPlacement='top'
			isMulti
		/>
	);
};

export default MultiSelectDropdown;
