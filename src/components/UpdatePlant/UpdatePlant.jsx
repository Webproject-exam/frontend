import React, { Component } from 'react';
import './UpdatePlant.css';
import Button from '../Button/Button';
import UploadFile from '../AddPlant/UploadFile';
import { addDays, startOfDay } from 'date-fns';
import { notifySuccess, notifyError } from '../../helpers/notification';

class UpdatePlantForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form_page: 1,

            fertilizer_amount: this.props.selectedPlant.fertilization.fertAmount,
            fertilizing_frequency: this.props.selectedPlant.fertilization.fertFrequency,

            information_description: this.props.selectedPlant.information.description,
            information_nutrition: this.props.selectedPlant.information.nutrition,
            information_placement: this.props.selectedPlant.information.placement,
            information_watering: this.props.selectedPlant.information.watering,

            lighting_requirements: this.props.selectedPlant.lighting,

            placement_building: this.props.selectedPlant.placement.building,
            placement_floor: this.props.selectedPlant.placement.floor,
            placement_room: this.props.selectedPlant.placement.room,

            name: this.props.selectedPlant.name,

            watering_amount: this.props.selectedPlant.watering.waterAmount,
            watering_frequency: this.props.selectedPlant.watering.waterFrequency
        };

        this.nameInput = React.createRef();
        this.form = React.createRef();
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const waterFreq = parseInt(this.state.watering_frequency);
        const fertFreq = parseInt(this.state.fertilizing_frequency);


        /* Endre på logikken her */
        const waterNext = startOfDay(addDays(Date.now(), waterFreq));
        const fertNext = startOfDay(addDays(Date.now(), fertFreq));

        const plantObject = {
            name: this.state.name,
            information: {
                description: this.state.information_description,
                placement: this.state.information_placement,
                watering: this.state.information_watering,
                nutrition: this.state.information_nutrition
            },
            placement: {
                building: this.state.placement_building,
                floor: this.state.placement_floor,
                room: this.state.placement_room
            },
            watering: {
                waterFrequency: waterFreq,
                waterNext: waterNext,
                waterAmount: this.state.water_amount
            },
            fertilization: {
                fertFrequency: fertFreq,
                fertNext: fertNext,
                fertAmount: this.state.fertilizer_amount,
            },
            lighting: this.state.lighting_requirements
        };

        await this.props.onSubmitHandler(plantObject);

        if (this.props.error) {
            notifyError(this.props.error);
            return
        } else {
            notifySuccess(`The plant ${this.state.name} has been updated.`);
            this.props.onCancelClick();
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

    handlePageChangeForward = () => {
        if (this.state.form_page < 3 && this.form.current.reportValidity()) {
            this.setState(prevState => {
                return {
                    form_page: prevState.form_page + 1
                };
            });
        }
    }

    handlePageChangeBackward = () => {
        if (this.state.form_page > 1) {
            this.setState(prevState => {
                return {
                    form_page: prevState.form_page - 1
                };
            });
        }
    }

    render() {
        return (
            <>
                <div className="container max-width update-plant-form">
                    <form ref={this.form} onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Update a plant</legend>

                            {this.state.form_page === 1 &&
                                <>
                                    <label htmlFor="name">plant name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        onChange={this.handleInputChange}
                                        placeholder="Enter the plant's name"
                                        ref={this.nameInput}
                                        required
                                        autoFocus
                                        type="text"
                                        value={this.state.name}
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
                                    <select
                                        id="placement_floor"
                                        name="placement_floor"
                                        onChange={this.handleInputChange}
                                        value={this.state.placement_floor}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>

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

                                    <label htmlFor="plant_image">Upload a photo:</label>
                                    <UploadFile />

                                    <div className="update-plant-form page-indicators">
                                        <div className={"page-indicator-dot active"}></div>
                                        <div className={"page-indicator-dot"}></div>
                                        <div className={"page-indicator-dot"}></div>
                                    </div>

                                    <div className="buttons-side-by-side">
                                        <Button label="cancel" size="half" variant="danger-outlined" onClick={this.props.onCancelClick} />
                                        <Button label="next" size="half" variant="secondary" onClick={this.handlePageChangeForward} />
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
                                        placeholder="Every 14 days..."
                                        ref={this.watering_frequency}
                                        required
                                        type="number"
                                        min="1"
                                        max="365"
                                        autoFocus
                                        value={this.state.watering_frequency}
                                    />

                                    <label htmlFor="watering_amount">watering amount</label>
                                    <select
                                        id="watering_amount"
                                        name="watering_amount"
                                        onChange={this.handleInputChange}
                                        value={this.state.watering_amount}
                                    >
                                        <option value="plentiful">Plentiful</option>
                                        <option value="average">Average</option>
                                        <option value="sparse">Sparse</option>
                                    </select>

                                    <label htmlFor="fertilizing_frequency">fertilizing frequency</label>
                                    <input
                                        id="fertilizing_frequency"
                                        name="fertilizing_frequency"
                                        onChange={this.handleInputChange}
                                        placeholder="Every 60 days..."
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
                                        <option value="plentiful">Plentiful</option>
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
                                        <option defaultValue="sunlight">Sunlight</option>
                                        <option value="sunlight / half shade">Sunlight / Half shade</option>
                                        <option value="half shade">Half shade</option>
                                        <option value="half shade / shade">Half shade / Shade</option>
                                        <option value="shade">Shade</option>
                                    </select>

                                    <div className="update-plant-form page-indicators">
                                        <div className={"page-indicator-dot"}></div>
                                        <div className={"page-indicator-dot active"}></div>
                                        <div className={"page-indicator-dot"}></div>
                                    </div>

                                    <div className="buttons-side-by-side">
                                        <Button label="previous" size="half" variant="secondary-outlined" onClick={this.handlePageChangeBackward} />
                                        <Button label="next" size="half" variant="secondary" type="button" onClick={this.handlePageChangeForward} />
                                    </div>
                                </>
                            }

                            {this.state.form_page === 3 &&
                                <>
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

                                    <div className="update-plant-form page-indicators">
                                        <div className={"page-indicator-dot"}></div>
                                        <div className={"page-indicator-dot"}></div>
                                        <div className={"page-indicator-dot active"}></div>
                                    </div>

                                    <div className="buttons-side-by-side">
                                        <Button label="previous" size="half" variant="secondary-outlined" onClick={this.handlePageChangeBackward} />
                                        <Button label="submit" size="half" variant="secondary" type="submit" />
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

export default UpdatePlantForm;