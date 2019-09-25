import React, { Component } from 'react'
import { Container, Row, Button } from 'react-bootstrap'
import './messageHandler.css';
class MessageHandler extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: undefined,
            isError: false
        }
    }
    componentWillReceiveProps(prev, next) {
        if (prev.message) {
            if (prev.message.isError)
                this.setState({ isError: prev.message.isError, message: prev.message.message })
            else
                this.setState({ isError: prev.message.isError, message: prev.message.message })
        }
    }
    render() {
        let body;
        if (this.state.message !== undefined) {
            if (this.state.isError)
                body = (<div className="clsErr">{this.state.message}</div>)
            else
                body = (<div className="clsSuccess">{this.state.message}</div>)
        }
        else {
            body = (<div className="clsNoMessage"></div>);
        }

        return (<div className="clsErrCont">
            {body}
        </div>



        );
    };
}
export default MessageHandler;