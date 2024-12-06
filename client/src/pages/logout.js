// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { LitElement, html } from 'lit';
import { navigator } from '../vendor/lit-element-router-2.0.3a/lit-element-router.js';

import styles from './styles/logout.js';
import '../components/back-button.js';
import '../components/page-title.js';
import * as innavator_api from '../innavator-api.js';
import * as innavator_utils from '../innavator-utils.js';

export class Logout extends navigator(LitElement) {
    static get styles() {
        return styles;
    }

    static get properties() {
        return {
            error: {type: String}
        };
    }

    constructor() {
        super();
        this.title = "Log Out";
        this.error = "";
    }

    async attempt_logout () {
        let result = await innavator_api.logout();
        if (result["apiError"]) {
            if (result.apiError.message) {
                let messageJSON = innavator_utils.parsed_json_or_null(result.apiError.message)
                if (messageJSON) {
                    this.error = messageJSON.detail;
                }
                else {
                    this.error = result.apiError.message;
                }
            }
        }
        else {
            this.error = "";
            window.location.href = "/";
        }
    }

    render() {
        return html`
            <app-page-title>Log Out?</app-page-title>
            <div class="signin-container">
                <span @click="${this.attempt_logout}" class="signin-button">Yes</span>
                <app-back-button/>
            </div>
            <div class="signin-container">
                <span style="color: red;">${this.error}</span>
            </div>
        `;
    }
}

customElements.define('app-logout', Logout);
