import { LitElement, html } from 'lit';
import styles from './styles/footer.js';
import './link.js';

export class Footer extends LitElement {
  static get styles() {
    return styles;
  }

  render() {
    return html`
      <p>Copyright © 2024 Innavator - All Rights Reserved.</p>
      <!-- Container for social media links -->
      <div class="social-icons">
        <a href="https://www.uat.edu/" target="_blank">UAT</a>
        <a href="https://x.com/UATedu" target="_blank">Twitter</a>
        <a href="https://www.instagram.com/uatedu" target="_blank">Instagram</a>
      </div>
    `;
  }
}

customElements.define('app-footer', Footer);
