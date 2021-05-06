import React, { Component } from 'react';
import Button from '../Button/Button';
import './Postpone.css'

class Postpone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days_postponement: '',
            reason_postponement: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

            const postponeObject = {
                days_postponement: this.state.days_postponement,
                reason_postponement: this.state.reason_postponement,
            }

            this.setState({
                days_postponement: '',
                reason_postponement: ''
            });

            console.log(postponeObject.days_postponement)
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

    render() {
        return (
            <div className="container postpone-form">
                <form method="POST" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Postpone {this.props.type}</legend>
                        <p>Enter the number of days you want to postpone the {this.props.type} of the plant '{this.props.name}'.</p>

                        <label htmlFor="days_postponement">Number of days postponement</label>
                        <input
                            id="days_postponement"
                            max="365"
                            name="days_postponement"
                            onChange={this.handleInputChange}
                            placeholder="Enter the number of days postponement"
                            ref={this.firstnameInput}
                            required
                            type="number"
                            value={this.state.days_postponement}
                        />

                        <label htmlFor="reason_postponement">Reason for postponement</label>
                        <textarea
                            id="reason_postponement"
                            maxLength="200"
                            name="reason_postponement"
                            onChange={this.handleInputChange}
                            placeholder="Enter a description of the reasoning behind the postponement. The reasoning can help others wanting to take care of the plant"
                            value={this.state.reason_postponement}
                        />

                        <div className="buttons-side-by-side">
                            <Button type="submit" label="postpone" variant="secondary"/>
                            <Button type="reset" label="cancel" variant="danger-outlined"/>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default Postpone;