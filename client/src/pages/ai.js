import { LitElement, html } from 'lit';
import styles from './styles/ai.js';
import '../components/back-button.js';
import '../components/page-title.js';

// TODO: COME BACK

export class AI extends LitElement {
  constructor() {
    super();
    this.title = 'With Student';
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>Hi I'm Digital Murphy, want to talk with me?<p>Or do you want to take a tour around the school?</p></app-page-title>

        <!-- Centered Text Input Box -->
        <div class="input-container">
            <textarea placeholder="Enter your text here"></textarea> <!-- Text area for user input -->
        </div>

        <!-- Centered Navigation Buttons Section -->
        <div class="navigation-buttons">
            <app-back-button></app-back-button> <!-- This has to be done instead of a self-closing tag to avoid eating the next tag, apparently -->
            <app-link href="/ai-next" class="next-button">Next</app-link> <!-- Link to next page -->
        </div>
    `;
  }
}

customElements.define('app-ai', AI);
