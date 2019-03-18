import React from "react";
import PropTypes from 'prop-types';

const TextArea = (props) => { 
    
    TextArea.propTypes = {
        title: PropTypes.string.isRequired,
    }

    

    return (
        <div className="form-group">
            <label className="form-label">{props.title}</label>
            <textarea
                className="form-control"
                name={props.name}
                rows={props.rows}
                // cols={props.cols}
                placeholder={props.placeholder}
                id={props.name}
                {...props}
            />
        </div>
    );
}

export default TextArea;