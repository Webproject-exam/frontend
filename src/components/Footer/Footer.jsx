import './Footer.css';


function Footer() {

    return (
            <footer className="footer-grid-container">
                <div className="logo">
                    <p>Plants at Mustad</p>
                </div>
                <div className="names"><p>Made by Cornelius, Glenn, Tom and Wimonrat – 2021</p></div>
                <div className="copyright">
                    <a rel="license noreferrer" href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">
                        <img alt="Creative Commons-lisens" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" />
                    </a>
                </div>
            </footer>
    )
}

export default Footer;