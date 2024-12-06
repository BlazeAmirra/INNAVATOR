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
import styles from './styles/account-information.js';
import * as innavator_api from '../innavator-api.js';
import * as innavator_utils from '../innavator-utils.js';

const editpicture = new URL('../../assets/editpicture.png', import.meta.url).href;

// TODO: cloud storage for uploaded PFPs

export class AccountInfo extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      current_pfp: {type: String},
      loaded: {type: Boolean},
      not_logged_in: {type: Boolean},

      full_name: {type: String},
      preferred_name: {type: String},
      website_url: {type: String},
      profile_picture_url: {type: String},

      error: {type: String}
    };
  }

  async update() {
    super.update();
    if (!this.loaded) {
      let result = await innavator_api.who_am_i();
      if (result.logged_in) {
        result = await innavator_api.fetchUser(result.snowflake_id);
        this.current_pfp = result.profile_picture_url;
      }
      else {
        this.not_logged_in = true;
      }
      this.loaded = true;
    }
  }

  constructor() {
    super();
    this.title = 'Account Information';
    this.current_pfp = '';
    this.loaded = false;
    this.not_logged_in = false;
    this.full_name = '';
    this.preferred_name = '';
    this.website_url = '';
    this.profile_picture_url = '';
    this.error = '';
  }

  // Function to trigger the file input when the profile image is clicked
  triggerFileInput() {
    /*
      document.getElementById('uploadPic').click();
    */
    alert("Sorry, cloud UGC storage is not supported yet. Please use a URL instead.");
  }

  // Function to change the profile picture when a new image is uploaded
  changeProfilePic() {
    /*
      const fileInput = document.getElementById('uploadPic');
      const profilePic = document.getElementById('profilePic');

      if (fileInput.files && fileInput.files[0]) {
          const reader = new FileReader();
          reader.onload = function(e) {
              profilePic.src = e.target.result;
          }
          reader.readAsDataURL(fileInput.files[0]);
      }
    */
    alert("Sorry, cloud UGC storage is not implemented yet. Please use a URL instead.");
  }

  handleInput(e) {
    let {id, value} = e.target;
    this[id] = value;
  }

  async attempt_user_patch () {
    let result = await innavator_api.patchUser(innavator_utils.collect_optionals(
      ["full_name", this.full_name],
      ["preferred_name", this.preferred_name],
      ["website_url", this.website_url],
      ["profile_picture_url", this.profile_picture_url]
    ));
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
      window.location.href = "/";
    }
  }

  render() {
    return html`${this.loaded ? html`
      <!-- Centered Profile Picture with Click Event -->
        <div class="profile-pic-container" @click="${this.triggerFileInput}">
            <img src=${this.current_pfp} alt="Profile Picture" class="profile-pic" id="profilePic" onerror=${`this.src='${editpicture}';`} />
        </div>

        <!-- Hidden File Input -->
        <input type="file" id="uploadPic" accept="image/*" @change="${this.changeProfilePic}" style="display: none;" />

        <!-- Edit Picture Title -->
        <!-- gotta get back to this after over, say, a month -->
        <!-- <h2 class="edit-picture-title">Edit Picture</h2> -->

        <!-- Full Name Field -->
        <label for="full_name">Full Name:</label>
        <input type="text" id="full_name" name="full_name" class="input-field" placeholder="Enter your full name" @input="${this.handleInput}" />

        <!-- Preferred Name Field -->
        <label for="preferred_name">Preferred Name:</label>
        <input type="text" id="preferred_name" name="preferred_name" class="input-field" placeholder="Enter your preferred name" @input="${this.handleInput}" />

        <!-- Website URL Field -->
        <label for="website_url">Website URL:</label>
        <input type="url" id="website_url" name="website_url" class="input-field" placeholder="Enter your website URL (optional)" @input="${this.handleInput}" />

        <!-- PFP Url -->
        <label for="profile_picture_url">Profile Picture URL:</label>
        <input type="url" id="profile_picture_url" name="profile_picture_url" class="input-field" placeholder="Enter the URL to your profile picture (optional)" @input="${this.handleInput}" />

        <br/><br/>
        <span @click="${this.attempt_user_patch}" class="signin-button">Submit</span>
        <br/><br/>
        <span style="color: red;">${this.error}</span>
    ` : `<span>Loading...</span>`}
      <br/><br/>
      <app-back-button/>
    `;
  }
}

customElements.define('app-account-information', AccountInfo);
