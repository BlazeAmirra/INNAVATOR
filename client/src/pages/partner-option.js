import { LitElement, html } from 'lit';
import styles from './styles/partner-option.js';
import '../components/page-title.js';

export class PartnerOption extends LitElement {
  constructor() {
    super();
    this.title = "Partner Option";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>Nice, would you like a partner?</app-page-title> <!-- Title for the partner-option page -->

        <!-- Button Section with Yes and No Options -->
        <div class="button-section">
            <app-link href="/yes-partner" class="option-button">Yes</app-link> <!-- Link to Yes Partner page -->
            <app-link href="/no-partner" class="option-button">No</app-link> <!-- Link to No Partner page -->
        </div>
    `;
  }
}

customElements.define('app-partner-option', PartnerOption);
