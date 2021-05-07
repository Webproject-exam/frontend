/* https://stackoverflow.com/a/46586315 */
import React, { useState, useEffect } from 'react';
import './Footer.css';
import Logo from '../../assets/logo.png'


function Footer() {
    const [isDesktop, setDesktop] = useState(window.innerWidth > 550);

    const updateMedia = () => {
        setDesktop(window.innerWidth > 550);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    return (
        <footer className="footer-flex-container">
            {isDesktop ? (<img src={Logo} alt="NTNU logo" className="logo" />) : (<></>)}
            <p>Made by Cornelius, Glenn and Tom – 2021</p>
            <a rel="license noreferrer" href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">
                <img alt="Creative Commons-lisens" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" />
            </a>
        </footer>
    )
}

export default Footer;