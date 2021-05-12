import React, { Component } from 'react';
import Button from '../Button/Button';
import { AuthContext } from '../../helpers/Auth';
import { notifySuccess, notifyError } from '../../helpers/notification';

class UpdateUserForm extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            surname: '',
            role: '',
            email: '',
            userEmail: '',
            oldPassword: '',
            password: '',
            repeatpassword: '',
            passwordError: false
        }

        this.form = React.createRef();
        this.firstnameInput = React.createRef();
        this.passwordInput = React.createRef();
    }

    //Set focus to the first input field of the form: first name
    componentDidMount() {
        this.firstnameInput.current.focus();
        if (this.props.place === "dashboard") {

            this.pronoun = 'their';

            this.setState({
                firstname: this.props.selectedUser.name,
                surname: this.props.selectedUser.surname,
                role: this.props.selectedUser.role,
                userEmail: this.props.selectedUser.email
            })
        } else {
            this.pronoun = 'your'

            this.setState({
                firstname: this.props.selectedUser.name,
                surname: this.props.selectedUser.surname
            })
        }
    }

    //General InputChangeHandler that saves the value of the input field to the state
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    getPayload = () => {
        let payloadObj = {}

        if (this.props.place) {
            payloadObj.place = this.props.place
        }

        if (this.props.selectedUser.email) {
            payloadObj.selectedUser = this.props.selectedUser.email;
        }

        if (this.state.email) {
            payloadObj.email = this.state.email
        }

        if (this.state.firstname) {
            payloadObj.name = this.state.firstname
        }

        if (this.state.surname) {
            payloadObj.surname = this.state.surname
        }

        if (this.state.role) {
            payloadObj.role = this.state.role
        }

        if (this.state.oldPassword) {
            payloadObj.oldPassword = this.state.oldPassword
        }

        if (this.state.password) {
            payloadObj.password = this.state.password
        }

        return payloadObj;
    }

    //HandleSubmit runs two validators, first checking if the passwords match, thereafter a more general form validator
    handleSubmit = async (event) => {
        event.preventDefault();

        if (this.generalValidation() && this.passwordValidation()) {
            const userObject = this.getPayload()

            if (this.props.place === "dashboard") {
                await this.props.onUpdateDashboard(userObject);

                if (this.props.error) {
                    notifyError(`There was an error: ${this.props.error}`)
                } else {
                    notifySuccess('The user has been updated')
                }
            } else {
                await this.props.onUpdateProfile(userObject);

                if (this.props.error) {
                    notifyError(`There was an error: ${this.props.error}`)
                } else {
                    notifySuccess('The user has been updated')
                }
            }
        }
    }

    generalValidation = () => {
        return this.form.current.reportValidity();
    }

    passwordValidation = () => {
        if (this.state.password && this.state.repeatpassword && this.state.oldPassword) {
            if (this.state.password === this.state.repeatpassword) {
                return true;
            } else {
                notifyError('The passwords entered do not match.')
                return false;
            }
        } else if (this.state.password || this.state.repeatpassword || this.state.oldPassword) {
            notifyError("You need to enter all password fields");
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <>
                <div className="container max-width">
                    <form ref={this.form} onSubmit={this.handleSubmit} method="POST">
                        <fieldset>
                            <legend>Update {this.pronoun} user information</legend>
                            {this.props.place === "dashboard" &&
                                <>
                                    <label htmlFor="email">email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        onChange={this.handleInputChange}
                                        placeholder={this.state.userEmail}
                                        type="email"
                                        value={this.state.email}
                                    />
                                </>}

                            <label htmlFor="firstname">first name</label>
                            <input
                                id="firstname"
                                name="firstname"
                                onChange={this.handleInputChange}
                                placeholder="Enter Your New First Name"
                                ref={this.firstnameInput}
                                type="text"
                                value={this.state.firstname}
                            />

                            <label htmlFor="surname">surname</label>
                            <input
                                id="surname"
                                name="surname"
                                onChange={this.handleInputChange}
                                placeholder="Enter Your New Surname"
                                type="text"
                                value={this.state.surname}
                            />

                            {this.props.place === "dashboard" &&
                                <>
                                    <label htmlFor="role">role</label>
                                    <select
                                        id="role"
                                        name="role"
                                        onChange={this.handleInputChange}
                                        value={this.state.role}
                                    >
                                        <option value="">Choose role</option>
                                        <option value="gardener">Gardener</option>
                                        <option value="manager">Manager</option>
                                    </select>
                                </>}

                            {this.props.place === "profile" &&
                                <>
                                    <label htmlFor="password">new password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        onChange={this.handleInputChange}
                                        pattern=".{8,}"
                                        placeholder="Enter Your New Password"
                                        ref={this.passwordInput}
                                        title="Eight or more characters"
                                        type="password"
                                        value={this.state.password}
                                    />

                                    <label htmlFor="repeatpassword">repeat new password</label>
                                    <input
                                        id="repeatpassword"
                                        name="repeatpassword"
                                        onChange={this.handleInputChange}
                                        pattern=".{8,}"
                                        placeholder="Repeat Your New Password"
                                        title="Eight or more characters"
                                        type="password"
                                        value={this.state.repeatpassword}
                                    />

                                    <label htmlFor="oldPassword">old password</label>
                                    <input
                                        id="oldPassword"
                                        name="oldPassword"
                                        onChange={this.handleInputChange}
                                        placeholder="Enter Your Old Password"
                                        title="Eight or more characters"
                                        type="password"
                                        value={this.state.oldPassword}
                                    />
                                </>}
                            <Button type="submit" label="update" />
                            {this.props.place === 'dashboard' &&
                                <Button type="button" label="reset password" variant="danger" onClick={this.props.onResetClick} />
                            }
                            <Button type="button" label="cancel" variant="danger-outlined" onClick={this.props.onAbortClick} />

                        </fieldset>
                    </form>
                </div>
            </>
        );
    }
}

export default UpdateUserForm;