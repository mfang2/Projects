import React from 'react';
import './DrawerToggleButton'
import './TopNavigation.css';
import DrawerToggleButton from './DrawerToggleButton';
import { auth } from '../firebase';
import { connect } from "react-redux";
import { Component } from 'react';
import SearchEvent from '../SearchEvent'
import logo_small from '../images/logolong-small.png'
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
class navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            signedIn: false,
            query: ''
        }
        this.signOutClick = this.signOutClick.bind(this)
    }
    componentDidMount() {
        if (this.props.id) {
            var config = {
                headers: { 'Access-Control-Allow-Origin': "*" }
            };
            this.setState({ userData: axios.get(`localhost:3001/eventit/user/profile/${this.props.id}`, config) });
        }
    }
    handleChange = query => {
        this.setState({
            query: query
        });
    };
    async changeUser() {
        var config = {
            headers: { 'Access-Control-Allow-Origin': "*" }
        };
        return axios.get(`localhost:3001/eventit/user/profile/${this.props.id}`, config);

    }
    signOutClick() {
        auth.signOut();
        var link = document.getElementById('signout');
        link.click();
        this.setState({ signedIn: !this.state.signedIn })
    }
    searchSubmit(event) {
        event.preventDefault();
        var link = document.getElementById('searchit');
        link.click();
        this.setState({
            query: ''
        });
    }
    render() {
        let Query = this.state.query;
        let UserLoggedIn = null;
        var a = null;
        if (this.props.id != null) {
            // var username = String(this.state.userData.name).split(" ")[0];
            UserLoggedIn =
                <div className="clsToolbarNavigationItems">
                    <Link className="showlink" to="/profile/user">
                        <button className="btn btn-big btn-dark">
                            My Profile
                        </button>
                    </Link>
                    <Link className="showlink" to="/events">
                        <button className="btn btn-big btn-dark">
                            All Events
                    </button>
                    </Link>
                    <a href="/">
                        <button className="btn btn-big btn-dark" onClick={this.signOutClick}>
                            Signout
                        </button>
                    </a>
                    <Link to="/" style={{ hidden: true }} id="signout">
                    </Link>
                </div>
                ;
        }
        else {
            UserLoggedIn = <div className="clsToolbarNavigationItems">
                <Link className="showlink" to="/login">
                    <button className="btn btn-big btn-dark">
                        Login
                    </button>
                </Link>
                <Link className="showlink" to="/signup">
                    <button className="btn btn-big btn-dark">
                        Signup
                    </button>
                </Link>
            </div>
        }
        var searchBar = (<form onSubmit={this.searchSubmit}>
            <div className="clsToolbarSearchContainer">
                <div className="clsToolbarSearchInner">
                    <input
                        placeholder='Search Events...'
                        className='clsToolbarSearchInput' onChange={this.handleChange}
                    />
                </div><Link to={{
                    pathname: "/events", searchQuery: { searchQuery: this.state.query }
                }} style={{ hidden: true }} id="searchit">
                </Link>
                <button type='submit' className='clsToolbarSearchBtn'><i className="fa fa-search" aria-hidden="true"></i></button>

            </div>
        </form>
        );


        return (<header className="clsToolbar">
            <nav className="clsToolbarNavigation">
                <div className="clsToolbarToggleButton">
                    <DrawerToggleButton click={this.props.drawerClickHandler} />
                </div>

                <Link className="showlink" to="/">
                    <div className="clsToolbarLogo"><img src={logo_small} alt="logo" className="clsLogo"/></div>
                </Link>


                <div className="spacer"></div>
                {/* <div>{searchBar}</div> */}
                <div className="spacer"></div>
                {UserLoggedIn}
            </nav>
        </header>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        id: state.authentication.id
    };
}

export default connect(mapStateToProps)(navbar);