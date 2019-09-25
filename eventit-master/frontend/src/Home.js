import React, { Component } from 'react';
import './App.css';
import SearchEvent from './SearchEvent'
import { connect } from "react-redux";
import  EventContainer  from './Events';
class Home extends Component {
    render() {
        return (
            <div>
                <SearchEvent ></SearchEvent>
                <EventContainer></EventContainer>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return { id: state.authentication.id };
}
export default connect(mapStateToProps)(Home);