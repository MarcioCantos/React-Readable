import React from "react";

const TextArea = (props) => {
    console.log('Estou em TextArea:', props)
    return (
        <div className="form-group">
            <label className="form-label">{props.title}</label>
            <textarea
                // className="form-control"
                // name={props.name}
                // rows={props.rows}
                // // cols={props.cols}
                // onChange={props.handleChange}
                // value={props.value}
                // placeholder={props.placeholder}
            />
        </div>
    );
}

export default TextArea;