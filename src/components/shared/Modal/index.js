import React from 'react';
import PropTypes from 'prop-types';
import ModalWindows from './ModalWindow'

const Modal = (props) => {

    Modal.propTypes = {
        title: PropTypes.string,
        show : PropTypes.bool.isRequired,
        onHide : PropTypes.func.isRequired,
        inner : PropTypes.func.isRequired,
    }

    const Inner = props.inner
    const {show, onHide, title, ...attrs} = props;

    return (
        <ModalWindows
            show={show}
            onHide={onHide}
            title={title}
            >
            <Inner
                onHide={onHide}
                {...attrs}
            />
        </ModalWindows>

    )
}

export default Modal;