import { LitElement, html } from 'lit';
import styles from './styles/learn.js';
import '../components/back-button.js';
import '../components/page-title.js';

export class Learn extends LitElement {
  constructor() {
    super();
    this.title = "Learn";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <app-page-title>Learn</app-page-title>

        <!-- Button Section for Learn Options -->
        <div class="button-container">
            <app-link href="/with-student" class="option-button">★ With Student</app-link>
            <app-link href="/ai" class="option-button">★ AI</app-link>
            <app-link href="/founders" class="option-button">★ Graduates</app-link>
            <app-link href="/uat-dictionary" class="option-button">★ UAT Dictionary</app-link>

            <!-- Go Back Button at the bottom -->
            <app-back-button/>
        </div>
    `;
  }
}

customElements.define('app-learn', Learn);
