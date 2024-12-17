import { LitElement, html } from 'lit';
import styles from './styles/page-title.js';

export class PageTitle extends LitElement {
  static get properties() {
    return {
      size: { type: String },
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.size = '28px';
  }

  render() {
    return html`
      <h1 style="font-size: ${this.size};">
        <slot></slot>
      </h1>
    `;
  }
}

customElements.define('app-page-title', PageTitle);
