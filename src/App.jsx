/* global window */

import React, { Component } from 'react';
import './App.css';
import Auth from './Auth/Auth';

const STYLE = {
  backgroundRed: {
    background: 'red',
  },
  backgroundGreen: {
    background: 'green',
  },
};

class App extends Component {
  constructor() {
    super();
    this.auth = new Auth();
    this.state = { isLoggedIn: false };
    this.login = this.login.bind(this);
  }

  async componentWillMount() {
    const url = new URL(window.location.href);
    const isCallback = url.pathname.includes('callback');
    if (isCallback) {
      try {
        await this.auth.handleAuthentication();
        this.setState({ isLoggedIn: true });
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
    }
  }

  login() {
    this.auth.login();
  }

  render() {
    let greeting;
    const { isLoggedIn } = this.state;
    if (isLoggedIn) {
      greeting = (
        <div style={STYLE.backgroundGreen}>
          <button type="button">
            Logout
          </button>
        </div>
      );
    } else {
      greeting = (
        <div style={STYLE.backgroundRed}>
          <button type="button" onClick={this.login}>
            Login
          </button>
        </div>
      );
    }
    return (
      <div className="App">
        {greeting}
      </div>
    );
  }
}

export default App;
