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
import styles from './styles/settings.js';
import '../components/page-title.js';

export class Settings extends LitElement {
  constructor() {
    super();
    this.title = "Settings";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Settings Page Title -->
        <app-page-title>Settings Page</app-page-title> <!-- Displays the settings page title centered -->

        <!-- Buttons Container -->
        <div class="buttons-container">
            <app-link href="/" class="settings-button">★ Logout</app-link> <!-- Logout button -->
            <app-link href="/change-colors" class="settings-button">★ Change Colors</app-link> <!-- Change Colors button -->
            <app-link href="/account-information" class="settings-button">★ Account Information</app-link> <!-- Account Information button -->
            <app-link href="/feedback" class="settings-button">★ Feedback</app-link> <!-- Feedback button -->
        </div>
    `;
  }
}

customElements.define('app-settings', Settings);
