import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddEvent from './Event/addEvent';
import { connect } from "react-redux";
import api from './api'
import './Events.css';
import logo from './images/logo2.png'
import MessageHandler from './Message/messageHandler'
class EventContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUpdateEvent: false,
            showCreateEvent: false,
            showDeleteEvent: false,
            editEvent: null,
            deleteEvent: null,
            events: undefined,
            isError: false,
            errorMessage: ''
        };
        this.handleOpenCreateEvent = this.handleOpenCreateEvent.bind(this);
        this.handleCloseEvents = this.handleCloseEvents.bind(this);
    }

    componentWillReceiveProps(nextProps, nextState) {
        this.getEvents()
    }
    componentDidMount() {
        this.getEvents();
    }
    async getEvents() {
        try {
            var l_objResponse;
            if (this.props.location && this.props.location.address) {

                var splitAdd = (this.props.location.address.address).split(',');
                var nearby = (splitAdd.length > 2) ? splitAdd[splitAdd.length - 3].trim() : (splitAdd.length > 2) ? splitAdd[splitAdd.length - 2] : splitAdd[0];
                l_objResponse = await api.get(`/eventit/event/getAllEvents/${nearby}`);
            }
            else if(this.props.location && this.props.location.event){
                var event_keyword =this.props.location.event.event
                l_objResponse = await api.get(`/eventit/event/getAllEventsByTag/${event_keyword }`);
            }
            else if (this.props.userId) {
                l_objResponse = await api.get(`/eventit/event/getOwnedEvents/${this.props.userId}`);
            }
            else {
                l_objResponse = await api.get("/eventit/event/getAllEvents");
            }
            this.setState({
                events: l_objResponse.data
            });
        } catch (err) {
            this.setState({ isError: true, errorMessage: err });
        }

    }
    handleCloseEvents() {
        this.setState({ showCreateEvent: false, showUpdateEvent: false, showDeleteEvent: false });
        this.getEvents();
    }
    handleOpenCreateEvent() {
        this.setState({ showCreateEvent: true });
    }
    render() {
        let cards = null;
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
        if (this.state.events && this.state.events.length > 0) {
            cards = this.state.events && (this.state.events).map(event => (
                <div className="eventCard col-lg-3 col-md-4 col-sm-12 col-xs-12">
                    <Link to={`/events/${event.event_id}`} className="eventLink">
                        <div className="eventCardContainer">
                            <div>
                                <img src={logo} alt="logo" className="clsCardLogo" />
                            </div>
                            <div className="clsEventHeading">{event.event_name}</div>
                            <div className="clsEventDesc">{event.event_description}</div>
                            <div className="clsEventDate">{event.event_date}</div>
                            <div className="clsEventTime">{event.event_begin} To {event.event_end}</div>
                            <div className="clsEventLoc">{event.event_location}</div>
                        </div>
                    </Link>
                </div>
            ));
        }
        else {
            cards = (
                <div >
                    <h1>Its Empty Here! :(</h1>
                </div>)
        }
        return (
            <div className="col-lg-12 ">
                {error}
                <div className="clsCreateButtonContainer">
                    <button className='clsCreateButton' onClick={this.handleOpenCreateEvent}>
                        Create Event
                </button>
                </div>
                {this.state &&
                    this.state.showCreateEvent && (
                        <AddEvent
                            isOpen={this.state.showCreateEvent}
                            handleClose={this.handleCloseEvents}
                            EventOperation='createEvent'
                        />
                    )}
                <div className="clsEventContainer">
                    {cards}
                </div>

            </div>);
    }
}

const mapStateToProps = (state) => {
    return { id: state.authentication.id };
}

export default connect(mapStateToProps)(EventContainer);