import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import Footer from './Footer';
import Home from './Home';
import EventContainer from './Events';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Navbar from './Navigation/TopNavigation';
import SideBar from './Navigation/SideDrawer';
import BackDrop from './Navigation/Backdrop';
import viewUser from './User/viewUser';
import editUser from './User/editUser';
import viewEvent from './Event/viewEvent'
import editEvent from './Event/editEvent'
import Login from './User/Login'
import Signup from './User/CreateAccount';
import AboutUs from './AboutUs/aboutUs';
import history from './history';
library.add(faStroopwafel)
class App extends Component {
  state = {
    SideDrawerOpen: false
  };
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { SideDrawerOpen: !prevState.SideDrawerOpen }
    })
  };
  backDropClickHandler = () => {
    this.setState({
      SideDrawerOpen: false
    }
    )
  }
  render() {

    let backDrop;
    if (this.state.SideDrawerOpen) {

      backDrop = <BackDrop click={this.backDropClickHandler} />;
    }
    return (
      <Router>
        <div className="App">
          <Navbar drawerClickHandler={this.drawerToggleClickHandler} />
          <SideBar show={this.state.SideDrawerOpen} />
          {backDrop}
          <div className="Appbody">
            <div>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/events/:id" exact component={viewEvent} />
                <Route path="/events/editevent/:id" exact component={editEvent} />
                <Route path="/events" exact component={EventContainer} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/profile/edituser" exact component={editUser} />
                <Route path="/profile/user" exact component={viewUser} />
                <Route path="/aboutus" exact component={AboutUs} />
                <Route path="" exact component={Home} />
              </Switch>
            </div>
          </div>
          <Footer></Footer>
        </div>
      </Router>
    );
  }
}

export default App;
