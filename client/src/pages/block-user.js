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
import styles from './styles/block-user.js';
import '../components/back-button.js';
import '../components/page-title.js';

// TODO: COME BACK

export class BlockUser extends LitElement {
  constructor() {
    super();
    this.title = 'Block User';
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <app-page-title>Not Implemented</app-page-title>
      <app-back-button/>
    `;
  }
}

/*
      <!-- Title -->
        <app-page-title>Block User</app-page-title>

        <!-- Confirmation Message -->
        <p class="confirmation-text">Are you sure you want to block this user?</p>

        <!-- Buttons for Confirmation -->
        <div class="button-container">
            <button class="block-button" onclick="blockUser()">Yes, Block</button>
            <button class="cancel-button" onclick="tryAgain()">No, Cancel</button>
        </div>

        <!-- Message Display -->
        <p id="message" class="message"></p>
*/

customElements.define('app-block-user', BlockUser);

/*
<script>
        // Function triggered when the "Yes, Block" button is clicked
        function blockUser() {
            const messageElement = document.getElementById("message"); // Get the message element
            messageElement.textContent = "User has been blocked."; // Display blocking confirmation
            messageElement.style.color = "#d9534f"; // Set the message text color to red
        }

        // Function triggered when the "No, Cancel" button is clicked
        function tryAgain() {
            const messageElement = document.getElementById("message"); // Get the message element
            messageElement.textContent = "You can try again."; // Display try again message
            messageElement.style.color = "#5bc0de"; // Set the message text color to blue
        }
    </script>
*/
