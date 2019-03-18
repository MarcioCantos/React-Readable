import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
	Button.propTypes = {
		title: PropTypes.string.isRequired
	};

	return (
		<button
			style={props.style}
			className={props.type === 'primary' ? 'btn btn-primary' : 'btn btn-secondary'}
			onClick={props.action}
		>
			{props.title}
		</button>
	);
};

export default Button;
