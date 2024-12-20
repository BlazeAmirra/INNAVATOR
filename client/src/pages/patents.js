import { LitElement, html } from 'lit';
import styles from './styles/patents.js';
import '../components/back-button.js';
import '../components/page-title.js';

export class Patents extends LitElement {
  constructor() {
    super();
    this.title = "Patents";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
        <app-page-title>Patents</app-page-title>

        <div class="button-container">
            <app-link href="/my-patents" class="patent-button">★ My Patents</app-link>
        </div>

        <div class="button-container">
            <app-link href="/links-to-patents" class="patent-button">★ Links to Patents</app-link>
        </div>

        <div class="button-container">
            <app-link href="/what-is-a-patent" class="patent-button">★ What is a Patent?</app-link>
        </div>

        <div class="back-button-container">
            <app-back-button/>
        </div>
    `;
  }
}

customElements.define('app-patents', Patents);
