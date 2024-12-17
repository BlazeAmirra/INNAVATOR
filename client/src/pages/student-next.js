import { LitElement, html } from 'lit';
import styles from './styles/student-next.js';
import '../components/back-button.js';
import '../components/page-title.js';

export class StudentNext extends LitElement {
  constructor() {
    super();
    this.title = "Create Something";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>What do you need help with?</app-page-title> <!-- Title for the create-something page -->

        <!-- Input Box for User Text -->
        <div class="input-section">
            <input type="text" placeholder="Text here" class="text-input"> <!-- Placeholder input box for user text -->
        </div>

        <!-- Button Section with Back and Next Buttons -->
        <div class="button-section">
            <app-back-button></app-back-button> <!-- This has to be done instead of a self-closing tag to avoid eating the next tag, apparently -->
            <app-link href="/partner-option" class="next-button">Next</app-link> <!-- Link to the next page for the process -->
        </div>
    `;
  }
}

customElements.define('app-student-next', StudentNext);
