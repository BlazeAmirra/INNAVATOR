import { LitElement, html } from 'lit';
import { outlet } from '../vendor/lit-element-router-2.0.3a/lit-element-router.js';
import styles from './styles/main.js';

class AppMain extends outlet(LitElement) {
  static get styles() {
    return styles;
  }

  render() {
    return html`<slot></slot> `;
  }
}

customElements.define('app-main', AppMain);
