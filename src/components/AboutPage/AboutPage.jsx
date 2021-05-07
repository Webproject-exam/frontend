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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tellus nibh, luctus finibus facilisis nec, commodo id nibh. Etiam enim tortor, pretium in porta quis, pulvinar eget dui. Phasellus sodales est quis maximus volutpat. Praesent nec vestibulum elit. In id velit posuere, consequat ante non, facilisis risus. Fusce vestibulum ante vel lacus bibendum scelerisque. Curabitur pellentesque magna mi, non molestie. </p>
                </div>
                <div className="container about-project-box box2">
                    <h3>The Design</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tellus nibh, luctus finibus facilisis nec, commodo id nibh. Etiam enim tortor, pretium in porta quis, pulvinar eget dui. Phasellus sodales est quis maximus volutpat. Praesent nec vestibulum elit. In id velit posuere, consequat ante non, facilisis risus. Fusce vestibulum ante vel lacus bibendum scelerisque. Curabitur pellentesque magna mi, non molestie. </p>
                </div>
                <div className="container about-project-box box3">
                    <h3>The Development</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tellus nibh, luctus finibus facilisis nec, commodo id nibh. Etiam enim tortor, pretium in porta quis, pulvinar eget dui. Phasellus sodales est quis maximus volutpat. Praesent nec vestibulum elit. In id velit posuere, consequat ante non, facilisis risus. Fusce vestibulum ante vel lacus bibendum scelerisque. Curabitur pellentesque magna mi, non molestie. </p>
                </div>

                <h2 className="the-group">The Group</h2>
                <div className="container the-group-box person1">
                    <img className="about-page-image" src={PhotoCornelius} alt="sand" />
                    <div className="biography">
                        <h3>Cornelius</h3>
                        <h4 className="low-emphasis-header">Back-end Development</h4>
                        <p className="low-emphasis-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tellus nibh, luctus finibus facilisis nec, commodo id nibh. Etiam enim tortor, pretium in porta quis, pulvinar eget dui. Phasellus sodales est quis maximus volutpat. Praesent nec vestibulum elit. In id velit posuere, consequat ante non, facilisis risus. Fusce vestibulum ante vel lacus bibendum scelerisque. Curabitur pellentesque magna mi, non molestie. </p>
                    </div>
                </div>
                <div className="container the-group-box person2">
                    <img className="about-page-image" src={PhotoGlenn} alt="sand" />
                    <div className="biography">
                        <h3>Glenn</h3>
                        <h4 className="low-emphasis-header">Full-stack development</h4>
                        <p className="low-emphasis-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tellus nibh, luctus finibus facilisis nec, commodo id nibh. Etiam enim tortor, pretium in porta quis, pulvinar eget dui. Phasellus sodales est quis maximus volutpat. Praesent nec vestibulum elit. In id velit posuere, consequat ante non, facilisis risus. Fusce vestibulum ante vel lacus bibendum scelerisque. Curabitur pellentesque magna mi, non molestie. </p>
                    </div>
                </div>
                <div className="container the-group-box person3">
                    <img className="about-page-image" src={PhotoTom} alt="sand" />
                    <div className="biography">
                        <h3>Tom</h3>
                        <h4 className="low-emphasis-header">Front-end development &amp; Design</h4>
                        <p className="low-emphasis-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tellus nibh, luctus finibus facilisis nec, commodo id nibh. Etiam enim tortor, pretium in porta quis, pulvinar eget dui. Phasellus sodales est quis maximus volutpat. Praesent nec vestibulum elit. In id velit posuere, consequat ante non, facilisis risus. Fusce vestibulum ante vel lacus bibendum scelerisque. Curabitur pellentesque magna mi, non molestie. </p>
                    </div>
                </div>
            </div>
        </>

    )
}

export default AboutPage;