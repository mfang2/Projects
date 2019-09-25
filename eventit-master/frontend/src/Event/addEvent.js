import React, { Component } from 'react'
import ReactModal from 'react-modal';
import MessageHandler from '../Message/messageHandler'
import api from '../api';
import { classnames } from '../helpers';
import { connect } from "react-redux";
import PlacesAutocomplete from 'react-places-autocomplete';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import './addEvent.css';
ReactModal.setAppElement('#root');
class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateEvent: this.props.isOpen || true,
            selectedFile: null,
            address: '',
            isError: false,
            errorMessage: '',
            isGeocoding: false,
            event_title: '',
            event_type: '',
            event_description: '',
            event_date: '',
            event_from_time: '',
            event_to_time: '',
            event_max_participants: 0,
            event_picture: '',
            event_keyword: '', currentDate: ''
        };
        this.handleOpenCreateEvent = this.handleOpenCreateEvent.bind(this);
        this.handleCloseCreateEvent = this.handleCloseCreateEvent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAllChanges = this.handleAllChanges.bind(this);

    }
    componentWillMount() {
        var now = new Date();

        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);

        var today = (month) + "/" + (day) + "/" + now.getFullYear();
        this.setState({
            currentDate: today
        })
    }
    handleOpenCreateEvent() {
        this.setState({ showCreateEvent: true });
    }
    handleCloseCreateEvent() {
        this.setState({ isError: false, errorMessage: '' });
        this.setState({ showCreateEvent: false });
        this.props.handleClose(false);
    }
    async handleSubmit(event) {
        try {
            event.preventDefault();
            this.setState({ isError: false, errorMessage: '' });
            var userData = await api.get(`eventit/user/profile/${this.props.id}`);
            const data = {
                "event_name": this.state.event_title,
                "event_type": this.state.event_type,
                "event_description": this.state.event_description,
                "event_location": this.state.address,
                "event_date": this.state.event_date,
                "event_end": this.state.event_to_time,
                "event_begin": this.state.event_from_time,
                "event_owner": this.props.id,
                "event_count": this.state.event_max_participants,
                "event_keyword": this.state.event_keyword,
                "event_ownerPhone": userData.data.phone,
                "event_ownerContact": userData.data.user_name,
                "event_ownerName": userData.data.name
            };
            const url = 'http://localhost:3001/eventit/event/addevent';
            var temp = await fetch(url, {
                method: 'post',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            this.setState({ showCreateEvent: false });
            this.props.handleClose(false);
        }
        catch (err) {
            this.setState({ isError: true, errorMessage: err });
            return err;
        }

    }
    handleAllChanges = (e) => {
        try {
            if (e.target.name === 'event_title') { this.setState({ event_title: e.target.value }); }
            else if (e.target.name === 'event_type') { this.setState({ event_type: e.target.value }); }
            else if (e.target.name === 'event_description') { this.setState({ event_description: e.target.value }); }
            else if (e.target.name === 'event_date') { this.setState({ event_date: e.target.value }); }
            else if (e.target.name === 'event_from_time') { this.setState({ event_from_time: e.target.value }); }
            else if (e.target.name === 'event_to_time') { this.setState({ event_to_time: e.target.value }); }
            else if (e.target.name === 'event_max_participants') { this.setState({ event_max_participants: e.target.value }); }
            // if (e.target.name === 'event_picture') this.setState({ event_picture: e.target.value });
            else if (e.target.name === 'event_date') { this.setState({ event_date: e.target.value }); }
            else if (e.target.name === 'event_keyword') { this.setState({ event_keyword: e.target.value }); }
        } catch (err) {
            this.setState({ isError: true, errorMessage: err });
            return err;
        }

    }
    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
        console.log(event.target.files[0]);
    }
    handleAddressChange = address => {
        try {
            this.setState({ isError: false, errorMessage: '' });
            this.setState({
                address,
            });
        } catch (err) {
            this.setState({ isError: true, errorMessage: err });
            return err;
        }
    };
    handleSelect = selected => {
        this.setState({ isError: false, errorMessage: '' });
        this.setState({ isGeocoding: true, address: selected });
        geocodeByAddress(selected)
            .then((res) => {
                this.setState({
                    address: res[0]["formatted_address"],
                    isGeocoding: false,
                });
            })
            .catch(error => {
                this.setState({ isGeocoding: false });
                this.setState({ isError: true });
                this.setState({ errorMessage: error });
                console.log('error', error); // eslint-disable-line no-console
            });
    };
    handleCloseClick = () => {
        this.setState({
            address: '',
        });
    };
    handleError = (status, clearSuggestions) => {
        console.log('Error from Google Maps API', status); // eslint-disable-line no-console
        this.setState({ errorMessage: status }, () => {
            clearSuggestions();
        });
    };
    render() {
        const address = this.state.address;
        const errorMessage = this.state.errorMessage;
        const isGeocoding = this.state.isGeocoding;

        let body;
        if (this.props.id != null) {
            body = (<div>
                <form
                    className='form'
                    id='add-Event'
                    onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label name="event_title" className="clsTextFieldLabel"> Title:</label>

                        <input
                            required
                            autoFocus={true}
                            className="clsTextField"
                            name="event_title"
                            onChange={this.handleAllChanges}
                        />

                    </div>
                    <div className='form-group'>
                        <label name="event_type" className="clsTextFieldLabel"> Type:</label>

                        <input required type='text' className='clsTextField' name="event_type" onChange={this.handleAllChanges} />

                    </div>
                    <div className='form-group'>
                        <label name="event_description" className="clsTextFieldLabel"> Description:</label>

                        <input required className='clsTextField' name="event_description" onChange={this.handleAllChanges} />

                    </div>
                    <div className='form-group'>
                        <label name="event_date" className="clsTextFieldLabel"> Date: </label>

                        <input required type='date' className='clsTextField' name="event_date" onChange={this.handleAllChanges} min={this.state.currentDate} />

                    </div>
                    <div className='form-group'>
                        <label name="event_from_time" className="clsTextFieldLabel">  Start Time:</label>

                        <input required type='time' className='clsTextField' name="event_from_time" onChange={this.handleAllChanges} />

                    </div>
                    <div className='form-group'>
                        <label name="event_to_time" className="clsTextFieldLabel">End Time: </label>

                        <input required type='time' className='clsTextField' name="event_to_time" onChange={this.handleAllChanges} />

                    </div>
                    <div className='form-group'>
                        <label name="event_max_participants" className="clsTextFieldLabel">  Max participants:</label>

                        <input required type='number' className='clsTextField' name="event_max_participants" onChange={this.handleAllChanges} />

                    </div>
                    <PlacesAutocomplete onChange={this.handleAddressChange}
                        value={address}
                        onSelect={this.handleSelect}
                        onError={this.handleError}
                        shouldFetchSuggestions={address.length > 2}>
                        {
                            ({ getInputProps, suggestions, getSuggestionItemProps }) => {
                                return (
                                    <div className='form-group'>
                                        <label name="event_address" className="clsTextFieldLabel"> Address:</label>

                                        <input name="event_address" {...getInputProps({
                                            placeholder: 'Address',
                                            className: 'clsTextField',
                                            required: true,

                                        })} />
                                        {this.state.address.length > 0 && (
                                            <button
                                                className="Demo__clear-button"
                                                onClick={this.handleCloseClick}
                                            > x        </button>
                                        )}
                                        {suggestions.length > 0 && (
                                            <div className="">
                                                {suggestions.map(suggestion => {
                                                    const className = classnames('clsSuggestionItem', {
                                                        'clsSuggestionItem-active': suggestion.active,
                                                    });

                                                    return (
                                                        <div
                                                            {...getSuggestionItemProps(suggestion, { className })}
                                                        >
                                                            <strong>
                                                                {suggestion.formattedSuggestion.mainText}
                                                            </strong>{' '}
                                                            <small>
                                                                {suggestion.formattedSuggestion.secondaryText}
                                                            </small>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}


                                    </div>
                                );
                            }
                        }
                    </PlacesAutocomplete>
                    {/* <div className='form-group'>
                        <label>
                            Upload Cover Photo:
                            <input type='file' onChange={this.fileSelectedHandler} className='clsTextField' name="event_picture" accept="image/jpg, image/jpeg, image/png, image/gif, image/bmp"/>
                        </label>
                    </div> */}
                    <div className='form-group'>
                        <label name="event_keyword" className="clsTextFieldLabel"> Keywords:</label>

                        <input required type='text' className='clsTextField' name="event_keyword" onChange={this.handleAllChanges} />

                    </div>
                    <button type='submit' className="clsButton">
                        Add Event
                                </button>
                </form>

            </div>)

        } else {
            body = (<div>
                <p>
                    Please <Link to="/login">Login</Link> or <Link to="/signup">Create an Account</Link>Create an Account to perform this action
            </p>
            </div>)
        }
        return (
            <div>
                <ReactModal
                    name='createEvent'
                    isOpen={this.state.showCreateEvent}
                    contentLabel='Add Event'
                    className="addEventCard"
                >
                    {body}
                    <button onClick={this.handleCloseCreateEvent} className="clsButton">
                        Cancel
                </button>
                </ReactModal>
            </div>
        );
    };
}
const mapStateToProps = (state) => {

    console.log("home comp redux-state");
    console.log(state);
    return { id: state.authentication.id };
}

export default connect(mapStateToProps)(AddEvent);