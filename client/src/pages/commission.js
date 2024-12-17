import { LitElement, html } from 'lit';
import styles from './styles/commission.js';
import '../components/back-button.js';
import '../components/page-title.js';

// TODO: REVISIT SOON

export class Commission extends LitElement {
  constructor() {
    super();
    this.title = 'Commission';
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <app-page-title>Commission</app-page-title>

        <div class="button-container">
            <app-link href="/electronics" class="option-button">★ Electronics</app-link>
            <app-link href="/games" class="option-button">★ Games</app-link>
            <app-link href="/movies" class="option-button">★ Movies</app-link>
            <app-link href="/art" class="option-button">★ Art</app-link>

            <app-back-button/>
        </div>
    `;
  }
}

customElements.define('app-commission', Commission);
