import { LitElement, html } from 'lit';
import styles from './styles/not-found.js';

export class NotFound extends LitElement {
  static get styles() {
    return styles;
  }

  render() {
    return html`
      <div class="notFoundContainer">
        <h1>Not Found</h1>
        <div>
          Please head back to the home page by clicking
          <a href="/">this link</a>.
        </div>
      </div>
    `;
  }
}

customElements.define('app-not-found', NotFound);
