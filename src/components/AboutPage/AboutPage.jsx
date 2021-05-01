import './AboutPage.css';
import Button from '../Button/Button'
import Bilde from '../../assets/bilde.jpg'
import { Link } from "react-router-dom";

function AboutPage() {

    return (
        <>
            <div className="about-page-grid-container">
                <div className="home-page">
                    <div className="title">
                        <h1 className="heading">Plants at Mustad</h1>
                        <p className="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eleifend suscipit tempor. Ut odio ipsum, cursus vel erat quis, cursus ultricies orci. Sed volutpat velit quis ante laoreet, a varius dui fermentum. </p>
                        <div className="buttons-side-by-side">

                            <Link to="/plants"><Button label="see all plants" size="full" variant="secondary" /></Link>
                            <a href="#about-the-project"><Button label="learn more" size="full" variant="secondary-outlined" /></a>

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
                    <img className="fake-image" src={Bilde} alt="sand" />
                    <div className="biography">
                        <h3>Cornelius</h3>
                        <h4>Back-end Development</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tellus nibh, luctus finibus facilisis nec, commodo id nibh. Etiam enim tortor, pretium in porta quis, pulvinar eget dui. Phasellus sodales est quis maximus volutpat. Praesent nec vestibulum elit. In id velit posuere, consequat ante non, facilisis risus. Fusce vestibulum ante vel lacus bibendum scelerisque. Curabitur pellentesque magna mi, non molestie. </p>
                    </div>
                </div>
                <div className="container the-group-box person2">
                    <img className="fake-image" src={Bilde} alt="sand" />
                    <div className="biography">
                        <h3>Glenn</h3>
                        <h4>Full-stack development</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tellus nibh, luctus finibus facilisis nec, commodo id nibh. Etiam enim tortor, pretium in porta quis, pulvinar eget dui. Phasellus sodales est quis maximus volutpat. Praesent nec vestibulum elit. In id velit posuere, consequat ante non, facilisis risus. Fusce vestibulum ante vel lacus bibendum scelerisque. Curabitur pellentesque magna mi, non molestie. </p>
                    </div>
                </div>
                <div className="container the-group-box person3">
                    <img className="fake-image" src={Bilde} alt="sand" />
                    <div className="biography">
                        <h3>Tom</h3>
                        <h4>Front-end development &amp; Design</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tellus nibh, luctus finibus facilisis nec, commodo id nibh. Etiam enim tortor, pretium in porta quis, pulvinar eget dui. Phasellus sodales est quis maximus volutpat. Praesent nec vestibulum elit. In id velit posuere, consequat ante non, facilisis risus. Fusce vestibulum ante vel lacus bibendum scelerisque. Curabitur pellentesque magna mi, non molestie. </p>
                    </div>
                </div>
                <div className="container the-group-box person4">
                    <img className="fake-image" src={Bilde} alt="sand" />
                    <div className="biography">
                        <h3>Anna</h3>
                        <h4>Design</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tellus nibh, luctus finibus facilisis nec, commodo id nibh. Etiam enim tortor, pretium in porta quis, pulvinar eget dui. Phasellus sodales est quis maximus volutpat. Praesent nec vestibulum elit. In id velit posuere, consequat ante non, facilisis risus. Fusce vestibulum ante vel lacus bibendum scelerisque. Curabitur pellentesque magna mi, non molestie. </p>
                    </div>
                </div>
            </div>
        </>

    )
}

export default AboutPage;