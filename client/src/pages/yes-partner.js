import { LitElement, html } from 'lit';
import styles from './styles/yes-partner.js';
import '../components/back-button.js';
import '../components/page-title.js';

const art5 = new URL('../../assets/art5.jpg', import.meta.url).href;
const art7 = new URL('../../assets/art7.jpg', import.meta.url).href;
const art8 = new URL('../../assets/art8.jpg', import.meta.url).href;

export class YesPartner extends LitElement {
  constructor() {
    super();
    this.title = "Yes Partner";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
        <app-page-title>Wonderful, Here are some great people you can work with.<p>Click on who you want and you can start a new chat.</p></app-page-title>

        <div class="partner-section">
            <app-link href="/chat-with-preston" class="partner-link">
                <img src=${art7} alt="Partner 1" class="partner-image"/>
            </app-link>
            <app-link href="/chat-with-blaze" class="partner-link">
                <img src=${art5} alt="Partner 2" class="partner-image"/>
            </app-link>
            <app-link href="/chat-with-nick" class="partner-link">
                <img src=${art8} alt="Partner 3" class="partner-image"/>
            </app-link>
        </div>

        <div class="button-section">
            <app-back-button/>
        </div>
    `;
  }
}

customElements.define('app-yes-partner', YesPartner);
