import { LitElement, html } from 'lit';
import styles from './styles/ai.js';
import '../components/back-button.js';
import '../components/page-title.js';

// TODO: COME BACK

export class AI extends LitElement {
  constructor() {
    super();
    this.title = 'With Student';
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
        <app-page-title>Hi I'm Digital Murphy, want to talk with me?<p>Or do you want to take a tour around the school?</p></app-page-title>

        <div class="input-container">
            <textarea placeholder="Enter your text here"></textarea>
        </div>

        <div class="navigation-buttons">
            <app-back-button></app-back-button>
            <app-link href="/ai-next" class="next-button">Next</app-link>
        </div>
    `;
  }
}

customElements.define('app-ai', AI);
