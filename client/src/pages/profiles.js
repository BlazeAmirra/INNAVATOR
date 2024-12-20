import { LitElement, html } from 'lit';
import styles from './styles/profiles.js';
import '../components/back-button.js';
import '../components/page-title.js';

const art5 = new URL('../../assets/art5.jpg', import.meta.url).href;
const art7 = new URL('../../assets/art7.jpg', import.meta.url).href;
const art8 = new URL('../../assets/art8.jpg', import.meta.url).href;
const art12 = new URL('../../assets/art12.jpg', import.meta.url).href;

export class Profiles extends LitElement {
  constructor() {
    super();
    this.title = "Profiles";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
        <app-page-title>Select a Profile</app-page-title>

        <div class="profile-list">
            <app-link href="/chat-with-alexis">
                <div class="profile-item">
                    <img src=${art12} alt="Profile 1" class="profile-image"/>
                    <p class="profile-name">Alexis</p>
                </div>
            </app-link>

            <app-link href="/chat-with-blaze">
                <div class="profile-item">
                    <img src=${art5} alt="Profile 2" class="profile-image"/>
                    <p class="profile-name">Blaze</p>
                </div>
            </app-link>

            <app-link href="/chat-with-nick">
                <div class="profile-item">
                    <img src=${art8} alt="Profile 3" class="profile-image"/>
                    <p class="profile-name">Nick</p>
                </div>
            </app-link>

            <app-link href="/chat-with-preston">
                <div class="profile-item">
                    <img src=${art7} alt="Profile 4" class="profile-image"/>
                    <p class="profile-name">Preston</p>
                </div>
            </app-link>
        </div>

        <div>
            <app-back-button/>
        </div>
    `;
  }
}

customElements.define('app-profiles', Profiles);
