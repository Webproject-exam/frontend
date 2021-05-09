//https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-with-react-hook-ba77c37c7e82 
//Updated version 17 April 2019 (by Олег Чулановский)
/* https://stackoverflow.com/a/46586315 */

import React, { useState, useRef, useEffect } from 'react';
import './NavBar.css';
import Button from '../Button/Button'
import PropTypes from 'prop-types';
import accountCircle from '../../assets/account_circle.svg';
import { Link, NavLink } from "react-router-dom";
import { notifySuccess } from '../../helpers/notification';

function Nav(props) {
    const [open, setOpen] = useState(false);
    const [isDesktop, setDesktop] = useState(window.innerWidth > 500);
    const node = useRef();

    const updateMedia = () => {
        setDesktop(window.innerWidth > 500);
    };

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

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    return (
        <nav className="navbar" aria-label="Main Navigation">

            {isDesktop ? (
                <>
                    <Link to="/plants">Plantrol</Link>

                    <div className="nav-links">
                        <NavLink exact to="/plants">Overview</NavLink>
                        <NavLink exact to="/">About</NavLink>
                    </div>

                    <div className="navbar-account">
                        {!props.auth && (
                            <Link to="/login">LOG IN</Link>
                        )}

                        {props.auth && (
                            <>
                                <span>{props.role}</span>
                                <div onClick={handleMenu} className="navbar-icon" ref={node}>

                                    <button className="hidden" aria-haspopup="true" aria-expanded="false"><img src={accountCircle} alt="Account" onClick={handleMenu} /></button>

                                    {open &&
                                        <div className="navbar dropdown">
                                            <ul className="navbar dropdown-content">
                                                <li onClick={handleMenu} className="dropdown-li">
                                                    <Link to="/profile">Profile</Link>
                                                </li>

                                                {props.role === "manager" &&
                                                    <li onClick={handleMenu}>
                                                        <Link to="/manage">Manage Page</Link>
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
                    </div>
                </>
            ) : (
                /* mobil */
                <>
                    <div className="nav-links">
                        <NavLink exact to="/plants">Overview</NavLink>
                        <NavLink exact to="/">About</NavLink>
                    </div>

                    <div className="navbar-account">
                        {!props.auth && (
                            <Link to="/login">
                                <Button label="log in" />
                            </Link>
                        )}

                        {props.auth && (
                            <>
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
                                                        <Link to="/manage">Manage Page</Link>
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