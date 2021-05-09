import React, { Component } from 'react';
import './ForgotPasswordEmailForm.css';
import Button from '../Button/Button'
import { emailIsValid } from '../../helpers/validation';
import { notifySuccess, notifyError } from '../../helpers/notification';

class ForgotPasswordEmailForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: null
        }

        this.form = React.createRef();
        this.emailInput = React.createRef();
    }

    handleSubmit = async (event) => {
        const email = this.state.email;
        event.preventDefault();

        if (emailIsValid(email)) {

            notifySuccess(`An email with further instructions is sent to '${email}'.`)

            await this.props.onSubmitHandler(email);

        } else {
            this.setState({ error: true });
            this.emailInput.current.focus();
            notifyError("The email entered did not pass validation.")
        }
    }

    //The handleInputChange method saves the form values in the state.
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    componentDidMount() {
        this.emailInput.current.focus();
    }

    render() {
        return (
            <div className="container forgot-password-email-form max-width">
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

                        <Button type="submit" label="reset password" size="full" />
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default ForgotPasswordEmailForm;