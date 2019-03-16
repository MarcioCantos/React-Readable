import React from 'react';
import ModalWindows from './ModalWindow'

const Modal = (props) => {
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