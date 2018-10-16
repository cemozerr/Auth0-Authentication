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

    handleAuthentication(){
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                console.log(authResult);
            } else if (err) {
                console.log(err);
            }
        });
    }
}
