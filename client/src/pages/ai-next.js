import { LitElement, html } from 'lit';
import styles from './styles/ai.js';
import '../components/back-button.js';
import '../components/page-title.js';

// TODO: COME BACK

export class AINext extends LitElement {
  constructor() {
    super();
    this.title = 'With Student';
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
        <app-page-title>What do you need help with?</app-page-title>

        <div class="input-container">
            <textarea placeholder="Enter your text here"></textarea>
        </div>

        <div class="navigation-buttons">
            <app-back-button></app-back-button>${""/*This has to be done instead of a self-closing tag to avoid eating the next tag, apparently*/}
            <app-link href="/partner-option" class="next-button">Next</app-link>
        </div>
    `;
  }
}

customElements.define('app-ai-next', AINext);
