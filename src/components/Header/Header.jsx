import React from 'react';

function Header(props) {
    return (
        <header>
            <h1>{props.heading}</h1>
            <hr/>
        </header>
    );
}

export default Header;