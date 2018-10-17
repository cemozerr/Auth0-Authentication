// src/Auth/Auth.js
/* global window localStorage */

import auth0 from 'auth0-js';

export default class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'garde-test.auth0.com',
      clientID: 'hC4jeBORAuB2WT1ZH20pVh9CBgF4MwMk',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid',
    });
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    const { location } = window;
    const returnURL = `http://${location.hostname}${location.port ? `:${location.port}` : ''}`;
    this.auth0.logout({ returnTo: returnURL });
  }


  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          resolve(Auth.setSession(authResult));
        } else if (err) {
          reject(err);
        }
      });
    });
  }

  static setSession(authResult) {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }


  static isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    if (typeof (expiresAt) !== 'number') {
      return false;
    }
    return new Date().getTime() < expiresAt;
  }
}
