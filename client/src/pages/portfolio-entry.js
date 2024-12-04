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
import styles from './styles/portfolio-entry.js';
import '../components/back-button.js';
import '../components/page-title.js';

import * as innavator_api from '../innavator-api.js';
import * as innavator_utils from '../innavator-utils.js';

export class PortfolioEntry extends LitElement {
  static get properties() {
    return {
        portfolioEntryId: { type: Number },
        updateParent: { type: Function },
        requestingRender: { type: Boolean },
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.state = {
      status: 'loading',
      portfolioEntry: {},
      me: 0,
      author_name: ''
    };

    // Initial value for updateParent
    // Trigger parent components update lifecycle
    this.updateParent = () => {};
  }

  async updated() {
    const prevItem = this.state.portfolioEntry;
    let portfolioEntry;

    // Fetch the product
    if (this.requestingRender && this.portfolioEntryId && prevItem?.snowflake_id !== this.portfolioEntryId) {
      portfolioEntry = await innavator_api.fetchPortfolioEntry(this.portfolioEntryId);

      this.state = {
        ...this.state,
        status: 'loaded',
        portfolioEntry,
      };

      this.state.me = innavator_api.get_this_user();
      this.state.author_name = innavator_utils.optimal_name(await innavator_api.fetchUser(portfolioEntry.user));

      // If there was an error, make sure this is captured.
      if (portfolioEntry?.apiError) {
        this.state.apiError = portfolioEntry.apiError;
      }
      this.requestUpdate();
    }
  }

  render() {
    return html`${this.state.status === 'loading'
        ? html`<p>loading...</p>` : html`
        <app-page-title>Portfolio Entry</app-page-title>

        <div class="portfolio-image-container">
            <img ${this.state.portfolioEntry.picture_url != "" ? html`src="${this.state.portfolioEntry.picture_url}"` : ""} alt="${this.state.portfolioEntry.picture_url != "" ? "Portfolio Entry Picture" : "No image"}" class="portfolio-image"></img>
        </div>

        <div class="intro-box">
            <p>${this.state.portfolioEntry.name}<span style="font-size: 14px"> by </span><app-link href="/user/${this.state.portfolioEntry.user}">${this.state.author_name}</app-link></p>
            <p style="font-size: 14px;">${this.state.portfolioEntry.description != "" ? html`${this.state.portfolioEntry.description}` : html`<i>No description</i>`}</p>
            <p style="font-size: 14px;">${this.state.portfolioEntry.url != "" ? html`
                <a href="${this.state.portfolioEntry.url}" target="_blank">${this.state.portfolioEntry.url}</a>
            ` : html`
                <i>No link</i>
            `}</p>
        </div>
        ${this.state.portfolioEntry.user == this.state.me ? html`
        <div class="back-button-container">
            <app-link href="/edit-portfolio-entry/${this.portfolioEntryId}" class="back-button">Edit</app-link>
        </div>
        ` : html``}
    `}
    <div class="back-button-container">
        <app-back-button/>
    </div>
    `;
  }
}

customElements.define('app-portfolio-entry', PortfolioEntry);
