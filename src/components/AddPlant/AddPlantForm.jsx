import React, { Component } from 'react';
import { notifyError, notifySuccess } from '../../helpers/notification';
import Button from '../Button/Button';
import UserFeedbackCard from '../UserFeedbackCard/UserFeedbackCard';
import addUserIcon from '../../assets/person_add_black_24dp.svg';
import { emailIsValid } from '../../helpers/validation';

class AddPlantForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            surname: '',
            email: '',
            role: 'gardener',
            password: '',
            repeatpassword: '',
            passwordError: false,
            submitted: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.form = React.createRef();
        this.firstnameInput = React.createRef();
        this.passwordInput = React.createRef();
    }

    //Set focus to the first input field of the form: first name
    componentDidMount() {
        this.firstnameInput.current.focus();
    }

    //General InputChangeHandler that saves the value of the input field to the state
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    //HandleSubmit runs two validators, first checking if the passwords match, after that, a more general form validator.
    //Then call the onSubmitHandler prop and send the state to the database.
    async handleSubmit(event) {
        event.preventDefault();

        if (this.generalValidation() && this.passwordValidation()) {
            const userObject = {
                name: this.state.firstname,
                surname: this.state.surname,
                email: this.state.email,
                role: this.state.role,
                password: this.state.password
            }
            //add the information from the state to database
            await this.props.onSubmitHandler(userObject);

            if (this.props.error) {
                notifyError(this.props.error);
                return
            } else {
                notifySuccess(`The user ${this.state.firstname} ${this.state.surname} has been added.`);
                this.setState({
                    firstname: '',
                    surname: '',
                    email: '',
                    role: 'gardener',
                    password: '',
                    repeatpassword: '',
                    submitted: true
                })
            }
        } else {
            notifyError('The form is invalid!');
        }
    }

    generalValidation() {

        if (!emailIsValid(this.state.email)) {
            notifyError('Invalid email');
            return false
        }

        if (emailIsValid(this.state.email) && this.form.current.reportValidity()) {
            return true;
        }
    }

    passwordValidation() {
        if (this.state.password === this.state.repeatpassword) {
            this.setState({
                passwordError: false
            });
            return true;
        } else {
            this.setState({
                passwordError: true
            });
            notifyError('The passwords entered do not match.')
            return false;
        }
    }

    //Close the red error message that pops up when the two passwords do not match
    handleClose() {
        this.setState({
            passwordError: false,
            submitted: false
        });
        this.passwordInput.current.focus();
    }

    render() {
        return (
            <>
                <div className="container">
                    <img className="icon" src={addUserIcon} alt="" />
                    <form ref={this.form} onSubmit={this.handleSubmit} className="add-user-form">
                        <fieldset>
                            <legend>Add a new plant</legend>
                            <div className="add-user-grid-container">
                                <div className="first-name-grid-item">
                                    <label htmlFor="plantname">plant name</label>
                                    <input
                                        id="firstname"
                                        name="firstname"
                                        onChange={this.handleInputChange}
                                        placeholder="Enter Their First Name"
                                        ref={this.firstnameInput}
                                        required
                                        type="text"
                                        value={this.state.firstname}
                                    />
                                </div>

                                <div className="surname-grid-item">
                                    <label htmlFor="surname">surname</label>
                                    <input
                                        id="surname"
                                        name="surname"
                                        onChange={this.handleInputChange}
                                        placeholder="Enter Their Surname"
                                        required
                                        type="text"
                                        value={this.state.surname}
                                    />
                                </div>

                                <div className="email-grid-item">
                                    <label htmlFor="email">email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        onChange={this.handleInputChange} value={this.state.email}
                                        placeholder="Enter Their Email"
                                        required
                                        type="email"
                                    />
                                </div>

                                <div className="role-grid-item">
                                    <label htmlFor="role">role</label>
                                    <select
                                        id="role"
                                        name="role"
                                        onChange={this.handleInputChange}
                                        value={this.state.role}
                                    >
                                        <option value="gardener">Gardener</option>
                                        <option value="manager">Manager</option>
                                    </select>
                                </div>

                                <div className="password-grid-item">
                                    <label htmlFor="password">password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        onChange={this.handleInputChange}
                                        pattern=".{8,}"
                                        placeholder="Enter Their Password"
                                        ref={this.passwordInput}
                                        required
                                        title="Eight or more characters"
                                        type="password"
                                        value={this.state.password}
                                    />
                                </div>

                                <div className="repeat-password-grid-item">
                                    <label htmlFor="repeatpassword">repeat password</label>
                                    <input
                                        id="repeatpassword"
                                        name="repeatpassword"
                                        onChange={this.handleInputChange}
                                        placeholder="Repeat Their Password"
                                        required
                                        type="password"
                                        value={this.state.repeatpassword}
                                    />
                                </div>
                            </div>

                            {this.state.passwordError && <UserFeedbackCard variant="error" onClick={this.handleClose} feedbackText="The passwords entered are not the same." />}
                            {this.state.submitted && <UserFeedbackCard variant="success" onClick={this.handleClose} feedbackText="The user has been added" />}
                            {this.props.error && <UserFeedbackCard variant="error" onClick={this.props.removeErrorHandler} feedbackText="The email is already in use" />}

                            <Button label="add new user" size="full" variant="primary" type="submit" />
                        </fieldset>
                    </form>
                </div>
            </>
        );
    }
}
 
export default AddPlantForm;