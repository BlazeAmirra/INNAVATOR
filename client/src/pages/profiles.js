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
import styles from './styles/profiles.js';
import '../components/page-title.js';

export class Profiles extends LitElement {
  constructor() {
    super();
    this.title = "Profiles";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>Select a Profile</app-page-title>

        <!-- Profile List Section -->
        <div class="profile-list">
            <!-- Profile Item 1 -->
            <app-link href="/chat-with-alexis"> <!-- Link to Profile 1 page -->
                <div class="profile-item">
                    <img src="assets/art12.jpg" alt="Profile 1" class="profile-image" /> <!-- Profile image -->
                    <p class="profile-name">Alexis</p> <!-- Profile name -->
                </div>
            </app-link>

            <!-- Profile Item 2 -->
            <app-link href="/chat-with-blaze"> <!-- Link to Profile 2 page -->
                <div class="profile-item">
                    <img src="assets/art5.jpg" alt="Profile 2" class="profile-image" />
                    <p class="profile-name">Blaze</p>
                </div>
            </app-link>

            <!-- Profile Item 3 -->
            <app-link href="/chat-with-nick"> <!-- Link to Profile 3 page -->
                <div class="profile-item">
                    <img src="assets/art8.jpg" alt="Profile 3" class="profile-image" />
                    <p class="profile-name">Nick</p>
                </div>
            </app-link>

            <!-- Profile Item 4 -->
            <app-link href="/chat-with-preston"> <!-- Link to Profile 4 page -->
                <div class="profile-item">
                    <img src="assets/art7.jpg" alt="Profile 4" class="profile-image" />
                    <p class="profile-name">Preston</p>
                </div>
            </app-link>
        </div>

        <!-- Go Back Button -->
        <div>
            <app-link href="/founders" class="go-back-container">
                <div class="go-back-button">&#8592; Go Back</div>
            </app-link> <!-- Link to go back to previous page -->
        </div>
    `;
  }
}

customElements.define('app-profiles', Profiles);