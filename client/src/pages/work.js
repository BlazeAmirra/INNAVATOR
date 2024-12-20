import { LitElement, html } from 'lit';
import styles from './styles/work.js';
import '../components/back-button.js';
import '../components/page-title.js';

// TODO: REVISIT

export class Work extends LitElement {
  constructor() {
    super();
    this.title = "Work";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
        <span>NEEDS REWORK</span>
        <br/><br/>
        <app-back-button></app-back-button>
        ${""/* Definitely not a privacy concern.
        <div class="form-container">
            <app-page-title size="22px">You're seeking employment? We can help you! Fill out the information and we can take the next steps.</app-page-title>

            <label for="name">Name:</label>
            <input type="text" id="name" placeholder="Enter your name"/>

            <label for="major">Major:</label>
            <input type="text" id="major" placeholder="Enter your major"/>

            <label for="skill-level">Skill Level:</label>
            <input type="text" id="skill-level" placeholder="Enter your skill level"/>

            <label for="additional-info">Any additional information? Resume, certificates, etc...</label>
            <textarea id="additional-info" placeholder="Add more information here"></textarea>

            <div class="navigation-buttons">
                <app-back-button></app-back-button>
                <app-link href="/submit" class="next-button">Next</app-link>
            </div>
        </div>
        */}
    `;
  }
}

customElements.define('app-work', Work);
