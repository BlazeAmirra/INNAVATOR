import { LitElement, html } from 'lit';
import styles from './styles/loading.js';

export class Loading extends LitElement {
  constructor() {
    super();
    this.title = 'Loading';
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <div class="loadingContainer">
        <div class="loadingWrapper">
          <h2 class="loadingTitle">Loading...</h2>
          <div class="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-loading', Loading);
