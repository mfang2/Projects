import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'
import { auth } from '../firebase'
import { Link } from 'react-router-dom';
import MessageHandler from '../Message/messageHandler'
class CreateAccount extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      phone: "",
      isError: false,
      errorMessage: ''
    }
  }

  render() {
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

    return (
      <div className="limiter" >
        {error}
        <div className="container-login100">

          <div className="wrap-login100">
            <form className="login100-form validate-form">
              <span className="login100-form-title">
                Get On Board!
					</span>
              <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                <input className="input100" type="text" name="name" placeholder="Hi! What's your name?" onChange={this.changeHandler} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-user" aria-hidden="true"></i>
                </span>
              </div>
              <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                <input className="input100" type="text" name="email" placeholder="Email" onChange={this.changeHandler} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>

              <div className="wrap-input100 validate-input" data-validate="Password is required">
                <input className="input100" type="password" name="password" placeholder="Password" onChange={this.changeHandler} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>
              <div className="wrap-input100 validate-input" data-validate="Password is required">
                <input className="input100" type="password" name="confirmpassword" placeholder="Confirm Password" onChange={this.changeHandler} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>
              <div className="wrap-input100 validate-input" data-validate="Valid phone is required: xxx xxx xxxx">
                <input className="input100" type="tel" name="phone" placeholder="Phone" onChange={this.changeHandler} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-phone" aria-hidden="true"></i>
                </span>
              </div>
              <div className="container-login100-form-btn">
                <button className="login100-form-btn" onClick={this.submit.bind(this)}>
                  SignUp
						</button>
              </div>
            </form>

            <Link to="/login" style={{ hidden: true }} id="test">
            </Link>
          </div>

        </div>
      </div >


    )
  }

  changeHandler = event => {
    const name = event.target.name
    const value = event.target.value
    this.setState({
      [name]: value
    })
  }

  async submit(event) {
    event.preventDefault();
    if (this.state.email === "" || this.state.password === "") {
      this.setState({ isError: true, errorMessage: "Email and Password Cannot be empty" });
      return
    }
    if (this.state.password !== this.state.confirmpassword) {
      this.setState({ isError: true, errorMessage: "Passwords do not match" });
      return
    }
    var msgtemp = await auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        const user = res.user
        const url = 'http://localhost:3001/eventit/user/addUser';
        fetch(url, {
          method: 'post',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: JSON.parse(JSON.stringify('{"user_name":"' + String(user.email) + '","user_email" : "' + String(user.email) + '","user_id" : "' + String(user.uid) + '","name" : "' + String(this.state.name) + '","phone" : "' + String(this.state.phone) + '"}'))


        })
      }).catch(err => {
        this.setState({ isError: true, errorMessage: err.message });

        return err;

      })

    if (msgtemp === undefined) {
      var link = document.getElementById('test');
      link.click();
    }
    else {
      this.setState({ isError: true, errorMessage: msgtemp.message })
    }
  }

}

export default CreateAccount