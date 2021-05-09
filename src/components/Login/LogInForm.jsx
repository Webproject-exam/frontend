import React, { Component } from 'react';
import './LogInForm.css';
import Button from '../Button/Button';
import { AuthContext } from '../../helpers/Auth';
import { Link, Redirect } from "react-router-dom";
import { notifySuccess, notifyError } from '../../helpers/notification';

class LogInForm extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: false
        }
        this.emailInput = React.createRef();
        this.form = React.createRef();
    }

    componentDidMount() {
        this.emailInput.current.focus();
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
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
                this.emailInput.current.focus();
                notifyError("Wrong email and/or password. Please try again.")
            } else {
                notifySuccess("You are now logged in. 🔓");
                this.setState({ redirect: "/profile" });
            }
        } else {
            notifyError("This form is not valid!");
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
                    <div className="log-in-form container max-width">
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
                                <div className="buttons-side-by-side">
                                <Button type="submit" label="log in" size="auto" variant="secondary" />
                                    <Link to="/reset_password"><Button label="forgot password" size="auto" variant="secondary-outlined" /></Link>
                                    
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </>}
                {this.context.isAuth && <div className="container loggedIn">
                    <p>You're already logged in.</p>
                    <Link to="/profile">Visit your user page here.</Link>
                </div>}
            </>
        );
    }
}

export default LogInForm;