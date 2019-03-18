import React from 'react';
import './Spinner.css';

const Spinner = () => {
    return (
        <div className="mySpinner-container">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}
export default Spinner;