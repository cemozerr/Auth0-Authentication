/* global window */

import React, { Component } from 'react';
import './App.css';
import Auth from './Auth/Auth';
import LoginControl from './components/LoginControl';

class App extends Component {
  constructor() {
    super();
    this.auth = new Auth();
    this.state = { isAuthenticated: false };
  }

  async componentDidMount() {
    const url = new URL(window.location.href);
    const isCallback = url.pathname.includes('callback');
    if (isCallback) {
      try {
        await this.auth.handleAuthentication();
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
    }
    if (Auth.isAuthenticated()) {
      this.setState({ isAuthenticated: true });
    }
  }

  render() {
    const { isAuthenticated } = this.state;
    return (
      <LoginControl
        isAuthenticated={isAuthenticated}
        logout={this.auth.logout}
        login={this.auth.login}
      />
    );
  }
}

export default App;
