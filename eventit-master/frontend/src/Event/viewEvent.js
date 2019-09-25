import React, { Component } from 'react'
import MessageHandler from '../Message/messageHandler'
import api from '../api';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import axios from "axios";
import './viewEvent.css';
import logo from '../images/logo2.png';
class ViewEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventId: undefined,
            eventData: undefined,
            isJoined: false,
            isError: false,
            errorMessage: '',
            isOwner: false,
            eventJoiners: undefined,
            eventJoinersCount: 0,
            success: false,
            url: '',
            upload: false
        }
        this.registerClick = this.registerClick.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }
    async componentDidMount() {
        try {
            this.setState({ eventId: this.props.match.params.id });
            await this.getEvent();
        } catch (err) {
            this.setState({ isError: true, errorMessage: err });
            return err;
        }
    }
    async getEvent() {
        try {
            this.setState({ isError: false, errorMessage: '' });
            const l_objResponse = await api.get(`/eventit/event/getevent/${this.props.match.params.id}`);
            this.setState({ eventData: l_objResponse.data, eventJoinersCount: (l_objResponse.data.event_joiners).length });
            this.setState({ url: l_objResponse.data.url })
            if (this.props.id != null && this.state.eventData.event_joiners.indexOf(this.props.id) > -1) {
                this.setState({ isJoined: true });
            }
            if (this.props.id != null && this.state.eventData.event_owner === this.props.id) {
                this.setState({ isOwner: true });

                const l_objResponseJoiners = await api.get(`/eventit/event/geteventjoiners/${this.props.match.params.id}`);
                this.setState({ eventJoiners: l_objResponseJoiners.data });
            }
        } catch (err) {
            this.setState({ isError: true, errorMessage: err });
            return err;
        }

    }
    handleFileChange = ev => {
        this.setState({ isError: false, errorMessage: '' });
        this.setState({ success: false, url: "", upload: true });

    };
    handleUpload = ev => {
        if (this.state.upload) {
            let file = this.uploadInput.files[0];
            let fileParts = this.uploadInput.files[0].name.split(".");
            let fileName = fileParts[0];
            let fileType = fileParts[1];
            api.post("/sign_s3", {
                fileName: fileName,
                fileType: fileType
            }).then(response => {
                var returnData = response.data.data.returnData;
                var signedRequest = returnData.signedRequest;
                var url = returnData.url;
                this.setState({ url: url });
                console.log("Recieved a signed request " + signedRequest);
                var options = {
                    headers: {
                        "Content-Type": fileType
                    }
                };
                axios.put(signedRequest, file, options)
                    .then(async (result) => {
                        console.log("Response from s3");
                        this.setState({ success: true });
                        await api.put(`eventit/event/updateEventUrl/${this.props.match.params.id}`, { "url": this.state.url })
                    }).catch(error => {
                        alert("ERROR " + JSON.stringify(error));
                    });
            }).catch(error => {
                alert(JSON.stringify(error));
            });
        }
        else {
            this.setState({ isError: true, errorMessage: "upload a file!" });
        }
    };
    async registerClick() {
        try {
            this.setState({ isError: false, errorMessage: '' });
            if (this.props.id != null) {
                const data = {
                    "event_id": this.props.match.params.id,
                    "user_id": this.props.id,
                };
                const url = `/eventit/event/joinEvent`;
                this.setState({
                    isJoined: true
                })
                var temp = await api.post(url, data);
            }
            else {
                var link = document.getElementById('test');
                link.click();
            }
        }
        catch (err) {
            this.setState({ isError: true, errorMessage: err });
            return err;
        }
    }
    render() {
        let actionBtn = null;
        let body = null;
        var error = null;
        var joinersList = null;
        var joiners = null;
        var uploadbtn = null;
        var urllink = null;
        if (this.state.isError) {
            error = <MessageHandler message={{ isError: this.state.isError, message: this.state.errorMessage }} />
        }
        else if (!this.state.isError && this.state.errorMessage !== '') {
            error = <MessageHandler message={{ isError: this.state.isError, message: this.state.errorMessage }} />
        }
        else {
            error = null
        }
        if (this.state.url !== '') {
            urllink = <div className="col-lg-6 clsactbtn">
                <a href={this.state.url} target="_blank"><button className="clsUpdateBtn" > View Brochure</button></a>
            </div>
        }
        if (this.props.id !== null && this.state.eventData && this.state.eventData.event_owner && (this.props.id === this.state.eventData.event_owner)) {
            actionBtn = <Link to={`/events/editevent/${this.props.match.params.id}`}><button className="clsUpdateBtn"> Update Event</button></Link>
            uploadbtn = <div className="col-lg-6 clsactbtn">
                <button className="clsUpdateBtn" onClick={this.handleUpload}> Update Brochure</button>
                <input id="myinput"
                    onChange={this.handleFileChange}
                    ref={ref => {
                        this.uploadInput = ref;
                    }}
                    type="file"
                />

            </div>
            if (this.state.eventData && this.state.eventData.event_joiners.length > 0) {
                joiners = this.state.eventJoiners && (this.state.eventJoiners).map(event => (
                    <div className="clsjoinerDetails">
                        <div>
                            <div className="clsLabelDiv">Name:</div>{event.name}
                        </div>
                        <div>
                            <div className="clsLabelDiv">Email:</div>{event.user_email}
                        </div>
                    </div>
                ));
            }
            else {
                joiners = (
                    <div >
                        <h2>Its Empty Here! :(</h2>
                    </div>)
            }
            joinersList = (
                <div className="clsIndiEventCard">
                    <div className="clsIndiEventCardInner clsIndiEventCardInnerJoiner">
                        <div className="clsContactDiv">
                            Attendees:
                </div>
                        {joiners}
                    </div>

                </div>)
        }
        else if (this.state.isJoined) {
            actionBtn = <button disabled className="clsRegisteredBtn"> You are Registered!</button>
            //actionBtn = <Link to={`//localhost:3002`}target="_blank"><button> Chat</button></Link> //socket.io
        }
        else if (this.state.eventData && this.state.eventData.event_count === (this.state.eventData.event_joiners).length)
            actionBtn = <button disabled className="clsRegisteredBtn"> Registration full!</button>
        else {
            actionBtn = <button onClick={this.registerClick} className="clsUpdateBtn"> Register</button>
            //actionBtn = <Link to={`//localhost:3002`}target="_blank"><button> Chat</button></Link> //socket.io
        }
        if (this.state.eventData !== undefined) {
            body = (<div className="container">
                {error}
                <div className="row">
                    <div className="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">

                        <div className="col-sm-12">
                            <div>
                                <img src={logo} alt="logo" className="clsLogoImage" />
                            </div>
                            <div className="col-xs-12 col-sm-8">

                                <h2>{this.state.eventData.event_name}</h2>
                                <p><div className="clsLabelDiv">Description:</div>{this.state.eventData.event_description} </p>
                                <div className="clsIndiEventCard">
                                    <div className="clsIndiEventCardInner">
                                        <div className="clsLabelDiv">Address:</div> {this.state.eventData.event_location}
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="col-xs-12 col-sm-4 col-lg-6">
                        <div className="clsIndiEventCard">
                            <div className="clsIndiEventCardInner">
                                <div>
                                    <div className="col-lg-6 clsactbtn">
                                        {actionBtn}
                                    </div>
                                    {uploadbtn}
                                    {urllink}
                                </div>

                            </div>

                        </div>



                        <div className="clsIndiEventCard">
                            <div className="clsIndiEventCardInner">
                                <div className="clsLabelDiv">Time:</div> {this.state.eventData.event_begin} to {this.state.eventData.event_end}
                            </div>
                            <div className="clsIndiEventCardInner">
                                <div className="clsLabelDiv">Date:</div> {this.state.eventData.event_date}
                            </div>

                        </div>
                        <div className="clsIndiEventCard">
                            <div className="clsIndiEventCardInner">
                                <div className="clsContactDiv">
                                    Contact:
                                </div>
                                <div>
                                    <div className="clsLabelDiv">Phone:</div>{this.state.eventData.event_ownerPhone}
                                </div>
                                <div>
                                    <div className="clsLabelDiv">Email:</div>{this.state.eventData.event_ownerContact}
                                </div>
                            </div>

                        </div>
                        <div className="clsIndiEventCard">
                            <div className="clsIndiEventCardInner">
                                <div className="clsLabelDiv">{this.state.eventJoinersCount}/{this.state.eventData.event_count}</div> seats filled.
                            </div>

                        </div>
                        {joinersList}
                    </div>
                </div>

            </div>)
                ;
        }

        return (<div className="globalContainer">
            {body}
            <Link to="/login" style={{ hidden: true }} id="test">
            </Link>
        </div>);
    };
}
const mapStateToProps = (state) => {
    return {
        id: state.authentication.id
    };
}

export default connect(mapStateToProps)(ViewEvent);
// export default ViewEvent;