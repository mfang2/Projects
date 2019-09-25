import React, { Component } from 'react'
import { BrowserRouter as Link } from 'react-router-dom';
import api from '../api'
import { connect } from "react-redux";
import MessageHandler from '../Message/messageHandler'
class EditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_email: '',
            name: '',
            phone: '',
            insta_username: '',
            facebook_username: '',
            twitter_username: '',
            isError: false,
            errorMessage: ''

        }
    }
    async componentWillMount() {
        if (this.props.id != null) {
            var user = await api.get(`eventit/user/profile/${this.props.id}`);
            this.setState({
                name: user.data.name,
                user_email: user.data.user_email,
                phone: user.data.phone,
                insta_username: user.data.insta_username || '',
                facebook_username: user.data.facebook_username || '',
                twitter_username: user.data.twitter_username || '',
            })
        }
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
        try {
            if (this.state.user_email === "" || this.state.password === "") {
                this.setState({ isError: true, errorMessage: "email and Password Cannot be empty" });
                return
            }
            else {
                const data = {
                    "user_email": this.state.user_email,
                    "name": this.state.name,
                    "phone": this.state.phone,
                    "insta_username": this.state.insta_username,
                    "facebook_username": this.state.facebook_username,
                    "twitter_username": this.state.twitter_username,

                }
                var tem = await api.post(`eventit/user/profileUpdate/${this.props.id}`, data);
                this.setState({ isError: false, errorMessage: "User Profile Updated" });
                var link = document.getElementById('test1');
                link.click();

            }
        } catch (err) {
            this.setState({ isError: true, errorMessage: err.message })
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
        return (<div className="limiter" >
            {error}
            <div className="container-login100">

                <div className="wrap-login100">
                    <form className="login100-form validate-form">
                        <span className="login100-form-title">
                            Change is the only constant!
					</span>
                        <div className="wrap-input100 validate-input" data-validate="Valid Name is required">
                            <input className="input100" type="text" name="name" placeholder="Hi! What's your name?" onChange={this.changeHandler} value={this.state.name} />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-user" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Valid user_email is required: ex@abc.xyz">
                            <input className="input100" type="text" name="user_email" placeholder="Email" onChange={this.changeHandler} value={this.state.user_email} />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                            </span>
                        </div>

                        <div className="wrap-input100 validate-input" >
                            <input className="input100" type="text" name="insta_username" placeholder="Instagram" onChange={this.changeHandler} value={this.state.insta_username} />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fab fa-instagram" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div className="wrap-input100 validate-input" >
                            <input className="input100" type="text" name="facebook_username" placeholder="Facebook" onChange={this.changeHandler} value={this.state.facebook_username} />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fab fa-facebook-square" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div className="wrap-input100 validate-input" >
                            <input className="input100" type="text" name="twitter_username" placeholder="Twitter" onChange={this.changeHandler} value={this.state.insta_ustwitter_usernameername} />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fab fa-twitter" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Valid phone is required: xxx xxx xxxx">
                            <input className="input100" type="tel" name="phone" placeholder="Phone" onChange={this.changeHandler} value={this.state.phone} />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-phone" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div className="container-login100-form-btn">

                            <button className="login100-form-btn" type='submit' onClick={this.submit.bind(this)}>
                                Update
						</button>
                        </div>
                    </form>


                </div>

            </div>
        </div >

        );
    };
}
const mapStateToProps = (state) => {
    return {
        id: state.authentication.id
    };
}
export default connect(mapStateToProps)(EditUser);