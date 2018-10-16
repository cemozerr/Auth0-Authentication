import React, { Component } from 'react';
import './App.css';
import Auth from './Auth/Auth.js';

const STYLE = {
    backgroundRed: {
        background: 'red'
    },
    backgroundGreen: {
        background: 'green'
    }
};

class App extends Component {
    constructor(props){
        super(props);
        this.state = {auth:new Auth()};
        this.login = this.login.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
    }

    login() {
        this.state.auth.login();
    }

    handleAuthentication(){
        this.state.auth.handleAuthentication();
    }

    render() {
        const url = new URL(window.location.href);
        const isCallback = url.pathname.includes('callback');
        if (isCallback){
            this.handleAuthentication(); 
        }
        return (
            <div className="App">
            {
                <div style={STYLE.backgroundRed}>
                <button onClick={this.login}>
                    Login
                </button>
                </div>
            }
            </div>
        );
    }
}

export default App;
