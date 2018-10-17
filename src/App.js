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
    this.auth = new Auth();
    this.state = {isLoggedIn: false};
  }

  async componentWillMount() {
    const url = new URL(window.location.href);
    const isCallback = url.pathname.includes('callback');
    if (isCallback){
      try{
        await this.auth.handleAuthentication();
        this.setState({isLoggedIn: true});
      }
      catch(err){
        console.log(err);
      }
    }
  }

  render() {
    var greeting;
    if (this.state.isLoggedIn){
      console.log("logged in");
      greeting = <div style={STYLE.backgroundGreen}><button> Logout </button></div>;
    } else {
      console.log("logged out");
      greeting = <div style={STYLE.backgroundRed}>
                  <button onClick={this.auth.login}> Login </button>
                 </div>;
    }
    return (
      <div className="App">
        {greeting}
      </div>
    );
  }
}

export default App;
