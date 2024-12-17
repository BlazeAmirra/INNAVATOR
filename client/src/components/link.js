import { LitElement, html } from 'lit';
import { navigator } from '../vendor/lit-element-router-2.0.3a/lit-element-router.js';
import styles from './styles/link.js';

export class NavLink extends navigator(LitElement) {
  static get properties() {
    return {
      href: { type: String },
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.href = '';
  }

  onClick(event) {
    event?.preventDefault();
    this.navigate(this.href);
  }

  render() {
    return html`
      <a href="${this.href}" @click="${this.onClick}">
        <slot></slot>
      </a>
    `;
  }
}

customElements.define('app-link', NavLink);
