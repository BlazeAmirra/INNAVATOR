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

export class ShowcaseSubject extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      subject: {type: String},
      updateParent: {type: Function},
      requestingRender: {type: Boolean},
      portfolio: {type: Array},
      loaded: {type: Boolean},
      subjectName: {type: String}
    };
  }

  constructor() {
    super();
    this.title = "Subject Showcase";
    this.portfolio = [];
  }

  async update() {
    super.update();
    if (!this.requestingRender) {
      this.loaded = false;
    }
    if (this.requestingRender && this.subject && !this.loaded) {
      let result = await innavator_api.fetchSubjectPortfolioEntries(this.subject);
      this.portfolio = result.results ? result.results : [];
      this.subjectName = (await innavator_api.fetchSubject(this.subject)).name;
      this.loaded = true;
    }
  }

  render() {
    const listItems = [];
    for (let i = 0; i < this.portfolio.length / 5; i++) {
      const listItem = [];
      for (let j = i * 5; j < (i + 1) * 5 && j < this.portfolio.length; j++) {
        listItem.push(html`
          <div class="portfolio-image">
            <app-link href="portfolio-entry/${this.portfolio[j].snowflake_id}">
              <img src="${this.portfolio[j].picture_url}" alt="${this.portfolio[j].name}" />
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

    return this.loaded ? html`
        <app-page-title>Showcase of ${this.subjectName}</app-page-title>

        ${listItems}

        <!-- Go Back Button -->
        <div class="back-button-container">
            <app-back-button/>
        </div>
    ` : html`Loading...`;
  }
}

customElements.define('app-showcase-subject', ShowcaseSubject);
