import React, { Component } from 'react';
import './LogInForm.css';
import Button from '../Button/Button'
import UserFeedbackCard from '../UserFeedbackCard/UserFeedbackCard'
import lockClosedIcon from '../../assets/lock_black_24dp.svg';
import lockOpenIcon from '../../assets/lock_open_black_24dp.svg';
import { AuthContext } from '../../helpers/Auth';
import { Link, Redirect } from "react-router-dom";
import { notifySuccess, notifyError } from '../../helpers/notification';

/**
 * ## How it works
 * The LogInForm component is a controlled form with inputs for the 
 * user's email and their password. At the bottom, a link to `/reset_password` is provided. 
 * When a user successfully logs in they are redirected to `/profile`. When the 
 * user submits the form the information saved in the state is sent to the 
 * back and via the `login` method provided by `static contextType = AuthContext;` 
 * If the user already is logged in and tries to visit the login form it 
 * informs the user that they are already logged in.
 * 
 * ## Usage
 * 1. Import the LogInForm component from `src/component/Login/LogInForm`
 * 2. Place `<LogInForm />` where you want the form to appear on the page.
 * 3. Note: the context must be set before utilizing the LogInForm component.
 */

class LogInForm extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: false,
            redirect: false
        }
        this.emailInput = React.createRef();
        this.form = React.createRef();
        this.handleClose = this.handleClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.emailInput.current.focus();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    //close the UserFeedbackCard when it is pressed, 
    //then set the focus back to the email input
    handleClose() {
        this.setState({
            error: false
        });
        this.emailInput.current.focus();
    }

    //extract the email and password from the state, then use the login method from the context
    //and send it to the back end
    handleSubmit = async (event) => {
        event.preventDefault();

        if (this.validation()) {
            const { email, password } = this.state;
            const res = await this.context.login({ email, password });

            if (res.error) {
                //The user is most probably not found in the database
                this.setState({ error: true });
                this.emailInput.current.focus();
                notifyError("Wrong email and/or password. Please try again.")
            } else {
                notifySuccess("You are now logged in.")
                this.setState({ redirect: "/profile" });
            }
        } else {
            notifyError("This form is not valid!");
            this.setState({ error: true });
        }
    }

    validation() {
        return this.form.current.reportValidity();
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={this.state.redirect} />)
        }

        return (
            <>
                {!this.context.isAuth && <>
                    <div className="container">
                        <img src={lockClosedIcon} alt="" />
                        <form ref={this.form} onSubmit={this.handleSubmit}>
                            <fieldset>
                                <legend>Log In</legend>
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

                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    onChange={this.handleInputChange}
                                    placeholder="Enter Your Password"
                                    required
                                    type="password"
                                    value={this.state.password}
                                />

                                <Button type="submit" label="log in" variant="primary" size="full" />
                            </fieldset>
                        </form>

                        {this.state.error && <UserFeedbackCard onClick={this.handleClose} variant="error" feedbackText="Wrong email and/or password. Please try again." />}
                        <Link to="/reset_password">Forgot password?</Link>
                    </div>
                </>}
                {this.context.isAuth && <div className="container loggedIn">
                    <img src={lockOpenIcon} alt="" />
                    <p>You're already logged in.</p>
                    <Link to="/profile">Visit your user page here.</Link>
                </div>}
            </>
        );
    }
}

export default LogInForm;