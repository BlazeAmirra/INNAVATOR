import { LitElement, html } from 'lit';
import styles from './styles/no-partner.js';
import '../components/back-button.js';
import '../components/page-title.js';

export class NoPartner extends LitElement {
  constructor() {
    super();
    this.title = "No Partner";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>Okay, give me just a moment to help find what you need... do you know what you need?</app-page-title>
        <!-- Title with a prompt asking the user if they know what they need -->

        <!-- Input Box Section -->
        <div class="input-box-section">
            <input type="text" class="input-box" placeholder="Text here"> <!-- Placeholder for user input -->
        </div>

        <!-- Navigation Arrows Section -->
        <div class="arrow-section">
            <app-back-button></app-back-button>
            <app-link href="/commission" class="next-button">Next &rarr;</app-link> <!-- Next link to the next page -->
        </div>
    `;
  }
}

customElements.define('app-no-partner', NoPartner);
