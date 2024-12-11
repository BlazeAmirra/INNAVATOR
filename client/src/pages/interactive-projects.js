// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
