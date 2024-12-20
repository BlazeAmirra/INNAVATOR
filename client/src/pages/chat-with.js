import { LitElement, html } from 'lit';
import styles from './styles/chat-with.js';
import '../components/back-button.js';
import '../components/page-title.js';

const art9 = new URL('../../assets/art9.jpg', import.meta.url).href;
const art11 = new URL('../../assets/art11.jpg', import.meta.url).href;
const art12 = new URL('../../assets/art12.jpg', import.meta.url).href;

export class ChatWith extends LitElement {
  constructor() {
    super();
    this.title = 'Chat With';
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
        <app-back-button></app-back-button>

        <div class="logo-section">
            <app-link href="/chat-settings">
            <img src=${art9} alt="Logo" class="logo-image"/>
            </app-link>
        </div>

        <app-page-title>Chat with Alexis</app-page-title>

        <div class="chat-box">
            <img src=${art12} alt="Alexis's Profile" class="profile-picture"/>
            <p class="chat-message">Hi, need help with schematics?</p>
        </div>

        <div class="centered-image-section">
            <img src=${art11} alt="Coding Session Image" class="centered-image"/>
        </div>

        <div class="input-box-section">
            <input type="text" class="user-input-box" placeholder="Type your message here"/>
        </div>
    `;
  }
}

customElements.define('app-chat-with', ChatWith);
