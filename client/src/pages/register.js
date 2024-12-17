import { LitElement, html } from 'lit';
import { navigator } from '../vendor/lit-element-router-2.0.3a/lit-element-router.js';

import styles from './styles/register.js';
import '../components/back-button.js';
import '../components/page-title.js';
import * as innavator_api from '../innavator-api.js';
import * as innavator_utils from '../innavator-utils.js';

export class Register extends navigator(LitElement) {
    static get styles() {
        return styles;
    }

    static get properties() {
        return {
            email: {type: String},
            password: {type: String},
            username: {type: String},
            full_name: {type: String},
            preferred_name: {type: String},
            major: {type: String},
            error: {type: String}
        };
    }

    constructor() {
        super();
        this.title = "Register";
        this.email = "";
        this.password = "";
        this.username = "";
        this.full_name = "";
        this.preferred_name = "";
        this.major = "";
        this.error = "";
    }

    handleInput(e) {
        let {id, value} = e.target;
        this[id] = value;
    }

    async attempt_register () {
        let result = await innavator_api.register(this.username, this.full_name, this.preferred_name, this.major, this.email, this.password);
        if (result.success) {
            this.error = "";
            this.navigate("/login");
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
            <app-page-title>Register</app-page-title>
            <div class="signin-container">
                Email: <input id="email" @input="${this.handleInput}"/>
            </div>
            <div class="signin-container">
                Password: <input type="password" id="password" @input="${this.handleInput}"/>
            </div>
            <br/>
            <div class="signin-container">
                Username: <input id="username" @input="${this.handleInput}"/>
            </div>
            <div class="signin-container">
                Full Name: <input id="full_name" @input="${this.handleInput}"/>
            </div>
            <div class="signin-container">
                Preferred Name: <input id="preferred_name" @input="${this.handleInput}"/>
            </div>
            <div class="signin-container">
                Major: <input id="major" @input="${this.handleInput}"/>
            </div>
            <div class="signin-container">
                <span @click="${this.attempt_register}" class="signin-button">Register</span>
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

customElements.define('app-register', Register);
