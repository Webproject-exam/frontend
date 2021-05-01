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
                <form method="POST">
                    <fieldset>
                        <legend>Postpone {this.props.type}</legend>
                        <p>Enter the number of days you want to postpone the {this.props.type} of the plant '{this.props.name}'.</p>

                        <label htmlFor="days_postponement">Number of days postponement</label>
                        <input
                            id="days_postponement"
                            name="days_postponement"
                            onChange={this.handleInputChange}
                            placeholder="Enter the number of days postponement"
                            ref={this.firstnameInput}
                            type="number"
                            value={this.state.days_postponement}
                            required
                            max="365"
                        />

                        <label htmlFor="reason_postponement">Reason for postponement</label>
                        <textarea
                            id="reason_postponement"
                            name="reason_postponement"

                            onChange={this.handleInputChange}
                            value={this.state.reason_postponement}
                            placeholder="Enter a description of the reasoning behind the postponement. The reasoning can help others wanting to water the plant"
                            maxLength="200"
                        />

                        <div className="buttons-side-by-side">
                            <Button type="button" label="postpone" variant="secondary" onClick={console.log("postpone")} />
                            <Button type="button" label="cancel" variant="danger-outlined" onClick={console.log("cancel")} />
                        </div>


                    </fieldset>


                </form>

            </div>
        );
    }
}

export default Postpone;