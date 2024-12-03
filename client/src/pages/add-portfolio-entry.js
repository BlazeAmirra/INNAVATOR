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
import styles from './styles/add-portfolio-entry.js';
import '../components/page-title.js';
import * as innavator_api from '../innavator-api.js';
import * as innavator_utils from '../innavator-utils.js';

export class AddPortfolioEntry extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      name: {type: String},
      description: {type: String},
      url: {type: String},
      picture_url: {type: String},
      error: {type: String}
    };
  }

  constructor() {
    super();
    this.title = 'Add Portfolio Entry';
    this.name = '';
    this.description = '';
    this.url = '';
    this.picture_url = '';
  }

  handleInput(e) {
    let {id, value} = e.target;
    this[id] = value;
  }

  async attempt_add_portfolio_entry () {
    let result = await innavator_api.createPortfolioEntry(innavator_utils.collect_optionals(
      ["name", this.name],
      ["description", this.description],
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
      window.location.replace("/");
    }
  }

  render() {
    return html`
      <app-page-title>Add Portfolio Entry</app-page-title>
      <!-- Full Name Field -->
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" class="input-field" placeholder="Enter the project name" @input="${this.handleInput}" />

        <!-- Preferred Name Field -->
        <label for="description">Description:</label>
        <input type="text" id="description" name="description" class="input-field" placeholder="Enter a project description (optional)" @input="${this.handleInput}" />

        <!-- Website URL Field -->
        <label for="url">URL:</label>
        <input type="url" id="url" name="url" class="input-field" placeholder="Enter a project URL (optional)" @input="${this.handleInput}" />

        <!-- Picture URL Field -->
        <label for="picture_url">Picture URL:</label>
        <input type="url" id="picture_url" name="picture_url" class="input-field" placeholder="Enter a project picture URL (optional)" @input="${this.handleInput}" />

        <br/><br/>
        <span @click="${this.attempt_add_portfolio_entry}" class="signin-button">Add</span>
        <br/><br/>
        <span style="color: red;">${this.error}</span>
    `;
  }
}

customElements.define('app-add-portfolio-entry', AddPortfolioEntry);
