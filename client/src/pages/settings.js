import { LitElement, html } from 'lit';
import styles from './styles/settings.js';
import '../components/page-title.js';

export class Settings extends LitElement {
  constructor() {
    super();
    this.title = "Settings";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
        <app-page-title>Settings Page</app-page-title>

        <div class="buttons-container">
            <app-link href="/logout" class="settings-button">★ Logout</app-link>
            <app-link href="/change-colors" class="settings-button">★ Change Colors</app-link>
            <app-link href="/account-information" class="settings-button">★ Account Information</app-link>
            <app-link href="/feedback" class="settings-button">★ Feedback</app-link>
        </div>
    `;
  }
}

customElements.define('app-settings', Settings);
