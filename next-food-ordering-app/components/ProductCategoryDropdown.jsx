import React, { useState } from 'react';

const ProductCategoryDropdown = ({ options, onCategoryChange }) => {
	const [selectedOption, setSelectedOption] = useState(options[0]);

	const handleSelect = (e) => {
		const selectedValue = e.target.value;
		setSelectedOption(
			options.find((option) => option.value === selectedValue),
		);
		onCategoryChange(selectedValue);
	};

	return (
		<select
			value={selectedOption.value}
			onChange={handleSelect}
		>
			{options.map((option) => (
				<option
					key={option.value}
					value={option.value}
				>
					{option.label}
				</option>
			))}
		</select>
	);
};

export default ProductCategoryDropdown;
