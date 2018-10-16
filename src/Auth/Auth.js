// src/Auth/Auth.js

import auth0 from 'auth0-js';

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: 'garde-test.auth0.com',
        clientID: 'hC4jeBORAuB2WT1ZH20pVh9CBgF4MwMk',
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        scope: 'openid'
    });

    login() {
        this.auth0.authorize();
    }

    setSession(authResult) {
			// Set the time that the Access Token will expire at
			let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
			localStorage.setItem('access_token', authResult.accessToken);
			localStorage.setItem('id_token', authResult.idToken);
			localStorage.setItem('expires_at', expiresAt);
		} 

    handleAuthentication(){
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                console.log(authResult);
								this.setSession(authResult);
            } else if (err) {
                console.log(err);
            }
        });
    }

    isAuthenticated() {
      const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }
}
