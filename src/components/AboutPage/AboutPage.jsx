import './AboutPage.css';
import Button from '../Button/Button'
import PhotoTom from '../../assets/tom.jpg'
import PhotoGlenn from '../../assets/glenn.jpg'
import PhotoCornelius from '../../assets/cornelius.jpg'
import { Link } from "react-router-dom";

function AboutPage() {

    return (
        <>
            <div className="about-page-grid-container">
                <div className="home-page">
                    <div className="title">
                        <h1 className="heading">Plantrol</h1>
                        <p className="slogan">Controlling the plants every day helps you work, rest and play.</p>
                        <div className="buttons-side-by-side">
                            <a href="#about-the-project"><Button label="learn more" size="full" variant="secondary-outlined" /></a>
                            <Link to="/plants"><Button label="see all plants" size="full" variant="secondary" /></Link>
                        </div>
                    </div>
                </div>


                <h2 className="about-the-project" id="about-the-project">About the project</h2>

                <div className="container about-project-box box1">
                    <h3>The Task</h3>
                    <p>Plantrol is a tool to help employees at Mustad to track the well-being of the plants located throughout the campus. Gardeners can use the tool to keep track of when a plant has been watered and be notified when a specific plant needs watering. General users can also contribute by requesting watering and fertilization.</p>
                </div>
                <div className="container about-project-box box2">
                    <h3>The Design</h3>
                    <p>The tool was designed during easter of 2021 and is strongly inspired by the Google Material UI look. With the help of Balsamiq, early designs were created and later refined in a more high-fidelity prototype using Figma. Each UI element displayed throughout the tool is each own independent React component resulting in a modular design.</p>
                </div>
                <div className="container about-project-box box3">
                    <h3>The Development</h3>
                    <p>The development of the project started in late April 2021. Plantrol is built with the help of React and our NodeJS API. All the plants and their information is stored in MongoDB.</p>
                </div>

                <h2 className="the-group">The Group</h2>
                <div className="container the-group-box person1">
                    <img className="about-page-image" src={PhotoCornelius} alt="" />
                    <div className="biography">
                        <h3>Cornelius</h3>
                        <h4 className="low-emphasis-header">Back-end Development</h4>
                        <p className="low-emphasis-text">I became the main responsible for developing the back-end of Plantrol. I created the following: database with MongoDB Atlas, the schema for users, plants and refresh token, routes, controllers, helpers, authentication, and authorization with JWT.</p>
                    </div>
                </div>
                <div className="container the-group-box person2">
                    <img className="about-page-image" src={PhotoGlenn} alt="" />
                    <div className="biography">
                        <h3>Glenn</h3>
                        <h4 className="low-emphasis-header">Full-stack development</h4>
                        <p className="low-emphasis-text">As responsible for the "Full-stack" of this application, my main tasks have been to connect the front-end to the back-end and write the logic behind most of the components. To accomplish this, I have used my JavaScript skillset to come up with solutions that would accomplish these tasks.</p>
                    </div>
                </div>
                <div className="container the-group-box person3">
                    <img className="about-page-image" src={PhotoTom} alt="" />
                    <div className="biography">
                        <h3>Tom</h3>
                        <h4 className="low-emphasis-header">Front-end development &amp; Design</h4>
                        <p className="low-emphasis-text">As responsible for the design and the front-end, I have designed the great majority of the visual elements you see and interact with on Plantrol.  To accomplish this, I have used React components that – when put together – form the entire application.</p>
                    </div>
                </div>
            </div>
        </>

    )
}

export default AboutPage;