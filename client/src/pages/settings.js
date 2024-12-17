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
      <!-- Settings Page Title -->
        <app-page-title>Settings Page</app-page-title> <!-- Displays the settings page title centered -->

        <!-- Buttons Container -->
        <div class="buttons-container">
            <app-link href="/logout" class="settings-button">★ Logout</app-link> <!-- Logout button -->
            <app-link href="/change-colors" class="settings-button">★ Change Colors</app-link> <!-- Change Colors button -->
            <app-link href="/account-information" class="settings-button">★ Account Information</app-link> <!-- Account Information button -->
            <app-link href="/feedback" class="settings-button">★ Feedback</app-link> <!-- Feedback button -->
        </div>
    `;
  }
}

customElements.define('app-settings', Settings);
