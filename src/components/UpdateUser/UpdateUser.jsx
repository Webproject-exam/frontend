import React, { Component } from 'react';
import Button from '../Button/Button'
import PropTypes from 'prop-types';
import UserFeedbackCard from '../UserFeedbackCard/UserFeedbackCard'
import { AuthContext } from '../../helpers/Auth';
import { toast } from 'react-toastify';
import { notifySuccess, notifyError } from '../../helpers/notification';

/**
 * ## How it works
 * The `UpdateUserForm` component is a controlled form that has inputs depending on where it is rendered. 
 * The form allows the user to either update their own information, including first name, surname, and password. 
 * If the logged-in user is a manager, they can update the information of gardeners, including email, first name, surname, role and password. 
 * When the form is rendered it already includes some of the information of the user. 
 * It gets this data from the '`UpdateUserHOC`' located in '`src/components/HOC/UserListHOC`'. 
 * This HOC file also contains the functionality for sending the data from the front-end to the back-end, 
 * for example, the '`updateProfile`' and '`updateDashboard`' methods that are passed down to the component.
 * A default state is also available (where there is no place specified). 
 * This unused state only renders input fields for first name and surname.
 * 
 * ## Usage
 * @summary `UpdateUserHOC` contains the functionality and UpdateUser only displays data and calls methods from inside `UpdateUserHOC`.
 * 
 * The component can be used in two ways. Either on the logged-in user's profile or the dashboard view.
 * 
 * ### Profile view
 * If the UpdateUser component is used on the profile page, make sure to have the `MyProfileHOC` and `MyProfile` component 
 * working, otherwise, it will not work. This is because the `UpdateUser` form is rendered inside the `MyProfileHOC`.
 * 
 * 1. Import `UpdateUser` from '`src/components/UpdateUser/UpdateUser`' in `MyProfileHOC`.
 * 
 * 2. Because we are using the `UpdateUser` form, we also need to import the `UpdateUserHOC` from '`src/components/HOC/UpdateUserHOC`'
 * 
 * 3. Define a constant inside `MyProfileHOC` that is equal to `UpdateUser` wrapped by `UpdateUserHOC`. For example: `const UpdateUserHOC = updateUserBackend(UpdateUser);`
 * 
 * 4. Because the constant created is equal to an component, we can render it inside the `return` statement inside the render method of `MyProfileHOC`
 * 
 * ### Dashboard view
 * If the `UpdateUser` component is used on the dashboard page, make sure to have the `UserListHOC`, `UserList`, `UserListItem`, and 
 * lastly the `Popup` components working, otherwise, it will not work. This is because the `UpdateUser` form is rendered inside 
 * a `Popup` component located in the `UserListHOC` file.
 * 
 * 1. In the `Popup` component file (`src/components/Popup/Popup`) import the `UpdateUserHOC` file (`src/components/HOC/UpdateUserHOC`) 
 *    and the `UpdateUser` component from (`src/components/UpdateUser/UpdateUser`)
 * 
 * 2. Import the `Popup` component (`src/components/Popup/Popup`) in the `UserListHOC` file
 * 
 * 3. Define a constant inside `Popup` that is equal to `UpdateUser` wrapped by `UpdateUserHOC`. For example: 
 *    `const UpdateUserHOC = updateUserBackend(UpdateUser);`
 * 
 * 4. Because the constant created is equal to a component, we can render it inside the return statement inside 
 *    the render method of `Popup`. The form will now be rendered as a popup 'above' the other content.
 */

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
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClosePassword = this.handleClosePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
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
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    getPayload() {
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
    async handleSubmit(event) {
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

    generalValidation() {
        return this.form.current.reportValidity();
    }

    passwordValidation() {
        if (this.state.password && this.state.repeatpassword && this.state.oldPassword) {
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
        } else if (this.state.password || this.state.repeatpassword || this.state.oldPassword) {
            notifyError("You need to enter all password fields");
            return false;
        } else {
            return true;
        }

    }

    //Close the red error message that pops up when the two passwords do not match
    handleClosePassword() {
        this.setState({
            passwordError: false
        });
        this.passwordInput.current.focus();
    }

    //part of 'react-toastify'
    notifySuccess = () => {
        toast.success("The user has been updated", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };

    //part of 'react-toastify'
    notifyError = () => {
        toast.error("The form did not pass validation", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };

    //part of 'react-toastify'
    passwordError = () => {
        toast.error("The passwords entered do not match.", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };

    render() {
        return (
            <>
                <div className="container">
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
                            {this.state.passwordError && <UserFeedbackCard onClick={this.handleClosePassword} variant="error" feedbackText="The passwords entered are not the same." />}
                            <Button type="submit" label="update" />
                            {this.props.place === 'dashboard' &&
                                <>
                                    <Button type="button" label="reset password" variant="danger" onClick={this.props.onResetClick} />
                                    <Button type="button" label="cancel" variant="danger-outlined" onClick={this.props.onAbortClick} />
                                </>
                            }

                        </fieldset>
                    </form>
                </div>
            </>
        );
    }
}

//#region JSDoc for Storybook & default props

UpdateUserForm.defaultProps = {
    place: 'none'
}

UpdateUserForm.propTypes = {
    /** 
     * The place props decides what input fields to show. On the users profile password fields are 
     * rendered, but not an email input. If the place is dashboard a email input is rendered, but no password fields.
    */
    place: PropTypes.oneOf(['profile', 'dashboard', 'none']).isRequired,

    /** Fills the form with the current information of the user, making it easy to edit the information. */
    selectedUser: PropTypes.shape({
        email: PropTypes.string,
        name: PropTypes.string,
        role: PropTypes.oneOf(['gardener', 'manager']),
        surname: PropTypes.string,
    }).isRequired,

    /** eventHandler to update a user that is not the currently logged in user. */
    onUpdateDashboard: PropTypes.func,

    /** eventHandler to update the currently logged in user. */
    onUpdateProfile: PropTypes.func,

    /** eventHandler to exit the editing process (pressing cancel button -> clears the selected user and closes the form) */
    onAbortClick: PropTypes.func,

    /** eventHandler to reset the users password */
    onResetClick: PropTypes.func
}

//#endregion

export default UpdateUserForm;