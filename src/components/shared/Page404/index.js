import React from 'react';
import NavLink from 'react-bootstrap/NavLink';
import './Page404.css'

const Page404 = (props) => {
    return (
        <div id="notfound">            
            <div className="notfound">
                <div className="notfound-404">
                    <h1>Oops!</h1>
                    <h2>404 - The Page can't be found</h2>
                </div>
                <h6>{props.msg}</h6>
                <NavLink href='/'>Go TO Home</NavLink>
            </div>
        </div>
    );
};

export default Page404;