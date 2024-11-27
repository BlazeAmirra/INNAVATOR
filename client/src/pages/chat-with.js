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
import styles from './styles/chat-with.js';
import '../components/page-title.js';

export class ChatWith extends LitElement {
  constructor() {
    super();
    this.title = 'Chat With';
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Back Arrow for Navigation -->
        <div class="back-arrow">
            <app-link href="/profiles"> <!-- Link to previous page (update href as needed) -->
                &#8592; Back
            </app-link>
        </div>

        <!-- Logo Section -->
        <div class="logo-section">
            <app-link href="/chat-settings">
            <img src="assets/art9.jpg" alt="Logo" class="logo-image">
            </app-link>
        </div>

        <!-- Page Title -->
        <app-page-title>Chat with Alexis</app-page-title>

        <!-- Chat Box with Profile Picture and Message -->
        <div class="chat-box">
            <img src="assets/art12.jpg" alt="Alexis's Profile" class="profile-picture">
            <p class="chat-message">Hi, need help with schematics?</p>
        </div>

        <!-- Centered Image Section -->
        <div class="centered-image-section">
            <img src="assets/art11.jpg" alt="Coding Session Image" class="centered-image">
        </div>

        <!-- User Input Box Section -->
        <div class="input-box-section">
            <input type="text" class="user-input-box" placeholder="Type your message here">
        </div>
    `;
  }
}

customElements.define('app-chat-with', ChatWith);
