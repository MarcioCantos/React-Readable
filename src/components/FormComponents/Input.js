import React from 'react';

const Input = (props) => {
    
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
}

export default Input;