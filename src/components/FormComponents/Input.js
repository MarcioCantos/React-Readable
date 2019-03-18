import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
	Input.propTypes = {
		title: PropTypes.string.isRequired
	};

	return (
		<div className="form-group">
			<label htmlFor={props.name} className="form-label">
				{props.title}
			</label>
			<input
				className="form-control"
				id={props.name}
				name={props.name}
				type={props.inputType}
				placeholder={props.placeholder}
				{...props}
				disabled={props.disabled}
			/>
		</div>
	);
};

export default Input;
