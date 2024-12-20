import { LitElement, html } from 'lit';
import styles from './styles/create-something.js';
import '../components/back-button.js';
import '../components/page-title.js';

export class CreateSomething extends LitElement {
  constructor() {
    super();
    this.title = 'Create Something';
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
        <app-page-title>What do you want to make or help make?</app-page-title>

        <div class="input-section">
            <input type="text" placeholder="Text here" class="text-input"/>
        </div>

        <div class="button-section">
            <app-back-button></app-back-button>
            <app-link href="/partner-option" class="next-button">Next</app-link>
        </div>
    `;
  }
}

customElements.define('app-create-something', CreateSomething);
