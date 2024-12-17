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
      <!-- Placeholder for app logo with link to UAT page -->
        <div class="logo-container">
            <!-- Link to UAT page wrapping the logo image -->
            <a href="https://www.uat.edu/" target="_blank">
                <img src=${uatLogo} alt="UAT Logo" class="UAT-logo">
            </a>
        </div>

        <!-- Section for App Name Display -->
        <app-page-title>Innavator</app-page-title> <!-- Displays the app name centered -->

        <!-- Sign-in Button Section -->
        <div class="signin-container">
            <!-- Button linking to sign-in page -->
            <app-link href="/login" class="signin-button">Sign In</app-link>
            <app-link href="/register" class="signin-button">Register</app-link>
        </div>

        <!-- Placeholder for secondary logo with link to Innavator page -->
        <div class="secondary-logo-container">
            <!-- Link to Innavator page wrapping the secondary logo image -->
            <app-link href="/about">
                <!-- Class 'hover-logo' applied for hover effect -->
                <img src=${innavatorLogo} alt="Innavator App Logo" style="--hover-img: url('${theBestLogo}');" class="secondary-logo hover-logo">
            </app-link>
        </div>
    `;
  }
}

customElements.define('app-home', Home);
