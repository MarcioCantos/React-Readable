import React from "react";

const TextArea = (props) => {    
    const { edit } = props.bind;
    let hold = props;
    
    if(edit && props.value === ''){
        hold = {...props, value : edit}
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
                {...hold}
            />
        </div>
    );
}

export default TextArea;