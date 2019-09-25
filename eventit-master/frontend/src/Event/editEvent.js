import React, { Component } from 'react'
import ReactModal from 'react-modal';
import MessageHandler from '../Message/messageHandler'
import { classnames } from '../helpers';
import { connect } from "react-redux";
import api from '../api';
import PlacesAutocomplete from 'react-places-autocomplete';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import './addEvent.css';
ReactModal.setAppElement('#root');
class EditEvent extends Component {
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
            event_from_time: "18:00",
            event_to_time: "19:00",
            event_max_participants: 0,
            event_picture: undefined,
            event_keyword: '',
            event_id: this.props.match.params.id,
            isEditable: true,
            event_ownerPhone: '',
            event_ownerContact: '',
            event_ownerName: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAllChanges = this.handleAllChanges.bind(this);

    }
    async componentWillMount(prev) {
        try {
            this.setState({ isError: false, errorMessage: '' });
            const l_objResponse = await api.get(`/eventit/event/getevent/${this.props.match.params.id}`);
            this.setState({
                event_title: l_objResponse.data.event_name,
                event_type: l_objResponse.data.event_type,
                event_description: l_objResponse.data.event_description,
                event_date: l_objResponse.data.event_date,
                event_from_time: l_objResponse.data.event_start,
                event_to_time: l_objResponse.data.event_end,
                event_max_participants: parseInt(l_objResponse.data.event_count),
                event_keyword: l_objResponse.data.event_keyword.join(','),
                event_ownerPhone: l_objResponse.data.event_ownerPhone,
                event_ownerContact: l_objResponse.data.event_ownerContact,
                event_ownerName: l_objResponse.data.event_ownerName
            });
        } catch (err) {
            this.setState({ isError: true, errorMessage: err });
            return err;
        }

    }
    async handleSubmit(event) {
        try {
            this.setState({ isError: false, errorMessage: '' });
            event.preventDefault();
            console.log(event.target);
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
                "event_ownerPhone": this.state.event_ownerPhone,
                "event_ownerContact": this.state.event_ownerContact,
                "event_ownerName": this.state.event_ownerName
            };

            const url = `http://localhost:3001/eventit/event/updateEvent/${this.props.match.params.id}`;
            var temp = await fetch(url, {
                method: 'put',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            var link = document.getElementById('back');
            link.click();
        } catch (err) {
            this.setState({ isError: true, errorMessage: err });
            return err;
        }

    }
    handleAllChanges = (e) => {
        try {
            this.setState({ isError: false, errorMessage: '' });
            if (e.target.name === 'event_title') { this.setState({ event_title: e.target.value }); }
            else if (e.target.name === 'event_type') { this.setState({ event_type: e.target.value }); }
            else if (e.target.name === 'event_description') { this.setState({ event_description: e.target.value }); }
            else if (e.target.name === 'event_date') { this.setState({ event_date: e.target.value }); }
            else if (e.target.name === 'event_from_time') { this.setState({ event_from_time: e.target.value }); }
            else if (e.target.name === 'event_to_time') { this.setState({ event_to_time: e.target.value }); }
            else if (e.target.name === 'event_max_participants') { this.setState({ event_max_participants: e.target.value }); }
            else if (e.target.name === 'event_date') { this.setState({ event_date: e.target.value }); }
            else if (e.target.name === 'event_keyword') { this.setState({ event_keyword: e.target.value }); }
        } catch (err) {
            this.setState({ isError: true, errorMessage: err });
        }

    }

    render() {
        const event_title = this.state.event_title;
        const event_type = this.state.event_type;
        const event_description = this.state.event_description
        const event_date = this.state.event_date;
        const event_from_time = this.state.event_from_time;
        const event_to_time = this.state.event_to_time;
        const event_max_participants = parseInt(this.state.event_max_participants);
        const event_keyword = this.state.event_keyword;
        let body;
        var error = null;
        if (this.state.isError) {
            error = <MessageHandler message={{ isError: this.state.isError, message: this.state.errorMessage }} />
        }
        else if (!this.state.isError && this.state.errorMessage !== '') {
            error = <MessageHandler message={{ isError: this.state.isError, message: this.state.errorMessage }} />
        }
        else {
            error = null
        }
        body = (<div>
            <form
                className='addEventCard'
                id='add-Event'
                onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label name="event_title" className="clsTextFieldLabel"> Title:</label>
                    <input
                        required
                        autoFocus={true}
                        className="clsTextField"
                        name="event_title"
                        value={event_title}
                        onChange={this.handleAllChanges}
                    />

                </div>
                <div className='form-group'>
                    <label name="event_type" className="clsTextFieldLabel"> Type:</label>
                    <input required type='text' value={event_type} className='clsTextField' name="event_type" onChange={this.handleAllChanges} />

                </div>
                <div className='form-group'>
                    <label name="event_description" className="clsTextFieldLabel"> Description:</label>
                    <textarea required value={event_description} className='clsTextField' name="event_description" onChange={this.handleAllChanges} />

                </div>
                <div className='form-group'>
                    <label name="event_date" className="clsTextFieldLabel"> Date: </label>
                    <input required type='date' value={event_date} className='clsTextField' name="event_date" onChange={this.handleAllChanges} />

                </div>
                <div className='form-group'>
                    <label name="event_from_time" className="clsTextFieldLabel">  Start Time:</label>
                    <input required type='time' value={event_from_time} className='clsTextField' name="event_from_time" onChange={this.handleAllChanges} />

                </div>

                <div className='form-group'>
                    <label name="event_to_time" className="clsTextFieldLabel">End Time: </label>
                    <input required type='time' value={event_to_time} className='clsTextField' name="event_to_time" onChange={this.handleAllChanges} />

                </div>
                <div className='form-group'>
                    <label name="event_max_participants" className="clsTextFieldLabel">  Max participants:</label>
                    <input required type='number' value={event_max_participants} className='clsTextField' name="event_max_participants" onChange={this.handleAllChanges} />

                </div>
                {/* <PlacesAutocomplete onChange={this.handleAddressChange}
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
                                            value:{address} 
                                        })} />
                                        {this.state.address.length > 0 && (
                                            <button
                                                className="Demo__clear-button"
                                                onClick={this.handleCloseClick}
                                            > x        </button>
                                        )}
                                        {suggestions.length > 0 && (
                                            <div className="Demo__autocomplete-container">
                                                {suggestions.map(suggestion => {
                                                    const className = classnames('Demo__suggestion-item', {
                                                        'Demo__suggestion-item--active': suggestion.active,
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
                </PlacesAutocomplete> */}
                {/* <div className='form-group'>
                    <label>
                        Upload Cover Photo:
                        <input type='file' onChange={this.fileSelectedHandler} className='clsTextField' name="event_picture" accept="image/jpg, image/jpeg, image/png, image/gif, image/bmp"/>
                    </label>
                </div> */}
                <div className='form-group'>
                    <label name="event_keyword" className="clsTextFieldLabel"> Keywords:</label>
                    <input required type='text' value={event_keyword} className='clsTextField' name="event_keyword" onChange={this.handleAllChanges} />

                </div>
                <button type='submit' className="clsButton">
                    Edit Event
                            </button>
                <Link to={'/events/' + this.props.match.params.id} id="back">
                    <button className="clsButton">
                        Cancel
                </button>
                </Link>
            </form>

        </div>)
        return (
            <div>
                {error}
                {body}


            </div>
        );
    };
}
const mapStateToProps = (state) => {
    return { id: state.authentication.id };
}

export default connect(mapStateToProps)(EditEvent);