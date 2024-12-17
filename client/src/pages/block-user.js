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
