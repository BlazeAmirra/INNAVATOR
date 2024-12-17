import { LitElement, html } from 'lit';
import styles from './styles/chat-settings.js';
import '../components/page-title.js';

export class ChatSettings extends LitElement {
  constructor() {
    super();
    this.title = 'Chat Settings';
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
        <app-page-title>Chat Settings</app-page-title> <!-- Title of the page -->

        <div class="buttons-container">
            <app-link href="/change-colors" class="settings-button">★ Chat Color</app-link>

            <app-link href="/change-colors" class="settings-button">★ Whiteboard Color</app-link>

            <app-link href="/account-information" class="settings-button">★ Name Change</app-link>

            <app-link href="/report-user" class="settings-button">★ Report User</app-link>

            <app-link href="/block-user" class="settings-button">★ Block User</app-link>

            <app-link href="/issue-tracker" class="settings-button">★ Issue Tracker</app-link>

            <app-link href="/video-audio" class="settings-button">★ Video and Audio</app-link>
        </div>
    `;
  }
}

customElements.define('app-chat-settings', ChatSettings);
