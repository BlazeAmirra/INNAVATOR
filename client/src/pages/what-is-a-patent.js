import { LitElement, html } from 'lit';
import styles from './styles/what-is-a-patent.js';
import '../components/page-title.js';

export class WhatIsAPatent extends LitElement {
  constructor() {
    super();
    this.title = "What is a Patent?";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>Patent Nonsense</app-page-title>

        <span>Hah, got 'em!</span>
        <br/><br/>
        <app-back-button></app-back-button>
    `;
  }
}

customElements.define('app-what-is-a-patent', WhatIsAPatent);
