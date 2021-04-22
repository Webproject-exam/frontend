//https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-with-react-hook-ba77c37c7e82 
//Updated version 17 April 2019 (by Олег Чулановский)

import React, { useState, useRef, useEffect } from 'react';
import './NavBar.css';
import Button from '../Button/Button'
import PropTypes from 'prop-types';
import accountCircle from '../../assets/account_circle.svg';
import { Link, NavLink } from "react-router-dom";
import { notifySuccess } from '../../helpers/notification';

/**
 * ## How it works
 * The navigation bar is – as its name suggests – used for navigation. 
 * It includes a title and a button for logging in if the user is logged out, 
 * and an account icon if the user is logged in. The account icon is clickable 
 * and displays a dropdown menu with links to other destinations. It gets its functionality 
 * from its HOC component `NavBarHOC` found in `src/components/HOC/NavBar`
 * 
 * ## Usage
 * 1. Import `NavBarHOC` from `src/components/HOC/NavBar` 
 * 2. Import `NavBar` from `src/components/NavBar/NavBar` 
 * 3. Create a constant that is equal to `NavBar` wrapped by its HOC (`NavBarHOC`) For example: `const NavBarHOC = navBarBackend(NavBar);`
 * 4. Lastly, write the constant where you want the navigation bar to show up. In our case, we would write `'<NavBarHOC />'`
 */

function Nav(props) {
    const [open, setOpen] = useState(false);
    const node = useRef();

    const handleMenu = () => {
        setOpen(!open);
    }

    const handleLogOut = () => {
        props.handleLogOut();
        notifySuccess("You are now logged out. Goodbye 👋");

    }

    const handleClickOutside = e => {
        if (node.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <nav className="navbar">
            <h1>
                <Link to="/">Plants at Mustad</Link>
            </h1>

            <div className="nav-links">
                <NavLink exact to="/">Overview</NavLink>
                <NavLink exact to="/about">About</NavLink>
            </div>

            {!props.auth && (
                <Link to="/login">
                    <Button label="log in" />
                </Link>
            )}
            {props.auth && (
                <>
                    <span>{props.role}</span>
                    <div onClick={handleMenu} className="navbar-icon" ref={node}>

                        <img src={accountCircle} alt="Account Circle icon" onClick={handleMenu} />

                        {open &&
                            <div className="navbar dropdown">
                                <ul className="navbar dropdown-content">
                                    <li onClick={handleMenu} className="dropdown-li">
                                        <Link to="/profile">Profile</Link>
                                    </li>

                                    {props.role === "manager" &&
                                        <li onClick={handleMenu}>
                                            <Link to="/dashboard">Dashboard</Link>
                                        </li>}

                                    <li onClick={function () { handleLogOut(); handleMenu(); }}>
                                        <Link to="/login">Log out</Link>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </>
            )}
        </nav>
    );
}

Nav.defaultProps = {
    auth: false,
    role: 'gardener',
}

Nav.propTypes = {
    /** 
     * The auth prop indicate if a user is logged in or not
    */
    auth: PropTypes.bool,

    /** 
     * The handleLogOut method is ran when a logged in user presses 'Log out'
    */
    handleLogOut: PropTypes.func,

    /**
     * The role is the current role of the logged in user. It decides if the user can accsess the dashboard or not.
     */
    role: PropTypes.oneOf(['gardener', 'manager']),
}

export default Nav;