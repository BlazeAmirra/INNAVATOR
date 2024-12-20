import { LitElement, html } from 'lit';
import styles from './styles/home.js';
import '../components/page-title.js';

// Replace "assets/InnavatorLogo.png" with actual secondary logo path
const innavatorLogo = new URL('../../assets/InnavatorLogo.png', import.meta.url).href;
const theBestLogo = new URL('../../assets/theBestLogo.jpg', import.meta.url).href;
// Replace "UATLogo.png" with actual logo path
const uatLogo = new URL('../../assets/UATLogo.png', import.meta.url).href;

export class Home extends LitElement {
  constructor() {
    super();
    this.title = 'Home';
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
        <div class="logo-container">
            <a href="https://www.uat.edu/" target="_blank">
                <img src=${uatLogo} alt="UAT Logo" class="UAT-logo"/>
            </a>
        </div>

        <app-page-title>Innavator</app-page-title>

        <div class="signin-container">
            <app-link href="/login" class="signin-button">Sign In</app-link>
            <app-link href="/register" class="signin-button">Register</app-link>
        </div>

        <div class="secondary-logo-container">
            <app-link href="/about">
                <img src=${innavatorLogo} alt="Innavator App Logo" style="--hover-img: url('${theBestLogo}');" class="secondary-logo hover-logo"/>
            </app-link>
        </div>
    `;
  }
}

customElements.define('app-home', Home);
