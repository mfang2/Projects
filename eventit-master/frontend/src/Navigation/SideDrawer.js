import React from 'react';
import './SideDrawer.css';
import { auth } from '../firebase';
import { connect } from "react-redux";
import { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
class SideDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            signedIn: false,
            query: ''
        }
    }
    componentDidMount() {
        if (this.props.id) {
            var config = {
                headers: { 'Access-Control-Allow-Origin': "*" }
            };
            this.setState({ userData: axios.get(`localhost:3001/eventit/user/profile/${this.props.id}`, config) });
        }
    }
    render() {
        let Query = this.state.query;
        let UserLoggedIn = null;
        var a = null;
        if (this.props.id != null) {
            // var username = String(this.state.userData.name).split(" ")[0];
            UserLoggedIn =
                <div >
                    <Link className="showlink" to="/profile/user">
                        <button className="clsSideDrawerItems btn btn-big btn-dark">
                            My Profile
                        </button>
                    </Link>
                    <Link className="showlink" to="/events">
                        <button className="bclsSideDrawerItems tn btn-big btn-dark">
                            All Events
                    </button>
                    </Link>
                    <a href="/">
                        <button className="clsSideDrawerItems btn btn-big btn-dark">
                            Signout
                        </button>
                    </a>
                    <Link to="/" style={{ hidden: true }} id="signout">
                    </Link>
                </div>
                ;
        }
        else {
            UserLoggedIn = <div className="">
                <Link className="showlink" to="/login">
                    <button className="clsSideDrawerItems btn btn-big btn-dark ">
                        Login
                    </button>
                </Link>
                <Link className="showlink" to="/signup">
                    <button className="clsSideDrawerItems btn btn-big btn-dark ">
                        Signup
                    </button>
                </Link>
            </div>
        }

        let drawerClasser = ['clsSideDrawer'];
        if (this.props.show) {
            drawerClasser = ['clsSideDrawer', 'open']
        }
        return (
            <nav className={drawerClasser.join(' ')}>
                {UserLoggedIn}
            </nav>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        id: state.authentication.id
    };
}

export default connect(mapStateToProps)(SideDrawer);