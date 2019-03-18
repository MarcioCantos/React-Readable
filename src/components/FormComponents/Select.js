import React from 'react';
import PropTypes from 'prop-types';

const Select = (props) => {
	Select.propTypes = {
		title: PropTypes.string.isRequired,
		options: PropTypes.array.isRequired
	};

	return (
		<div className="form-group">
			<label htmlFor={props.name}> {props.title} </label>
			<select id={props.name} name={props.name} className="form-control" {...props}>
				<option value="" disabled default={true}>
					{props.placeholder}
				</option>
				{props.options.map((option) => {
					return (
						<option key={option.name} value={option.name} label={option.name}>
							{option.name}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default Select;
