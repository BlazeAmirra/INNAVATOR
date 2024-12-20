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
        <app-page-title>Nice, would you like a partner?</app-page-title>

        <div class="button-section">
            <app-link href="/yes-partner" class="option-button">Yes</app-link>
            <app-link href="/no-partner" class="option-button">No</app-link>
        </div>
    `;
  }
}

customElements.define('app-partner-option', PartnerOption);
