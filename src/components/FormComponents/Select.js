import React from 'react';

const Select = (props) => {
    const { edit } = props.bind;
    let hold = props;
    
    if(edit && props.value === ''){
        hold = {...props, value : edit}
    }

    return (
        <div className="form-group">
            <label htmlFor={props.name}> {props.title} </label>
            <select
                id={props.name}
                name={props.name}
                className="form-control"
                {...hold}
            >
                <option defaultValue="">
                {props.placeholder}
                </option>
                {props.options.map(option => {
                return (
                    <option key={option.name} value={option.name} label={option.name}>
                    {option.name}
                    </option>
                );
                })}
            </select>
        </div>
    );
}

export default Select;