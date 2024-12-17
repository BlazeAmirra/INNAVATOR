import { LitElement, html } from 'lit';
import styles from './styles/user-portfolio.js';
import '../components/back-button.js';
import '../components/page-title.js';

import * as innavator_api from '../innavator-api.js';

const art5 = new URL('../../assets/art5.jpg', import.meta.url).href;

export class InteractiveProjects extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      subject: {type: String},
      updateParent: {type: Function},
      requestingRender: {type: Boolean},
      projects: {type: Array},
      loaded: {type: Boolean},
      subjectName: {type: String}
    };
  }

  constructor() {
    super();
    this.title = "Interactive Project Showcase";
    this.projects = [];
  }

  async update() {
    super.update();
    if (!this.requestingRender) {
      this.loaded = false;
    }
    if (this.requestingRender && this.subject && !this.loaded) {
      let result = await innavator_api.fetchSubjectInteractiveProjects(this.subject);
      this.projects = result.results ? result.results : [];
      this.subjectName = (await innavator_api.fetchSubject(this.subject)).name;
      this.loaded = true;
    }
  }

  render() {
    const listItems = [];
    if (this.projects.length > 0) {
      for (let i = 0; i < this.projects.length / 5; i++) {
        const listItem = [];
        for (let j = i * 5; j < (i + 1) * 5 && j < this.projects.length; j++) {
          listItem.push(html`
            <div class="portfolio-image">
              <app-link href="portfolio-entry/${this.projects[j].snowflake_id}">
                <img src="${this.projects[j].picture_url}" alt="${this.projects[j].name}" />
              </app-link>
            </div>
          `);
        }
        listItems.push(html`
          <div class="image-pair">
            ${listItem}
          </div>
        `);
      }
    }
    else {
      listItems.push(html`<div>No results</div>`);
    }

    return html`${this.loaded ? html`
        <app-page-title>Interactive project showcase of ${this.subjectName}</app-page-title>

        ${listItems}
    ` : html`Loading...`}
    <div class="back-button-container">
        <app-back-button/>
    </div>
    `;
  }
}

customElements.define('app-interactive-projects', InteractiveProjects);
