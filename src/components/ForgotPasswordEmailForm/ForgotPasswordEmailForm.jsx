import React, { Component } from 'react';
import './ForgotPasswordEmailForm.css';
import Button from '../Button/Button'
import PropTypes from 'prop-types';
import UserFeedbackCard from '../UserFeedbackCard/UserFeedbackCard';
import passwordIcon from '../../assets/password_black_24dp.svg';
import { notifySuccess, notifyError } from '../../helpers/notification';

/**
 * ## How it works
 * `ForgotPasswordEmailForm` is a controlled class component where users can enter their email if they have forgotten their password. 
 * `ForgotPasswordEmailForm` returns an HTML `<form>` with an email input. At the bottom, there is an `<Button />` component that the 
 * user can press when the form is filled out.
 * 
 * Its `handleSubmit()` method uses `onSubmitHandler`from its HOC via props. 
 * The `handleSubmit()` method reads the email entered from the state and sends it 
 * to the back-end via `this.props.onSubmitHandler(email)`. 
 * Lastly, it sets the `isSubmitted` state to `true`.
 * 
 * If the form is successfully submitted a `<UserFeedbackCard />` component will appear 
 * notifying that the email is sent. This pop-up can be closed with the `handleClose()` method.
 * 
 * ## Usage
 * The `ForgotPasswordEmailForm` is expected to be used once.
 * 
 * 1. Import `ForgotPasswordEmailForm` from `src/components/ForgotPasswordEmailForm/ForgotPasswordEmailForm`
 * 2. Import forgotBackend from `src/components/HOC/ForgotPassHOC`
 * 3. Create a constant that is equal to `forgotBackend(ForgotPasswordEmailForm)` 
 *    (The constant is now equal to a component) For example: '`const ForgotPassHOC = forgotBackend(ForgotPasswordEmailForm);`'
 * 4. Lastly, write `<ForgotPassHOC />` where you want the form to appear on the page when rendered.
 */

class ForgotPasswordEmailForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: '',
            formSubmitted: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.form = React.createRef();
        this.emailInput = React.createRef();
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        if (this.validation()) {
            this.setState({ formSubmitted: true });
            
            const email = this.state.email;

            notifySuccess(`An email with further instructions is sent to '${email}'.`)

            await this.props.onSubmitHandler(email);


        } else {
            this.setState({ error: "The form is not valid!" });
            notifyError("The form did not pass validation.")
        }
    }

    //The handleInputChange method saves the form values in the state.
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleClose() {
        this.setState({
            error: '',
            formSubmitted: false
        });
        this.emailInput.current.focus();
    }

    componentDidMount() {
        this.emailInput.current.focus();
    }

    validation() {
        return this.form.current.reportValidity();
    }

    render() {
        return (
            <div className="container forgot-password-email-form">
                <img src={passwordIcon} alt="" />
                <form ref={this.form} onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Forgot password</legend>
                        <p>If you have forgotten your password, you can use this form to reset your password. You will receive an email with instructions. </p>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            onChange={this.handleInputChange}
                            placeholder="Enter Your Email"
                            ref={this.emailInput}
                            required
                            type="email"
                            value={this.state.email}
                        />
                        <p className="low-emphasis-text form-explain">The email address you are registered with is required to reset your password.</p>
                        {this.state.formSubmitted && <UserFeedbackCard variant="success" feedbackText={`an email with further instructions is sent to ${this.state.email}.`} onClick={this.handleClose} />}

                        <Button type="submit" label="reset password" size="full" />
                    </fieldset>
                </form>
            </div>
        );
    }
}

ForgotPasswordEmailForm.propTypes = {
    onSubmitHandler: PropTypes.func
}

export default ForgotPasswordEmailForm;