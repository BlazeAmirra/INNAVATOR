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
import * as innavator_utils from '../innavator-utils.js';

export class Groups extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      groups: {type: Array},
      loaded: {type: Boolean},
      requestingRender: {type: Boolean}
    };
  }

  constructor() {
    super();
    this.title = "Group List";
    this.groups = [];
    this.loaded = false;
  }

  async update() {
    super.update();
    if (!this.loaded && this.requestingRender) {
      this.groups = await innavator_utils.get_whole_list(innavator_api.listGroups);
      this.loaded = true;
    }
  }

  render() {
    const listItems = [];
    if (this.groups.length > 0) {
      for (let i = 0; i < this.groups.length / 5; i++) {
        const listItem = [];
        for (let j = i * 5; j < (i + 1) * 5 && j < this.groups.length; j++) {
          listItem.push(html`
            <div class="portfolio-image">
              <app-link href="channels/${this.groups[j].snowflake_id}">
                <img src="" alt="${this.groups[j].name}" />
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
        <app-page-title>Groups you are in</app-page-title>

        ${listItems}
    ` : html`Loading...`}
    <div class="back-button-container">
        <app-back-button/>
    </div>
    `;
  }
}

customElements.define('app-groups', Groups);
