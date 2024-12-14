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
import { map } from 'lit/directives/map.js';
import styles from './styles/create-group.js';
import '../components/back-button.js';
import '../components/page-title.js';

import * as innavator_api from '../innavator-api.js';
import * as innavator_utils from '../innavator-utils.js';

const art5 = new URL('../../assets/art5.jpg', import.meta.url).href;
const art7 = new URL('../../assets/art7.jpg', import.meta.url).href;
const art8 = new URL('../../assets/art8.jpg', import.meta.url).href;
const art12 = new URL('../../assets/art12.jpg', import.meta.url).href;
const art14 = new URL('../../assets/art14.jpg', import.meta.url).href;
const art15 = new URL('../../assets/art15.jpg', import.meta.url).href;
const art16 = new URL('../../assets/art16.jpg', import.meta.url).href;
const art17 = new URL('../../assets/art17.jpg', import.meta.url).href;

export class CreateGroup extends LitElement {
    static get styles() {
        return styles;
    }

    static get properties() {
        return {
            filteredUsers: {type: Array},
            groupUsers: {type: Array},
            filterText: {type: String},
            name: {type: String},
            loaded: {type: Boolean},
            requestingRender: {type: Boolean},
            filterRefresh: {type: Boolean}
        };
    }

    constructor() {
        super();
        this.title = "Create a Group";
        this.filteredUsers = [];
        this.groupUsers = [];
        this.filterText = "";
        this.loaded = false;
        this.filterRefresh = false;
    }

    handleInput(e) {
        let {id, value} = e.target;
        this[id] = value;

        if (id == "filterText") {
            this.filterRefresh = true;
        }
    }

    async attemptGroupCreate() {
        let result = await innavator_api.createGroup(this.name);
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
            let group_snowflake = result.snowflake_id;
            for (const user of this.groupUsers) {
                await innavator_api.inviteUserToGroup(group_snowflake, user.snowflake_id);
            }
            // TODO: navigate to group?
            window.location.href = "/";
        }
    }

    async update() {
        super.update();
        if (!this.loaded && this.requestingRender) {
            this.filteredUsers = (await innavator_api.listUsers()).results.filter(user => user.snowflake_id != innavator_api.get_this_user());
            this.loaded = true;
        }
        if (this.filterRefresh && this.requestingRender) {
            let response = await innavator_api.listFilteredUsers(this.filterText);
            if (response.results) {
                this.filteredUsers = response.results.filter(user =>
                    user.snowflake_id != innavator_api.get_this_user() &&
                    !this.groupUsers.some(otherUser => user.snowflake_id == otherUser.snowflake_id)
                );
            }
            else {
                this.filteredUsers = [];
            }
            this.filterRefresh = false;
        }
    }

    render() {
        return html`${this.loaded ? html`
            <app-page-title>Create a Group</app-page-title>

            <div class="button-container">
                <label for="name">Group Name:</label>
                <input type="text" id="name" name="name" class="input-field" @input="${this.handleInput}" />
            </div>

            ${this.groupUsers.length > 0 ? html`
                <div class="button-container">
                    <span class="founders-subtitle">Users to Invite:</span>
                </div>
                <div class="images-container">
                    ${map(this.groupUsers, value => html`
                        <div class="image-item" @click="${() => {
                            this.groupUsers = this.groupUsers.filter(user => user != value);
                            this.filterRefresh = true;
                        }}">
                            <img src=${value.profile_picture_url} alt=${innavator_utils.optimal_name(value)} class="rounded-image"/>
                            ${value.preferred_name ? html`<p>${value.preferred_name}</p>` : html``}
                            ${value.full_name ? html`<p>${value.full_name}</p>` : html``}
                        <p>${value.user.username}</p>
                        </div>
                    `)}
                </div>
            ` : html``}

            <div class="button-container">
                <span class="founders-subtitle">Select Users to Invite</span>
            </div>

            <div class="button-container">
                <label for="filterText">Filter Users:</label>
                <input type="filterText" id="filterText" name="filterText" class="input-field" @input="${this.handleInput}" />
            </div>

            <div class="images-container">
                ${map(this.filteredUsers, value => html`
                    <div class="image-item" @click="${() => {
                        this.groupUsers = this.groupUsers.concat([value]);
                        this.filteredUsers = this.filteredUsers.filter(user => user != value);
                    }}">
                        <img src=${value.profile_picture_url} alt=${innavator_utils.optimal_name(value)} class="rounded-image"/>
                        ${value.preferred_name ? html`<p>${value.preferred_name}</p>` : html``}
                        ${value.full_name ? html`<p>${value.full_name}</p>` : html``}
                       <p>${value.user.username}</p>
                    </div>
                `)}
            </div>

            <div class="chat-button-container">
                <div class="create-chat-button" @click="${this.attemptGroupCreate}">Create a Group Chat</div>
            </div>
            ` : html`Loading...`}

            <div class="button-container">
                <app-back-button/>
            </div>
        `;
    }
}

customElements.define('app-create-group', CreateGroup);
