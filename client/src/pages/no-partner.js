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
        <app-page-title>Okay, give me just a moment to help find what you need... do you know what you need?</app-page-title>

        <div class="input-box-section">
            <input type="text" class="input-box" placeholder="Text here"/>
        </div>

        <div class="arrow-section">
            <app-back-button></app-back-button>
            <app-link href="/commission" class="next-button">Next &rarr;</app-link>
        </div>
    `;
  }
}

customElements.define('app-no-partner', NoPartner);
