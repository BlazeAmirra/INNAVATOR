import { LitElement, html } from 'lit';
import { navigator } from '../vendor/lit-element-router-2.0.3a/lit-element-router.js';

import styles from './styles/login.js';
import '../components/back-button.js';
import '../components/page-title.js';
import * as innavator_api from '../innavator-api.js';
import * as innavator_utils from '../innavator-utils.js';

export class Login extends navigator(LitElement) {
    static get styles() {
        return styles;
    }

    static get properties() {
        return {
            email: {type: String},
            password: {type: String},
            error: {type: String}
        };
    }

    constructor() {
        super();
        this.title = "Log In";
        this.email = "";
        this.password = "";
        this.error = "";
    }

    handleInput(e) {
        let {id, value} = e.target;
        this[id] = value;
    }

    async attempt_login () {
        let result = await innavator_api.login(this.email, this.password);
        if (result["logged_in"]) {
            this.error = "";
            window.location.href = "/";
        }
        else {
            if (result.apiError) {
                if (result.apiError.message) {
                    let messageJSON = innavator_utils.parsed_json_or_null(result.apiError.message);
                    if (messageJSON && messageJSON.detail) {
                        this.error = messageJSON.detail;
                    }
                    else {
                        this.error = result.apiError.message;
                    }
                }
                else {
                    this.error = result.apiError;
                }
            }
            else {
                this.error = JSON.stringify(result);
            }
        }
    }

    render() {
        return html`
            <app-page-title>Log In</app-page-title>
            <div class="signin-container">
                Email: <input id="email" @input="${this.handleInput}"/>
            </div>
            <div class="signin-container">
                Password: <input type="password" id="password" @input="${this.handleInput}"/>
            </div>
            <div class="signin-container">
                <span @click="${this.attempt_login}" class="signin-button">Log In</span>
            </div>
            <div class="signin-container">
                <span style="color: red;">${this.error}</span>
            </div>
            <div class="signin-container">
                <app-back-button/>
            </div>
        `;
    }
}

customElements.define('app-login', Login);
