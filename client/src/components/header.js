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
        <ul>
          <li><app-link href="/welcome">Home</app-link></li>
          <li><app-link href="/settings">Settings</app-link></li>
          <li><app-link href="/work">Work</app-link></li>
          <li><app-link href="/about">About</app-link></li>
          <li><app-link href="/contact">Contact</app-link></li>
        </ul>
      </nav>
    `;
  }
}

customElements.define('app-header', Header);
