import React, { Component } from 'react';
import './AddPlantForm.css';
import Button from '../Button/Button';
import UploadFile from './UploadFile';
import { convertDaysToMilliseconds } from '../../helpers/timeConverter'
import { isEmpty } from '../../helpers/validation';

class AddPlantForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form_page: 1,

            fertilizer_amount: 'plentiful',
            fertilizing_frequency: '',

            information_description: '',
            information_placement: '',
            information_watering: '',

            plantname: '',
            watering_frequency: '',
            lighting_requirements: 'sunlight',

            placement_building: '',
            placement_floor: '',
            placement_room: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.plantnameInput = React.createRef();
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const plantObject = {
            name: this.state.plantname,
            information: {
                description: this.state.information_description,
                placement: this.state.information_placement,
                watering: this.state.information_watering
            },
            placement: {
                building: this.state.placement_building,
                floor: this.state.placement_floor,
                room: this.state.placement_room
            },
            waterFreq: this.state.watering_frequency,
            fertFreq: this.state.fertilizing_frequency,
            fertAmount: this.state.fertilizer_amount,
            lightAmount: this.state.lighting_requirements
        };

        await this.props.onSubmitHandler(plantObject);
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

    handlePageChange() {
        if (isEmpty(this.state.plantname) && isEmpty(this.state.placement_building) && isEmpty(this.state.placement_floor) && isEmpty(this.state.placement_room)) {
            (this.state.form_page === 1) ? this.setState({ form_page: 2 }) : this.setState({ form_page: 1 })
        } else {
            this.plantnameInput.current.focus();
        }
    }

    render() {
        return (
            <>
                <div className="container">
                    <form ref={this.form} className="add-plant-form" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Add a new plant</legend>

                            {this.state.form_page === 1 &&
                                <>
                                    <label htmlFor="plantname">plant name</label>
                                    <input
                                        id="plantname"
                                        name="plantname"
                                        onChange={this.handleInputChange}
                                        placeholder="Enter the plant's name"
                                        ref={this.plantnameInput}
                                        required
                                        autoFocus
                                        type="text"
                                        value={this.state.plantname}
                                    />

                                    <label htmlFor="placement_building">Building</label>
                                    <input
                                        id="placement_building"
                                        name="placement_building"
                                        onChange={this.handleInputChange}
                                        placeholder="The builing where the plant is"
                                        required
                                        type="text"
                                        value={this.state.placement_building}
                                    />

                                    <label htmlFor="placement_floor">Floor</label>
                                    <input
                                        id="placement_floor"
                                        name="placement_floor"
                                        onChange={this.handleInputChange}
                                        placeholder="what floor is the plant on?"
                                        required
                                        type="number"
                                        min="0"
                                        max="10"
                                        value={this.state.placement_floor}
                                    />

                                    <label htmlFor="placement_room">Room</label>
                                    <input
                                        id="placement_room"
                                        name="placement_room"
                                        onChange={this.handleInputChange}
                                        placeholder="What room is the plant in?"
                                        required
                                        type="text"
                                        value={this.state.placement_room}
                                    />

                                    <label htmlFor="information_description">General Description</label>
                                    <textarea
                                        id="information_description"
                                        maxLength="200"
                                        name="information_description"
                                        onChange={this.handleInputChange}
                                        placeholder="Enter a general description of the plant"
                                        value={this.state.information_description}
                                    />

                                    <label htmlFor="information_placement">Placement Description</label>
                                    <textarea
                                        id="information_placement"
                                        maxLength="200"
                                        name="information_placement"
                                        onChange={this.handleInputChange}
                                        placeholder="Enter a placement description of the plant"
                                        value={this.state.information_placement}
                                    />

                                    <label htmlFor="information_watering">Watering Description</label>
                                    <textarea
                                        id="information_watering"
                                        maxLength="200"
                                        name="information_watering"
                                        onChange={this.handleInputChange}
                                        placeholder="Enter a watering description of the plant"
                                        value={this.state.information_watering}
                                    />

                                    <label htmlFor="information_nutrition">Nutrition Description</label>
                                    <textarea
                                        id="information_nutrition"
                                        maxLength="200"
                                        name="information_nutrition"
                                        onChange={this.handleInputChange}
                                        placeholder="Enter a nutrition description of the plant"
                                        value={this.state.information_nutrition}
                                    />

                                    <label htmlFor="plant_image">Select a file:</label>
                                    <UploadFile />

                                    <div className="add-plant-form page-indicators">
                                        <div className={"page-indicator-dot active"}></div>
                                        <div className={"page-indicator-dot"} onClick={this.handlePageChange}></div>
                                    </div>

                                    <div className="buttons-side-by-side">
                                        <Button label="cancel" size="half" variant="secondary-outlined" />
                                        <Button label="next" size="half" variant="secondary" onClick={this.handlePageChange} />
                                    </div>
                                </>
                            }

                            {this.state.form_page === 2 &&
                                <>
                                    <label htmlFor="watering_frequency">watering frequency</label>
                                    <input
                                        id="watering_frequency"
                                        name="watering_frequency"
                                        onChange={this.handleInputChange}
                                        placeholder="Every 14 days"
                                        ref={this.watering_frequency}
                                        required
                                        type="number"
                                        min="1"
                                        max="365"
                                        autoFocus
                                        value={this.state.watering_frequency}
                                    />

                                    <label htmlFor="fertilizing_frequency">fertilizing frequency</label>
                                    <input
                                        id="fertilizing_frequency"
                                        name="fertilizing_frequency"
                                        onChange={this.handleInputChange}
                                        placeholder="Every 60 days"
                                        required
                                        type="number"
                                        min="1"
                                        max="365"
                                        value={this.state.fertilizing_frequency}
                                    />

                                    <label htmlFor="fertilizer_amount">Fertilizer amount</label>
                                    <select
                                        id="fertilizer_amount"
                                        name="fertilizer_amount"
                                        onChange={this.handleInputChange}
                                        value={this.state.fertilizer_amount}
                                    >
                                        <option selected value="plentiful">Plentiful</option>
                                        <option value="average">Average</option>
                                        <option value="sparse">Sparse</option>
                                    </select>

                                    <label htmlFor="lighting_requirements">Lighting requirements</label>
                                    <select
                                        id="lighting_requirements"
                                        name="lighting_requirements"
                                        onChange={this.handleInputChange}
                                        value={this.state.lighting_requirements}
                                    >
                                        <option selected value="sunlight">Sunlight</option>
                                        <option value="sunlight-half-sade">Sunlight / Half shade</option>
                                        <option value="half-shade">Half shade</option>
                                        <option value="half-shade-shade">Half shade / Shade</option>
                                        <option value="shade">Shade</option>
                                    </select>

                                    <div className="add-plant-form page-indicators">
                                        <div className={"page-indicator-dot"} onClick={this.handlePageChange}></div>
                                        <div className={"page-indicator-dot active"}></div>
                                    </div>

                                    <div className="buttons-side-by-side">
                                        <Button label="previous" size="half" variant="secondary-outlined" onClick={this.handlePageChange} />
                                        <Button label="add new plant" size="half" variant="secondary" type="submit" />
                                    </div>
                                </>
                            }
                        </fieldset>
                    </form>
                </div>
            </>
        );
    }
}

export default AddPlantForm;