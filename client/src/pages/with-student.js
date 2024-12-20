import { LitElement, html } from 'lit';
import styles from './styles/ai.js';
import '../components/back-button.js';
import '../components/page-title.js';

export class WithStudent extends LitElement {
  constructor() {
    super();
    this.title = "With Student";
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
            <app-back-button></app-back-button>
            <app-link href="/yes-partner" class="next-button">Next</app-link>
        </div>
    `;
  }
}

customElements.define('app-with-student', WithStudent);
