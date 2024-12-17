import { LitElement, html } from 'lit';
import styles from './styles/back-button.js';

export class BackButton extends LitElement {
  static get styles() {
    return styles;
  }

  constructor() {
    super();
  }

  render() {
    return html`
        <span onclick="history.back()">&#x2190; Back</span> <!-- Left arrow icon -->
    `;
  }
}

customElements.define('app-back-button', BackButton);
