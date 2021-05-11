import React, { Component } from 'react';
import './AddPlantForm.css';
import Button from '../Button/Button';
import UploadFile from './UploadFile';
import { addDays, startOfDay } from 'date-fns';
import { notifySuccess, notifyError } from '../../helpers/notification';

const INITIAL_STATE = {
    form_page: 1,

    fertilizer_amount: 'plentiful',
    fertilizing_frequency: '',

    information_description: '',
    information_nutrition: '',
    information_placement: '',
    information_watering: '',

    lighting_requirements: 'sunlight',

    placement_building: '',
    placement_floor: 1,
    placement_room: '',

    plantname: '',

    watering_amount: 'plentiful',
    watering_frequency: '',

    image: [],
    previewSource: ''
}

class AddPlantForm extends Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;

        this.plantnameInput = React.createRef();
        this.form = React.createRef();
        this.image = React.createRef();
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const waterFreq = parseInt(this.state.watering_frequency);
        const fertFreq = parseInt(this.state.fertilizing_frequency);

        const waterNext = startOfDay(addDays(Date.now(), waterFreq));
        const fertNext = startOfDay(addDays(Date.now(), fertFreq));

        const plantObject = {
            name: this.state.plantname,
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
                waterAmount: this.state.watering_amount
            },
            fertilization: {
                fertFrequency: fertFreq,
                fertNext: fertNext,
                fertAmount: this.state.fertilizer_amount,
            },
            lighting: this.state.lighting_requirements,
            
        };

        if (this.state.previewSource) {
            plantObject.image = this.state.previewSource;
        }
        console.log(plantObject);

        await this.props.onSubmitHandler(plantObject);
        
        if (this.props.error) {
            notifyError(this.props.error);
            return
        } else {
            notifySuccess(`The plant ${this.state.plantname} has been added.`);
            this.setState(INITIAL_STATE);
            this.props.onAbortClick();
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

    handleFileInputChange = (e) => {
        const file = e.target.files[0];
        this.previewFile(file);
    }

    previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({
                previewSource: reader.result
            })
        }
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
                <div className='container max-width add-plant-form'>
                    <form ref={this.form} onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Add a new plant</legend>

                            {this.state.form_page === 1 &&
                                <>
                                    <label htmlFor='plantname'>plant name</label>
                                    <input
                                        id='plantname'
                                        name='plantname'
                                        onChange={this.handleInputChange}
                                        placeholder="Enter the plant's name"
                                        ref={this.plantnameInput}
                                        required
                                        pattern='\s*\S+.*' 
                                        title='space only is not allowed'
                                        autoFocus
                                        type='text'
                                        value={this.state.plantname}
                                    />

                                    <label htmlFor='placement_building'>Building</label>
                                    <input
                                        id='placement_building'
                                        name='placement_building'
                                        onChange={this.handleInputChange}
                                        placeholder='The builing where the plant is'
                                        required
                                        type='text'
                                        value={this.state.placement_building}
                                    />

                                    <label htmlFor='placement_floor'>Floor</label>
                                    <select
                                        id='placement_floor'
                                        name='placement_floor'
                                        onChange={this.handleInputChange}
                                        value={this.state.placement_floor}
                                    >
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                    </select>

                                    <label htmlFor='placement_room'>Room</label>
                                    <input
                                        id='placement_room'
                                        name='placement_room'
                                        onChange={this.handleInputChange}
                                        placeholder='What room is the plant in?'
                                        required
                                        pattern='\s*\S+.*' 
                                        title='space only is not allowed'
                                        type='text'
                                        value={this.state.placement_room}
                                    />

                                    <label htmlFor='plant_image'>Upload a photo:</label>
                                    <input type="file" name="image" onChange={this.handleFileInputChange} value={this.state.image} />
                                    {this.state.previewSource && 
                                    <img src={this.state.previewSource} alt="chosen" style={{height: '300px'}} />
                                    }

                                    <div className='add-plant-form page-indicators'>
                                        <div className={'page-indicator-dot active'}></div>
                                        <div className={'page-indicator-dot'}></div>
                                        <div className={'page-indicator-dot'}></div>
                                    </div>

                                    <div className='buttons-side-by-side'>
                                        <Button label='cancel' size='half' variant='danger-outlined' onClick={this.props.onAbortClick} />
                                        <Button label='next' size='half' variant='secondary' onClick={this.handlePageChangeForward} />
                                    </div>
                                </>
                            }

                            {this.state.form_page === 2 &&
                                <>
                                    <label htmlFor='watering_frequency'>watering frequency</label>
                                    <p className='low-emphasis-text'>Enter the plants watering interval in days.</p>
                                    <input
                                        id='watering_frequency'
                                        name='watering_frequency'
                                        onChange={this.handleInputChange}
                                        placeholder='14'
                                        ref={this.watering_frequency}
                                        required
                                        type='number'
                                        min='1'
                                        max='365'
                                        autoFocus
                                        value={this.state.watering_frequency}
                                    />

                                    <label htmlFor='watering_amount'>watering amount</label>
                                    <select
                                        id='watering_amount'
                                        name='watering_amount'
                                        onChange={this.handleInputChange}
                                        value={this.state.watering_amount}
                                    >
                                        <option defaultValue='plentiful'>Plentiful</option>
                                        <option value='average'>Average</option>
                                        <option value='sparse'>Sparse</option>
                                    </select>

                                    <label htmlFor='fertilizing_frequency'>fertilizing frequency</label>
                                    <p className='low-emphasis-text'>Enter the plants fertilizing interval in days.</p>
                                    <input
                                        id='fertilizing_frequency'
                                        name='fertilizing_frequency'
                                        onChange={this.handleInputChange}
                                        placeholder='60'
                                        required
                                        type='number'
                                        min='1'
                                        max='365'
                                        value={this.state.fertilizing_frequency}
                                    />

                                    <label htmlFor='fertilizer_amount'>Fertilizer amount</label>
                                    <select
                                        id='fertilizer_amount'
                                        name='fertilizer_amount'
                                        onChange={this.handleInputChange}
                                        value={this.state.fertilizer_amount}
                                    >
                                        <option defaultValue='plentiful'>Plentiful</option>
                                        <option value='average'>Average</option>
                                        <option value='sparse'>Sparse</option>
                                    </select>

                                    <label htmlFor='lighting_requirements'>Lighting requirements</label>
                                    <select
                                        id='lighting_requirements'
                                        name='lighting_requirements'
                                        onChange={this.handleInputChange}
                                        value={this.state.lighting_requirements}
                                    >
                                        <option defaultValue='sunlight'>Sunlight</option>
                                        <option value='sunlight / half shade'>Sunlight / Half shade</option>
                                        <option value='half shade'>Half shade</option>
                                        <option value='half shade / shade'>Half shade / Shade</option>
                                        <option value='shade'>Shade</option>
                                    </select>

                                    <div className='add-plant-form page-indicators'>
                                        <div className={'page-indicator-dot'}></div>
                                        <div className={'page-indicator-dot active'}></div>
                                        <div className={'page-indicator-dot'}></div>
                                    </div>

                                    <div className='buttons-side-by-side'>
                                        <Button label='previous' size='half' variant='secondary-outlined' onClick={this.handlePageChangeBackward} />
                                        <Button label='next' size='half' variant='secondary' type='button' onClick={this.handlePageChangeForward} />
                                    </div>
                                </>
                            }

                            {this.state.form_page === 3 &&
                                <>
                                    <label htmlFor='information_description'>General Description</label>
                                    <textarea
                                        id='information_description'
                                        maxLength='200'
                                        name='information_description'
                                        onChange={this.handleInputChange}
                                        placeholder='Enter a general description of the plant'
                                        value={this.state.information_description}
                                    />

                                    <label htmlFor='information_placement'>Placement Description</label>
                                    <textarea
                                        id='information_placement'
                                        maxLength='200'
                                        name='information_placement'
                                        onChange={this.handleInputChange}
                                        placeholder='Enter a placement description of the plant'
                                        value={this.state.information_placement}
                                    />

                                    <label htmlFor='information_watering'>Watering Description</label>
                                    <textarea
                                        id='information_watering'
                                        maxLength='200'
                                        name='information_watering'
                                        onChange={this.handleInputChange}
                                        placeholder='Enter a watering description of the plant'
                                        value={this.state.information_watering}
                                    />

                                    <label htmlFor='information_nutrition'>Nutrition Description</label>
                                    <textarea
                                        id='information_nutrition'
                                        maxLength='200'
                                        name='information_nutrition'
                                        onChange={this.handleInputChange}
                                        placeholder='Enter a nutrition description of the plant'
                                        value={this.state.information_nutrition}
                                    />

                                    <div className='add-plant-form page-indicators'>
                                        <div className={'page-indicator-dot'}></div>
                                        <div className={'page-indicator-dot'}></div>
                                        <div className={'page-indicator-dot active'}></div>
                                    </div>

                                    <div className='buttons-side-by-side'>
                                        <Button label='previous' size='half' variant='secondary-outlined' onClick={this.handlePageChangeBackward} />
                                        <Button label='submit' size='half' variant='secondary' type='submit' />
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