import { LitElement, html } from 'lit';
import styles from './styles/portfolio.js';
import '../components/back-button.js';
import '../components/page-title.js';

import * as innavator_api from '../innavator-api.js';

export class Portfolio extends LitElement {
  constructor() {
    super();
    this.title = "Portfolio";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
        <app-page-title>Portfolio</app-page-title>

        <div class="button-container">
            <app-link href="/user-portfolio/${innavator_api.get_this_user()}" class="option-button">★ My Portfolio</app-link>
            <app-link href="/showcase" class="option-button">★ Showcases</app-link>
            <app-link href="/inspiration" class="option-button">★ Inspiration</app-link>
            <app-link href="/patents" class="option-button">★ Patents</app-link>

            <app-back-button/>
        </div>
    `;
  }
}

customElements.define('app-portfolio', Portfolio);
