import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const ModalWindows = (props) => {
	ModalWindows.propTypes = {
		title: PropTypes.string,
		onHide: PropTypes.func.isRequired
	};

	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">{props.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{props.children}</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalWindows;
