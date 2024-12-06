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
import { map } from 'lit/directives/map.js';
import styles from './styles/edit-portfolio-entry.js';
import '../components/page-title.js';
import * as innavator_api from '../innavator-api.js';
import * as innavator_utils from '../innavator-utils.js';

export class EditPortfolioEntry extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      portfolioEntryId: { type: String },
      updateParent: { type: Function },
      requestingRender: { type: Boolean },

      subjects: { type: Array },

      name: {type: String},
      description: {type: String},
      subject: {type: String},
      url: {type: String},
      picture_url: {type: String},
      error: {type: String}
    };
  }

  constructor() {
    super();
    this.state = {
      status: 'loading',
      portfolioEntry: {},
    };

    // Initial value for updateParent
    // Trigger parent components update lifecycle
    this.updateParent = () => {};

    this.subjects = [];

    this.title = 'Edit Portfolio Entry';
    this.name = '';
    this.description = '';
    this.subject = '';
    this.url = '';
    this.picture_url = '';
  }

  handleInput(e) {
    let {id, value} = e.target;
    this[id] = value;
  }

  async updated() {
    const prevItem = this.state.portfolioEntry;
    let portfolioEntry;

    if (this.requestingRender && this.portfolioEntryId && prevItem?.snowflake_id !== this.portfolioEntryId) {
      portfolioEntry = await innavator_api.fetchPortfolioEntry(this.portfolioEntryId);

      this.subjects = await innavator_utils.get_whole_list(innavator_api.listSubjects);

      this.state = {
        ...this.state,
        status: 'loaded',
        portfolioEntry,
      };

      // If there was an error, make sure this is captured.
      if (portfolioEntry?.apiError) {
        this.state.apiError = portfolioEntry.apiError;
      }
      this.requestUpdate();
    }
  }

  async attempt_edit_portfolio_entry () {
    let result = await innavator_api.patchPortfolioEntry(innavator_utils.collect_optionals(
      ["portfolio_entry", this.portfolioEntryId],
      ["name", this.name],
      ["description", this.description],
      ["subject", this.subject],
      ["url", this.url],
      ["picture_url", this.picture_url]
    ));
    if (result.apiError) {
      if (result.apiError.message) {
        let messageJSON = innavator_utils.parsed_json_or_null(result.apiError.message);
        if (messageJSON && messageJSON.detail) {
          this.error = messageJSON.detail;
        }
        else {
          this.error = result.apiError.message;
        }
      }
      else {
        this.error = result.apiError;
      }
    }
    else {
      // TODO: return and refresh entries?
      //window.location.replace("/");
    }
  }

  render() {
    return html`${this.state.status === 'loading'
      ? html`<p>loading...</p>` : html`
        <app-page-title>Edit Portfolio Entry</app-page-title>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" class="input-field" placeholder="${this.state.portfolioEntry.name}" @input="${this.handleInput}" />

        <label for="description">Description:</label>
        <input type="text" id="description" name="description" class="input-field" placeholder="${this.state.portfolioEntry.description != "" ? this.state.portfolioEntry.description : "Enter a project description (optional)"}" @input="${this.handleInput}" />

        <label for="subject">Subject:</label>
        <select list="subject_choices" id="subject" name="subject" class="input-field" @input="${this.handleInput}">
          <option value=""></option>
          ${map(this.subjects, value => html`<option value="${value.snowflake_id}">${value.name}</option>`)}
        </select>

        <label for="url">URL:</label>
        <input type="url" id="url" name="url" class="input-field" placeholder="${this.state.portfolioEntry.url != "" ? this.state.portfolioEntry.url : "Enter a project URL (optional)"}" @input="${this.handleInput}" />

        <label for="picture_url">Picture URL:</label>
        <input type="url" id="picture_url" name="picture_url" class="input-field" placeholder="${this.state.portfolioEntry.picture_url != "" ? this.state.portfolioEntry.picture_url : "Enter a project picture URL (optional)"}" @input="${this.handleInput}" />

        <br/><br/>
        <span @click="${this.attempt_edit_portfolio_entry}" class="signin-button">Edit</span>
        <br/><br/>
        <span style="color: red;">${this.error}</span>
    `}
    <br/><br/>
    <app-back-button/>
    `;
  }
}

customElements.define('app-edit-portfolio-entry', EditPortfolioEntry);
