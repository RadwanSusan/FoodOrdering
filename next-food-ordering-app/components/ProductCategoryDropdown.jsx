import React, { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const ProductCategoryDropdown = ({ options, onCategoryChange }) => {
	const [selectedOption, setSelectedOption] = useState(options[0]);

	const handleSelect = (event) => {
		const selectedValue = event.target.value;
		setSelectedOption(
			options.find((option) => option.value === selectedValue),
		);
		onCategoryChange(selectedValue);
	};

	return (
		<Select
			value={selectedOption.value}
			onChange={handleSelect}
			displayEmpty
			inputProps={{ 'aria-label': 'Without label' }}
			size='small'
		>
			{options.map((option) => (
				<MenuItem
					key={option.value}
					value={option.value}
				>
					{option.label}
				</MenuItem>
			))}
		</Select>
	);
};

export default ProductCategoryDropdown;
