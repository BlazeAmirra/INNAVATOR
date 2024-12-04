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

import styles from './styles/welcome.js';
import '../components/page-title.js';
import * as innavator_api from '../innavator-api.js';
import * as innavator_utils from '../innavator-utils.js';

export class Welcome extends navigator(LitElement) {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      greeting_name: {type: String},
      loaded: {type: Boolean},
      logged_in: {type: Boolean}
    };
  }

  constructor() {
    super();
    this.title = "Welcome";
    this.greeting_name = "";
    this.loaded = false;
    this.not_logged_in = false;
  }

  async update() {
    super.update();
    if (!this.loaded) {
      let result = await innavator_api.who_am_i();
      if (result.logged_in) {
        this.greeting_name = innavator_utils.optimal_name(await innavator_api.fetchUser(result.snowflake_id));
      }
      else {
        this.not_logged_in = true;
      }
      this.loaded = true;
    }
  }

  render() {
    return this.loaded ? html`
      <!-- Welcome Message -->
        <app-page-title>Welcome to Innavator, ${this.greeting_name}!</app-page-title> <!-- Displays the welcome title centered -->

        <!-- Button Section for Various Options -->
        <div class="button-container">
            <!-- Button for Commission -->
            <app-link href="/commission" class="option-button">★ Commission</app-link>

            <!-- Button for Learn -->
            <app-link href="/learn" class="option-button">★ Learn</app-link>

            <!-- Button for Portfolio -->
            <app-link href="/portfolio" class="option-button">★ Portfolio</app-link>

            <!-- Button for Founder's Chat -->
            <app-link href="/founders" class="option-button">★ Founder's Chat</app-link>
        </div>
    ` : html`<span>Loading...</span>`;
  }
}

customElements.define('app-welcome', Welcome);
