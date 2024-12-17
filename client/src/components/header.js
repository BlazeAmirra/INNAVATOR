import { LitElement, html } from 'lit';
import styles from './styles/header.js';
import './link.js';

export class Header extends LitElement {
  static get styles() {
    return styles;
  }

  render() {
    return html`
      <nav>
        <ul> <!-- Unordered list for navigation items -->
          <li><app-link href="/welcome">Home</app-link></li> <!-- Link to Home page -->
          <li><app-link href="/settings">Settings</app-link></li> <!-- Link to Settings page -->
          <li><app-link href="/work">Work</app-link></li> <!-- Link to Work page -->
          <li><app-link href="/about">About</app-link></li> <!-- Link to About page -->
          <li><app-link href="/contact">Contact</app-link></li> <!-- Link to Contact page -->
        </ul>
      </nav>
    `;
  }
}

customElements.define('app-header', Header);
